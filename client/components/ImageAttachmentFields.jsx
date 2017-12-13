import React from 'react'
import { Field } from 'redux-form'
import { Segment, Icon, Image } from 'semantic-ui-react'
import AttachmentFields from './AttachmentFields'
import LiteralField from './LiteralField'
import ProgressBarField from './ProgressBarField'
import handleDeleteField from './helpers/handleDeleteField'

function renderImage({ input: { value } }) {
  return (<Image src={value} />)
}
function renderImageAttachment(attachmentItem, index, fields) {
  return (
    <Segment key={index}>
      <Field
        name={`${attachmentItem}.preview`}
        component={renderImage}
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
  return (
    <Image.Group size="medium">
      {fields.map((item, index) => renderImageAttachment(item, index, fields))}
    </Image.Group>
  )
}

export default function (props) {
  return (<AttachmentFields renderFields={renderFields} {...props} />)
}

