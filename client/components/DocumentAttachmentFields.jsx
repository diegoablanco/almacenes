import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Segment, Icon, Grid } from 'semantic-ui-react'
import DocumentTypePicker from './DocumentTypePicker'
import AttachmentFields from './AttachmentFields'
import LiteralField from './LiteralField'
import ProgressBarField from './ProgressBarField'
import { handleDeleteField, handleDownloadFile } from './helpers'


class DocumentAttachmentFields extends Component {
  constructor(props) {
    super(props)
    this.renderDocumentAttachment = this.renderDocumentAttachment.bind(this)
  }
  renderDocumentAttachment(attachmentItem, index, fields, type) {
    return (
      <Segment key={index}>
        <Grid columns={2} relaxed>
          <Grid.Column>
            <Field
              name={`${attachmentItem}.documentTypeId`}
              component={props => <DocumentTypePicker {...props} type={type} />}
            />
            <Field
              name={`${attachmentItem}.fileName`}
              component={LiteralField}
            />
          </Grid.Column>
          <Grid.Column floated="right">
            <Icon link name="delete" onClick={handleDeleteField({ fields, index })} />
            <Icon link name="download" onClick={handleDownloadFile({ fields, index })} />
          </Grid.Column>
        </Grid>
        <Field
          name={`${attachmentItem}.percent`}
          component={ProgressBarField}
        />
      </Segment>)
  }
  renderFields(type) {
    const { renderDocumentAttachment } = this
    return function (fields) {
      return fields.map((item, index) => renderDocumentAttachment(item, index, fields, type))
    }
  }
  render() {
    const { type, ...props } = this.props
    return (<AttachmentFields renderFields={this.renderFields(type)} {...props} />)
  }
}

export default DocumentAttachmentFields
