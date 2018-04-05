import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { differenceWith } from 'lodash'
import uploadFileAction from '../actions/fileUpload'

class AttachmentFields extends Component {
  constructor(props) {
    super(props)
    this.handleDrop = this.handleDrop.bind(this)
  }

  handleDrop(filesAccepted) {
    const { uploadFile, fields, meta: { form } } = this.props
    differenceWith(filesAccepted, fields.getAll(), (accepted, file) => accepted.name === file.fileName)
      .forEach(file => {
        fields.push({ fileName: file.name, documentTypeId: null })
        uploadFile(file, fields.name, form)
      })
  }

  fileName({ input: { value } }) {
    return (
      <span>{value}</span>
    )
  }
  render() {
    const { fields, renderFields } = this.props
    return (
      <Dropzone
        onDrop={this.handleDrop}
        style={{
        borderWidth: '2px',
        borderColor: 'rgba(102, 102, 102, 0.57)',
        borderStyle: 'dotted',
        borderRadius: '9px',
        padding: '10px',
        minHeight: '300px'
        }}
      >
        <div>
          Click o arrastrar para agregar archivos
        </div>
        { renderFields(fields) }
      </Dropzone>
    )
  }
}

const mapStateToProps = ({ uneditables: { queryResult: { documentTypes } } }) => ({
  documentTypes: documentTypes.map(x => ({ key: x.id, value: x.id, text: x.description }))
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  uploadFile: uploadFileAction
}, dispatch)

AttachmentFields.propTypes = {
  meta: PropTypes.object.isRequired,
  renderFields: PropTypes.element.isRequired,
  uploadFile: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(AttachmentFields)
