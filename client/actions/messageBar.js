export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const HIDE_MESSAGE = 'HIDE_MESSAGE'
export const ENTITY_CREATED = 'ENTITY_CREATED'
export const ENTITY_UPDATED = 'ENTITY_UPDATED'
export const ENTITY_DELETED = 'ENTITY_DELETED'

const messageDuration = 4 * 1000

export function showMessage(text, messageType) {
  return {
    type: SHOW_MESSAGE,
    text,
    messageType
  }
}

export function hideMessage() {
  return {
    type: HIDE_MESSAGE
  }
}

export function showTimedMessage(text, messageType = 'success') {
  return (dispatch) => {
    dispatch(showMessage(text, messageType))
    setTimeout(() => dispatch(hideMessage()), messageDuration)
  }
}

export function showLoadingMessage(text) {
  return showMessage(text, 'loading')
}

export function showErrorMessage(text) {
  return showMessage(text, 'error')
}

export function showSuccessMessage(text) {
  return showMessage(text, 'success')
}

export function entityCreatedMessage() {
  return showTimedMessage('Se creó correctamente')
}

export function entityUpdatedMessage() {
  return showTimedMessage('Se actualizó correctamente')
}

export function entityDeletedMessage() {
  return showTimedMessage('Se eliminó correctamente')
}
