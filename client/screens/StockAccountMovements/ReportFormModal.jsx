import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import 'moment/locale/es' // eslint-disable-line no-unused-vars, camelcase
import { Button, Modal, Icon, Form } from 'semantic-ui-react'
import { DateTimeField } from '../../components'
import { renderSelect } from '../../utils/formHelpers'

class ReportFormModal extends Component {
  render() {
    const { showReportModal, hideReportModal, generateReport, handleSubmit, submitting } = this.props
    return (
      <Modal open={showReportModal} size="mini">
        <Modal.Header content="Generar Reporte de Stock" />
        <Modal.Content scrolling size="big" style={{ minHeight: '500px' }}>
          <Form onSubmit={handleSubmit}>
            <Field
              name="reportType"
              component={renderSelect}
              options={[
                { key: 1, value: 'stock', text: 'Stock' },
                { key: 2, value: 'stockValue', text: 'Stock Valorizado' }
              ]}
            />
            <Field
              name="dateFrom"
              component={DateTimeField}
            />
            <Field
              name="dateTo"
              component={DateTimeField}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => hideReportModal()}>
            <Icon name="cancel" /> Cancelar
          </Button>
          <Button onClick={handleSubmit(values => generateReport(values))} disabled={submitting} loading={submitting}>
            <Icon name="file excel outline" /> Generar Reporte
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default reduxForm({
  form: 'reportForm'
})(ReportFormModal)
