import request from 'superagent'
import download from 'downloadjs'

export async function downloadFile({ fileName, hashName }) {
  const file = await request
    .get(`api/download/${hashName}`)
    .responseType('blob')
    .set('authorization', localStorage['feathers-jwt'])
    .on('progress', console.log)
  download(file.body, fileName, 'pdf')
}
