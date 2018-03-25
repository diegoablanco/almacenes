import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Form, Dropdown, Segment, Divider } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { differenceWith } from 'lodash'
import intl from 'react-intl-universal'
import { renderTextArea, renderField, parseToInt, getFieldTranslationKey } from '../../../utils/formHelpers'

export default class AditionalStockDetailFields extends Component {
  constructor(props) {
    super(props)
    this.handleDetailSelect = this.handleDetailSelect.bind(this)
  }
  handleDetailSelect(e, { value }) {
    const { fields } = this.props
    differenceWith(fields.getAll(), value, (x, y) => x.stockItemDetailTypeId === y)
      .forEach(field => {
        fields.remove(fields.getAll().findIndex(x => x.stockItemDetailTypeId === field.stockItemDetailTypeId))
      })
    differenceWith(value, fields.getAll(), (x, y) => x === y.stockItemDetailTypeId)
      .forEach(x => {
        fields.push({ stockItemDetailTypeId: x })
      })
  }
  renderFields() {
    const { fields, availableDetailTypes } = this.props
    return fields.map((item, index) => (
      <Segment>
        <Divider horizontal>{availableDetailTypes.find(x => x.key === fields.getAll()[index].stockItemDetailTypeId).text}</Divider>
        <Form.Group>
          <Field
            width={4}
            name={`${item}.quantity`}
            type="text"
            parse={parseToInt}
            component={renderField}
          />
          <Field
            width={12}
            name={`${item}.description`}
            type="textarea"
            component={renderTextArea}
            rows={3}
          />
        </Form.Group>
      </Segment>
    ))
  }
  render() {
    const {
      meta: { touched, error },
      width,
      availableDetailTypes,
      fields
    } = this.props
    const value = (fields.getAll() || []).map(x => x.stockItemDetailTypeId)
    const label = intl.get('stock.details')
    return (
      <div>
        <Form.Field width={width}>
          <label>{label}</label>
          <Dropdown
            fluid
            selection
            search
            multiple
            value={value}
            options={availableDetailTypes}
            placeholder={intl.get('common.searchPlaceholder')}
            onChange={this.handleDetailSelect}
            noResultsMessage="No se encontraron resultados"
          />
          { touched && error && <label className="error">{error}</label> }
        </Form.Field>
        { this.renderFields() }
      </div>
    )
  }
}

AditionalStockDetailFields.propTypes = {
  meta: PropTypes.object.isRequired,
  availableDetailTypes: PropTypes.array.isRequired,
  fields: PropTypes.object.isRequired
}
