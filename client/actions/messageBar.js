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

export function showTimedMessage(text){
    return (dispatch) => {
        dispatch(showMessage(text))
        dispatchTimeout(hideMessage())
    }
}

export function showMessage(text){
    return{
        type: SHOW_MESSAGE,
        text: text
    }
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