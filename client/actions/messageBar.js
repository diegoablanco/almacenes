export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const HIDE_MESSAGE = 'HIDE_MESSAGE'
export const ENTITY_CREATED = 'ENTITY_CREATED'
export const ENTITY_UPDATED = 'ENTITY_UPDATED'
export const ENTITY_DELETED = 'ENTITY_DELETED'

const messageDuration = 4 * 1000

function showMessageTimeout(messageActionCreator){
    return (dispatch) => {
        dispatch(messageActionCreator())
        setTimeout(() => dispatch(hideMessage()), messageDuration)
    }
}

const actionCreator = {
    entityCreated: () => ({ type: ENTITY_CREATED }),
    entityUpdated: () => ({ type: ENTITY_UPDATED }),
    entityDeleted: () => ({ type: ENTITY_DELETED })
}

export function showTimedMessage(text, messageType = "success"){
    return (dispatch) => {
        dispatch(showMessage(text, messageType))
        setTimeout(() => dispatch(hideMessage()), messageDuration)
    }
}

export function showMessage(text, messageType){
    return {
        type: SHOW_MESSAGE,
        text,
        messageType
    }
}

export function showLoadingMessage(text){
    return showMessage(text, "loading")
}

export function showErrorMessage(text){
    return showMessage(text, "error")
}

export function showSuccessMessage(text){
    return showMessage(text, "success")
}

export function hideMessage(){
    return{
        type: HIDE_MESSAGE
    }
}

export function entityCreated(){    
    return showMessageTimeout(actionCreator.entityCreated)  
}

export function entityUpdated(){
    return showMessageTimeout(actionCreator.entityUpdated)  
}

export function entityDeleted(){
    return showMessageTimeout(actionCreator.entityDeleted)  
}