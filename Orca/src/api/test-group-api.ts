import axios from 'axios'

import ApiBase from './api-base'

export default class TestGroupApi extends ApiBase {
  constructor() {
    super("testgroups");
  }

  getTestGroups = () => {
    const response = axios.get(this.baseApiUrl);
    return response;
  };
}
