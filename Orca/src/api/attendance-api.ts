import axios from 'axios';
import ApiBase from './api-base';

export default class AttendanceApi extends ApiBase {
  constructor() {
    super('attendances');
  }

  getDashboard = () => {
    const url = `${this.baseApiUrl}/AttendanceDashboard`;
    const response = axios.get(url);
    return response;
  };

  getCurrentAttendances = (session: number) => {
    const url = `${this.baseApiUrl}/GetCurrentAttendances/${session}`;
    const response = axios.get(url);
    return response;
  };

  getAttendance = (classId: number) => {
    const url = `${this.baseApiUrl}/GetAttendance/${classId}/0`;
    const response = axios.get(url);
    return response;
  };

  saveAttendance = (model: any) => {
    const url = `${this.baseApiUrl}`;
    const response = axios.put(url, model);
    return response;
  };
}
