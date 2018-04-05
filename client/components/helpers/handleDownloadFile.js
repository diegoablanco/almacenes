import { downloadFile } from '../../actions/files'

export default function ({ fields, index }) {
  return e => {
    downloadFile(fields.get(index))
    e.stopPropagation()
  }
}
