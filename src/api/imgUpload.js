import tokenAxios from '../utils/tokenAxios'

function imgUpload(payload) {
  const url = '/kitchen/upload/kindImgUpload'
  return tokenAxios.post(url, payload)
}

export default {
  imgUpload
}