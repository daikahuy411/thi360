import axios from 'axios'

import ApiBase from './api-base'

export default class TestApi extends ApiBase {
  constructor() {
    super('tests');
  }

  getTests = (testGroupId: number) => {
    const response = axios.get(`${this.baseApiUrl}/GetTestsByTestGroupId/${testGroupId}`);
    return response;
  };
}
