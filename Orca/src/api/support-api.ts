import ApiBase from './api-base';
import axios from "axios";

export default class SupportApi extends ApiBase {
  constructor() {
    super('posts');
  }

  getCategories = (id: number) => {
    const url = `${this.baseApiUrl}/support/categories`;
    const response = axios.get(url);
    return response;
  };

  getPosts = (categoryId: number) =>{
    const url = `${this.baseApiUrl}/`;
    const response = axios.get(url);
    return response;
  }
}
