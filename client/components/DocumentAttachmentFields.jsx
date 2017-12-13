import React from 'react'
import { Field } from 'redux-form'
import { Segment, Icon } from 'semantic-ui-react'
import DocumentTypePicker from './DocumentTypePicker'
import AttachmentFields from './AttachmentFields'
import LiteralField from './LiteralField'
import ProgressBarField from './ProgressBarField'
import handleDeleteField from './helpers/handleDeleteField'

function renderDocumentAttachment(attachmentItem, index, fields) {
  return (
    <Segment key={index}>
      <Field
        name={`${attachmentItem}.documentTypeId`}
        component={DocumentTypePicker}
      />
      <Field
        name={`${attachmentItem}.fileName`}
        component={LiteralField}
      />
      <Icon link name="delete" onClick={e => handleDeleteField(e, index, fields)} />
      <Field
        name={`${attachmentItem}.percent`}
        component={ProgressBarField}
      />
    </Segment>)
}
function renderFields(fields) {
  return fields.map((item, index) => renderDocumentAttachment(item, index, fields))
}
export default function (props) {
  return (<AttachmentFields renderFields={renderFields} {...props} />)
}

