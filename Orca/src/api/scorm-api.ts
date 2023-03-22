import ApiBase from './api-base'
import axios from 'axios'
import Configuration from '../configs/auth'

export default class ScormApi extends ApiBase {
  constructor() {
    super('classic/scorm')
  }

  extractScorm = (scormFilePath: string) => {
    const url = `${Configuration.domain}/classic/scorm/ExtractScormPackage` // `${this.baseApiUrl}/hello`;
    const response = axios.post(url, {
      Path: scormFilePath
    })
    return response
  }
}
