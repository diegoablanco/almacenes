import React from 'react'
import { Field } from 'redux-form'
import pathParse from 'path-parse'
import { Segment, Icon, Image } from 'semantic-ui-react'
import AttachmentFields from './AttachmentFields'
import LiteralField from './LiteralField'
import ProgressBarField from './ProgressBarField'
import ErrorMessageField from './ErrorMessageField'
import { handleDeleteField, handleDownloadFile } from './helpers'

function renderPreview({ input: { value } }) {
  return (value !== '' && <Image src={value} size="medium" />)
}
function renderImage({ input: { value } }) {
  if (value === '') {
    return null
  }
  const { location: { protocol, host } } = window
  const { name, ext } = pathParse(value)
  return (<Image src={`${protocol}//${host}/${name}_thumb${ext}`} size="medium" />)
}
function renderImageAttachment(attachmentItem, index, fields) {
  return (
    <Segment.Group key={index}>
      <Segment>
        <Field
          name={`${attachmentItem}.preview`}
          component={renderPreview}
        />
        <Field
          name={`${attachmentItem}.hashName`}
          component={renderImage}
        />
      </Segment>
      <Segment attached="bottom" secondary>
        <Field
          name={`${attachmentItem}.fileName`}
          component={LiteralField}
        />
        <Icon link name="delete" onClick={handleDeleteField({ fields, index })} />
        <Icon link name="download" onClick={handleDownloadFile({ fields, index })} />
        <Field
          name={`${attachmentItem}.percent`}
          component={ProgressBarField}
        />
        <Field
          name={`${attachmentItem}.percent`}
          component={ErrorMessageField}
        />
      </Segment>
    </Segment.Group>)
}

function renderFields(fields) {
  return (
    <div>
      {fields.map((item, index) => renderImageAttachment(item, index, fields))}
    </div>
  )
}

export default function (props) {
  return (<AttachmentFields renderFields={renderFields} {...props} />)
}

