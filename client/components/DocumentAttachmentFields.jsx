import React from 'react'
import { Field } from 'redux-form'
import { Segment, Icon, Container } from 'semantic-ui-react'
import DocumentTypePicker from './DocumentTypePicker'
import AttachmentFields from './AttachmentFields'
import LiteralField from './LiteralField'
import ProgressBarField from './ProgressBarField'
import handleDeleteField from './helpers/handleDeleteField'

function renderDocumentAttachment(attachmentItem, index, fields, type) {
  return (
    <Segment key={index}>
      <Container style={{ paddingBottom: '5px' }}>
        <Field
          name={`${attachmentItem}.documentTypeId`}
          component={props => <DocumentTypePicker {...props} type={type} />}
        />
        <Field
          name={`${attachmentItem}.fileName`}
          component={LiteralField}
        />
        <Icon link name="delete" onClick={e => handleDeleteField(e, index, fields)} />
      </Container>
      <Field
        name={`${attachmentItem}.percent`}
        component={ProgressBarField}
      />
    </Segment>)
}
function renderFields(type) {
  return function (fields) {
    return fields.map((item, index) => renderDocumentAttachment(item, index, fields, type))
  }
}
export default function ({ type, ...props }) {
  return (<AttachmentFields renderFields={renderFields(type)} {...props} />)
}

