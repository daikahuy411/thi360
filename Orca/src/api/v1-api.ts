import axios from 'axios'

import ApiBase from './api-base'

class V1Api extends ApiBase {
  constructor() {
    super('v1');
  }

  getProgramCatalogs = () => {
    const url = `${this.baseApiUrl}/programcatalogs`;
    const response = axios.get(url);
    return response;
  };

  getProgramCatalog = (id: number) => {
    const url = `${this.baseApiUrl}/programcatalogs/${id}`;
    const response = axios.get(url);
    return response;
  };

  getSubjectCatalog = (id: number) => {
    const url = `${this.baseApiUrl}/subjectcatalogs/${id}`;
    const response = axios.get(url);
    return response;
  };

  getCurriculums = (programId: number, subjectId: number) => {
    const url = `${this.baseApiUrl}/programcatalogs/${programId}/subjectcatalogs/${subjectId}`;
    const response = axios.get(url);
    return response;
  };

  ///{subjectId,programId, curriculumId}
  searchExams = (query: any) => {
    const url = `${this.baseApiUrl}/searchExams`;
    const response = axios.post(url, query);
    return response;
  };

  getExam = (examId: number) => {
    const url = `${this.baseApiUrl}/exams/${examId}`;
    const response = axios.get(url);
    return response;
  }
}

export default V1Api;

