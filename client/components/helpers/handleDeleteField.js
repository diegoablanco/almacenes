export default function handleDelete(e, index, fields) {
  fields.remove(index)
  e.stopPropagation()
}
