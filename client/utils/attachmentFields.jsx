import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field } from 'redux-form'
import { Progress, Segment, Icon, Dropdown, Message } from 'semantic-ui-react'
import { differenceWith } from 'lodash'
import { getObjectProperties } from '../utils/common'
import { uploadFile, removeFile } from '../actions/fileUpload'

class AttachmentFields extends Component {
  constructor(props) {
    super(props)
    this.handleDrop = this.handleDrop.bind(this)
    this.renderAttachment = this.renderAttachment.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.DocumentTypePicker = this.DocumentTypePicker.bind(this)
  }
  handleDelete(e, id, index) {
    const { fields, removeFile: deleteFile } = this.props
    deleteFile(fields.name, id)
    fields.remove(index)
    e.stopPropagation()
  }
  handleDrop(filesAccepted, filesRejected) {
    const { uploadFile, fields, formName, files } = this.props
    differenceWith(filesAccepted, files, (accepted, file) => accepted.name === file.fileName).forEach(file => {
      uploadFile(file, fields.name, formName)
      fields.push({ fileName: file.name })
    })
  }
  DocumentTypePicker({ input: { onChange } }) {
    const { documentTypes } = this.props
    return (
      <span>
        <Dropdown inline options={documentTypes} placeholder="Seleccione el tipo de documento" onChange={(e, { value }) => onChange(value)} />{': '}
      </span>
    )
  }
  renderAttachment(attachmentItem, index) {
    const { files } = this.props
    const { fileName, id, percent } = files[index]
    return (
      <Segment key={fileName}>
        <Field
          name={`${attachmentItem}.documentTypeId`}
          component={this.DocumentTypePicker}
        />
        {fileName}
        {id && <Icon link name="delete" onClick={e => this.handleDelete(e, id, index)} /> }
        <Progress percent={percent} attached="bottom" autoSuccess />
      </Segment>)
  }
  render() {
    const { fields } = this.props
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
        { fields.map(this.renderAttachment) }
      </Dropzone>
    )
  }
}

const mapStateToProps = ({ uneditables: { queryResult: { documentTypes } }, ui: { fileUploads } }, { fields: { name: fieldName }, meta: { form } }) => ({
  files: getObjectProperties(fileUploads[fieldName]),
  documentTypes: documentTypes.map(x => ({ key: x.id, value: x.id, text: x.description })),
  formName: form
})
const mapDispatchToProps = (dispatch) => bindActionCreators({ uploadFile, removeFile }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentFields)
