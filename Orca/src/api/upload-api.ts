import axios from 'axios'

import ApiBase from './api-base'

class UploadApi extends ApiBase {
  constructor() {
    super('upload')
  }

  uploadFiles = (files) => {
    const url = `${this.baseApiUrl}/UploadFiles`
    const response = axios.post(url, files);
    return response
  }
}

export default UploadApi
