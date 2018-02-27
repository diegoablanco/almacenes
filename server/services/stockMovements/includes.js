module.exports = function getIncludes(database) {
  const {
    models: {
      address,
      documentAttachment,
      fileAttachment
    }
  } = database
  return {
    address: {
      model: address
    },
    documents: {
      model: documentAttachment,
      as: 'documents',
      through: 'stockIssue_documents'
    },
    images: {
      model: fileAttachment,
      as: 'images',
      through: 'stockIssue_images'
    }
  }
}
