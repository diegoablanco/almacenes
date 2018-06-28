import { change, SubmissionError, arrayPush, reset, focus, submit } from 'redux-form'
import moment from 'moment'
import { feathersServices } from '../feathers'
import { getCrudPageActions as getBaseCrudPageActions, getActionTypes as getBaseActionTypes } from './crudPage'
import crudPages from '../common/CrudPages'
import { stockAccountMovements as selectors } from '../selectors'
import { formatAjvToRf } from '../common/Validation'
import { showTimedMessage } from './messageBar'
import getLookupEntities from './lookupEntities'


export function getActionTypes() {
  return {
    ...getBaseActionTypes(crudPages.STOCKS),
    SET_STOCK_MOVEMENT_TYPE: 'SET_STOCK_MOVEMENT_TYPE',
    SET_AVAILABLE_SERVICES: 'SET_AVAILABLE_SERVICES'
  }
}
export function getCrudPageActions() {
  const baseCrudPageActions = getBaseCrudPageActions(crudPages.STOCKACCOUNTMOVEMENTS, feathersServices.stockAccountMovements, selectors)
  const actionTypes = getActionTypes()
  const { search: searchProductType, clear: clearProductType } = getLookupEntities(feathersServices.productTypeLookup, 'productType', 'description')

  return {
    ...baseCrudPageActions,
    searchProductType,
    clearProductType,
    showFormModal(id, stockMovementTypeCode = 'edit') {
      return async (dispatch, getState) => {
        const { uneditables: { queryResult: { stockMovementTypes } } } = getState()
        const { formName } = selectors.getUiState(getState())
        const stockMovementType = stockMovementTypes.find(x => x.code === stockMovementTypeCode)
        dispatch({ type: actionTypes.SET_STOCK_MOVEMENT_TYPE, stockMovementType })
        await dispatch(baseCrudPageActions.showFormModal(id))
        if (!id) {
          dispatch(change(formName, 'type', stockMovementType.code))
          dispatch(change(formName, 'stockMovementTypeId', stockMovementType.id))
          dispatch(change(formName, 'date', moment().toDate()))
        }
      }
    },
    createOrUpdate(data) {
      return async (dispatch) => {
        const isUpdate = data.id !== undefined
        const serviceAction = (isUpdate
          ? feathersServices.stockAccountMovements.update(data.id, data)
          : feathersServices.stockAccountMovements.create(data))
        const messageAction = showTimedMessage(`Se ${isUpdate ? 'actualizó' : 'modificó'} correctamente ${data.type === 'receive' ? 'la Entrada' : 'la Salida'}`)
        try {
          await dispatch(serviceAction)
        } catch (error) {
          throw new SubmissionError(formatAjvToRf(error))
        }
        dispatch(baseCrudPageActions.hideModal())
        dispatch(messageAction)
        await dispatch(baseCrudPageActions.reloadGrid())
      }
    },
    addProduct({ ean, code }) {
      return async (dispatch, getState) => {
        const { formName } = selectors.getUiState(getState())
        const { form: { stockAccountMovement: { values: { products = [] } } } } = getState()
        if (products.some(x => x.code === code)) throw new SubmissionError({ code: 'Ya se agregó un producto con este código' })

        const { value: { data: existingProduct } } = await dispatch(feathersServices.stockAccountMovements.find({
          query: {
            type: 'receive',
            hasProduct: code,
            $sort: { id: 1 }
          } }))
        if (existingProduct.length > 0) {
          throw new SubmissionError({ code: 'Ya existe una entrada para este producto' })
        }
        const query = { ean, $sort: { description: 1 } }
        const { value: { data } } = await dispatch(feathersServices.productTypes.find({ query }))
        if (data.length === 0) {
          throw new SubmissionError({ ean: 'EAN no encontrado' })
        }
        const [{ id: typeId, description, category }] = data
        dispatch(arrayPush(formName, 'products', { typeId, code, type: { ean, description, category } }))
        dispatch(reset('addProduct'))
        dispatch(focus('addProduct', 'ean'))
      }
    },
    issueProduct({ productTypeId, code }) {
      return async (dispatch, getState) => {
        const { formName } = selectors.getUiState(getState())
        const { form: { stockAccountMovement: { values: { products = [] } } } } = getState()
        if (products.some(x => x.code === code)) throw new SubmissionError({ code: 'Ya se agregó un producto con este código' })

        const query = { code, $sort: { code: 1 } }
        const { value: data } = await dispatch(feathersServices.products.find({ query }))
        if (data.length === 0) {
          throw new SubmissionError({ code: 'Código no encontrado' })
        }
        const [{ typeId, type: { description, ean, category } }] = data
        if (typeId !== productTypeId) {
          throw new SubmissionError({ code: 'El código no pertenece al producto seleccionado' })
        }
        dispatch(arrayPush(formName, 'products', { typeId, code, type: { ean, description, category } }))
        dispatch(change('issueProduct', 'code', ''))
        dispatch(focus('issueProduct', 'code'))
      }
    },
    handleEanChange(ean) {
      return async (dispatch) => {
        if (ean.length === 13) { dispatch(focus('addProduct', 'code')) }
      }
    },
    handleProductCodeChange({ formName, code }) {
      return async (dispatch) => {
        if (code.length === 15) {
          setTimeout(() => dispatch(submit(formName)), 200)
        }
      }
    }
  }
}
