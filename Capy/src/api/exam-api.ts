import ApiBase from "./api-base";
import axios from "axios";
import Exam from "../interfaces/Exam";
import ExamItem from "../interfaces/ExamItem";

export default class ExamApi extends ApiBase {
  constructor() {
    super("exams");
  }

  createExam = (name: string): Exam => {
    return {
      id: 0,
      name: name,
      categoryId: 0,
      categoryName: "",
      endDate: new Date(),
      startDate: new Date(),
      examItems: [],
      setting: { allowTestingNumber: 0, viewPermissionAfterFinish: 1 },
      isSpecificDuration: true,
      registrationType: 0,
      status: 0,
      type: 0
    };
  };

  createExamItem = (name: string): ExamItem => {
    return {
      id: 0,
      name: name,
      endDate: new Date(),
      startDate: new Date(),
      testGroupId: 0,
      duration: 0,
      examId: 0,
      numberOfTest: 0
    };
  };

  // Get exam dashboard.
  getExamDashboard = (id: number) => {
    const url = `${this.baseApiUrl}/dashboard/${id}`;
    const response = axios.get(url);
    return response;
  };

  //Sinh đề thi
  generateTest = (config: any) => {
    const url = `${this.baseApiUrl}/GenerateTest/`;
    const response = axios.post(url, config);
    return response;
  };

  // Xuất file báo cáo
  exportExcelExamResult = (query: any) => {
    const url = `${this.baseApiUrl}/ExportExcelExamResult`;
    const response = axios.post(url, query);
    return response;
  };

  //Xuất kết quả kỳ thi
  exportResultItemUser = (examId: number, userIds: string) => {
    const url = `${this.baseApiUrl}/ExportResultItemUser`;
    const response = axios.post(url, { examId: examId, userIds: userIds });
    return response;
  };

  getExamReport = (examId: number, orgId: number) => {
    const url = `${this.baseApiUrl}/GetExamReport`;
    const response = axios.post(url, { examId: examId, orgId: orgId });
    return response;
  };

  exportExamReport = (examId: number, orgId: number) => {
    const url = `${this.baseApiUrl}/ExportExamReport`;
    const response = axios.post(url, { examId: examId, orgId: orgId });
    return response;
  };
}