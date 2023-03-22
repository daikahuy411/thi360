import ApiBase from "./api-base";
import axios from "axios";

export default class CourseApi extends ApiBase {
  constructor() {
    super("courses");
  }

  getCourseDashboard = (id: number) => {
    const url = `${this.baseApiUrl}/dashboard/${id}`;
    const response = axios.get(url);
    return response;
  };

  getCourseOnlines = (courseId: number) => {
    const url = `${this.baseApiUrl}/courseoutlines/${courseId}`;
    const response = axios.get(url);
    return response;
  };

  getCourseContent = (id: number) => {
    const url = `${this.baseApiUrl}/coursecontents/${id}`;
    const response = axios.get(url);
    return response;
  };

  saveCourseContent = (content: any) => {
    const url = `${this.baseApiUrl}/coursecontents`;
    if (content.id > 0) {
      const response = axios.put(`${url}/${content.id}`, content);
      return response;
    } else {
      const response = axios.post(url, content);
      return response;
    }
  };

  deleteCourseContent = (id: number) => {
    const url = `${this.baseApiUrl}/coursecontents/${id}`;
    const response = axios.delete(url);
    return response;
  };

  saveCourseAnnouncement = (content: any) => {
    const url = `${this.baseApiUrl}/Announcements`;
    if (content.id > 0) {
      const response = axios.put(`${url}/${content.id}`, content);
      return response;
    } else {
      const response = axios.post(url, content);
      return response;
    }
  };

  getCourseAnnouncements = (courseId: number) => {
    const url = `${this.baseApiUrl}/Announcements/${courseId}`;
    const response = axios.get(`${url}`);
    return response;
  };

  deleteCourseAnnouncement = (id: number) => {
    const url = `${this.baseApiUrl}/Announcements/${id}`;
    const response = axios.delete(url);
    return response;
  };

  addUsersToCourse = (courseId: number, userIds: string[]) => {
    const url = `${this.baseApiUrl}/AddUsersToCourse`;
    const response = axios.post(`${url}`, {
      userIds: userIds,
      courseId: courseId,
    });
    return response;
  };

  searchesCourseUsers = (query: any) => {
    const url = `${this.baseApiUrl}/Users/Searches`;
    const response = axios.post(`${url}`, query);
    return response;
  };

  deleteCourseUser = (id: number) => {
    const url = `${this.baseApiUrl}/Users/${id}`;
    const response = axios.delete(`${url}`);
    return response;
  };

  addOrgsToCourse = (courseId: number, orgIds: string[]) => {
    const url = `${this.baseApiUrl}/AddOrganizationsToCourse`;
    const response = axios.post(`${url}`, {
      orgIds: orgIds,
      courseId: courseId,
    });
    return response;
  };

  searchesCourseOrgs = (query: any) => {
    const url = `${this.baseApiUrl}/Organizations/Searches`;
    const response = axios.post(`${url}`, query);
    return response;
  };

  deleteCourseOrg = (id: number) => {
    const url = `${this.baseApiUrl}/Organizations/${id}`;
    const response = axios.delete(`${url}`);
    return response;
  };
}
