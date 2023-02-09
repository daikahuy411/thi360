import ApiBase from './api-base';
import axios from "axios";
import LessonPlanComment from 'interfaces/LessonPlanComment';

export default class LessonPlanApi extends ApiBase {
  constructor() {
    super('lessonplans');
  }

  getMyLessonPlans = (keyword: string, schoolBlockCatalogId: number, subjectCatalogId: number, bookCatalogId: number) => {
    const url = `${this.baseApiUrl}/getMyLessonPlans`;
    const response = axios.post(url, {
      Keyword: keyword,
      SchoolBlockCatalogId: schoolBlockCatalogId,
      SubjectCatalogId: subjectCatalogId,
      BookCatalogId: bookCatalogId
    });
    return response;
  };

  getAssignedLessonPlans = (status: number) => {
    const url = `${this.baseApiUrl}/getAssignedLessonPlans/${status}`;
    const response = axios.post(url);
    return response;
  };

  getLessonPlan = (id: number) => {
    const url = `${this.baseApiUrl}/{id}`;
    const response = axios.get(url);
    return response;
  };

  saveComment = (comment: LessonPlanComment,) => {
    const url = `${this.baseApiUrl}/SaveComment`;
    const response = axios.post(url, comment);
    return response;
  };

  requestApproval = (planId: number, userIds: string[]) => {
    const url = `${this.baseApiUrl}/RequestApproval`;
    const response = axios.post(url, { planId: planId, userIds: userIds });
    return response;
  };

  appprove = (request: any) => {
    const url = `${this.baseApiUrl}/Approve`;
    const response = axios.post(url, request);
    return response;
  };

  deleteComment = (planId: number,) => {
    const url = `${this.baseApiUrl}/{id}/Comments`;
    const response = axios.delete(url);
    return response;
  };

  getLessonPlanStat = () => {
    const url = `${this.baseApiUrl}/GetLessonPlanStat`;
    const response = axios.get(url);
    return response;
  };
}
