import axios from 'axios';
import ApiBase from './api-base';
export default class DocumentApi extends ApiBase {
    constructor() {
        super('document');
    }

    getDocument = (
      keyword: string, 
      page: number, 
      limit: number, 
      documentType: number,
      organizationCatalogId: number, 
      topicCatalogId: number, 
      areaCatalogId: number, 
      positionCatalogId: number
    ) => {
        const url = `${this.baseApiUrl}/getDocument`;
        const response = axios.post(url, {
          Keyword: keyword,
          Page: page,
          Limit: limit,
          DocumentType: documentType,
          OrganizationCatalogId: organizationCatalogId,
          TopicCatalogId: topicCatalogId,
          AreaCatalogId: areaCatalogId,
          PositionCatalogId: positionCatalogId
        });
        return response;
      };

    getDocumentById = (id: number) => {
      const url = `${this.baseApiUrl}/{id}`;
      const response = axios.get(url);
      return response;
    };

    searchDocumentUser = (query: any) => {
      const url = `${this.baseApiUrl}/Users/Searches`;
      const response = axios.post(`${url}`, query);
      return response;
    };

    addUserToDocument = (documentId: number, userIds: string[]) => {
      const url = `${this.baseApiUrl}/AddUsersToDocument`;
      const response = axios.post(`${url}`, {
        userIds: userIds,
        documentId: documentId,
      });
      return response;
    };

    deleteDocumentUser = (id: number) => {
      const url = `${this.baseApiUrl}/Users/${id}`;
      const response = axios.delete(`${url}`);
      return response;
    };

    searchDocumentOrg = (query: any) => {
      const url = `${this.baseApiUrl}/Organizations/Searches`;
      const response = axios.post(`${url}`, query);
      return response;
    };

    addOrgToDocument = (documentId: number, orgIds: string[]) => {
      const url = `${this.baseApiUrl}/AddOrganizationToDocument`;
      const response = axios.post(`${url}`, {
        orgIds: orgIds,
        DocumentId: documentId,
      });
      return response;
    };
    
    deleteDocumentOrg = (id: number) => {
      const url = `${this.baseApiUrl}/Organizations/${id}`;
      const response = axios.delete(`${url}`);
      return response;
    };
}