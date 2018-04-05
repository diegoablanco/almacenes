export default function handleDelete({ fields, index }) {
  return e => {
    fields.remove(index)
    e.stopPropagation()
  }
}
