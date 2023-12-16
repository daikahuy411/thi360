import axios from 'axios'
import GenerateTestRequest from 'interfaces/GenerateTestRequest'

import ApiBase from './api-base'

export default class TestGroupApi extends ApiBase {
  constructor() {
    super("testgroups");
  }

  getTestGroups = () => {
    const response = axios.get(this.baseApiUrl);
    return response;
  };

  generateTest = (request: GenerateTestRequest) => {
    const response = axios.post(this.baseApiUrl + "/GenerateTestGroupTest", request);
    return response;
  };
}
