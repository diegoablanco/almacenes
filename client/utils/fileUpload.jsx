import React, { Component } from 'react'
import classnames from 'classnames'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { remove } from 'lodash'
import { Form, Progress, Segment, Label, Icon, Dropdown } from 'semantic-ui-react'
import { differenceWith } from 'lodash'
import { getObjectProperties } from '../utils/common'
import { uploadFile, removeFile } from '../actions/fileUpload'

class FileInput extends Component {
  constructor(props) {
    super(props)
    this.handleDrop = this.handleDrop.bind(this)
    this.renderFile = this.renderFile.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.DocumentTypePicker = this.DocumentTypePicker.bind(this)
  }
  handleDelete(id) {
    const { input: { name: fieldName, onChange, value }, removeFile: deleteFile } = this.props
    deleteFile(fieldName, id)
    onChange(remove(value, x => x === id))
  }
  handleDrop(filesAccepted) {
    const { uploadFile, input: { name: fieldName, onChange, value }, files } = this.props
    differenceWith(filesAccepted, files, (accepted, file) => accepted.name !== file.fileName).forEach(file => {
      uploadFile(file, fieldName).then(id => {
        const newValue = (value !== '' ? value : [])
        newValue.push({ id })
        onChange(newValue)
      })
    })
  }
  DocumentTypePicker() {
    const { documentTypes } = this.props
    return (
      <span>
        <Dropdown inline options={documentTypes} defaultValue={documentTypes[0].value} />{': '}
      </span>
    )
  }
  renderFile(file) {
    const { fileName, id, percent } = file
    return (
      <Segment key={fileName}>
        <this.DocumentTypePicker />
        {fileName}
        {id && <Icon name="delete" onClick={() => this.handleDelete(id)} /> }
        <Progress percent={percent} attached="bottom" autoSuccess />
      </Segment>)
  }
  render() {
    const { input, label, width, meta: { touched, error }, files } = this.props
    return (
      <Form.Field className={classnames({ error: touched && error })} width={width}>
        <label>{label}</label>
        <Dropzone
          name={input.name}
          onDrop={this.handleDrop}
        >
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        {touched &&
          error &&
          <span className="error">{error}</span>}
        {files.map(this.renderFile)}
      </Form.Field>
    )
  }
}

const mapStateToProps = ({ uneditables: { queryResult: { documentTypes } }, ui: { fileUploads } }, { input: { name: fieldName } }) => ({
  files: getObjectProperties(fileUploads[fieldName]),
  documentTypes: documentTypes.map(x => ({ key: x.id, value: x.id, text: x.description }))
})
const mapDispatchToProps = (dispatch) => bindActionCreators({ uploadFile, removeFile }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FileInput)
