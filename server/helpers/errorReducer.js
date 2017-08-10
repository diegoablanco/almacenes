module.exports = function (currentFormattedMessages, ajvError, itemsLen, index){
    const newFormattedMessages = currentFormattedMessages || []
    newFormattedMessages.push(ajvError)
    return newFormattedMessages
}