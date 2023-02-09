import ApiBase from './api-base';
import axios from "axios";
import GenerateTestRequest from 'interfaces/GenerateTestRequest';

export default class TestApi extends ApiBase {
  constructor() {
    super('tests');
  }

  getTests = (testGroupId: number) => {
    const response = axios.get(`${this.baseApiUrl}/GetTestsByTestGroupId/${testGroupId}`);
    return response;
  };

  generateTest = (request: GenerateTestRequest) => {
    const response = axios.post(this.baseApiUrl + "/GenerateTest", request);
    return response;
  };
}
