import ApiBase from "./api-base";
import axios from "axios";
import { CatalogType } from "../types/CatalogType";

class CatalogApi extends ApiBase {
  type: CatalogType;
  url: string;

  constructor(catalogType: CatalogType) {
    super("");

    this.url = "";
    this.type = catalogType;

    if (catalogType === CatalogType.QUESTION_CATEGORY) {
      this.baseApiUrl += "questioncategories";
    }

    if (catalogType === CatalogType.EXAM_CATEGORY) {
      this.baseApiUrl += "examcategories";
    }

    if (catalogType === CatalogType.COURSE_CATEGORY) {
      this.baseApiUrl += "coursecategories";
    }

    if (catalogType === CatalogType.POST_CATEGORY) {
      this.baseApiUrl += "postcategories";
    }

    if (catalogType === CatalogType.PROGRAM_CATALOG) {
      this.baseApiUrl += "programcatalog";
    }

    if (catalogType === CatalogType.BOOK_CATALOG) {
      this.baseApiUrl += "bookcatalog";
    }

    if (catalogType === CatalogType.SUBJECT_CATALOG) {
      this.baseApiUrl += "subjectcatalog";
    }

    if (catalogType === CatalogType.SCHOOL_BLOCK_CATALOG) {
      this.baseApiUrl += "schoolblockcatalog";
    }

    if (catalogType === CatalogType.DOCUMENT_ORGANIZATION) {
      this.baseApiUrl += "organizationCatalog";
    }

    if (catalogType === CatalogType.DOCUMENT_TOPIC) {
      this.baseApiUrl += "topicCatalog";
    }

    if (catalogType === CatalogType.DOCUMENT_AREA) {
      this.baseApiUrl += "areaCatalog";
    }

    if (catalogType === CatalogType.DOCUMENT_SIGNER) {
      this.baseApiUrl += "signerCatalog";
    }

    if (catalogType === CatalogType.DOCUMENT_POSITION) {
      this.baseApiUrl += "positionCatalog";
    }

    if (catalogType === CatalogType.MATERIAL_CATEGORY) {
      this.baseApiUrl += "materialcategories";
    }

    if (catalogType === CatalogType.LIBRARY_CATEGORY) {
      this.baseApiUrl += "librarycategories";
    }
  }

  getAll = () => {
    const url = `${this.baseApiUrl}`;
    const response = axios.get(url);
    return response;
  };

  getCategoriesByCatalogId = (catalogId: number) => {
    const url = `${this.baseApiUrl}/GetByCatalogId/${catalogId}`;
    const response = axios.get(url);
    return response;
  };
}

export const QuestionCategoryApi = new CatalogApi(CatalogType.QUESTION_CATEGORY);

export const ExamCategoryApi = new CatalogApi(CatalogType.EXAM_CATEGORY);

export const TestGroupCategoryApi = new CatalogApi(CatalogType.TESTGROUP_CATEGORY);

export const CourseCategoryApi = new CatalogApi(CatalogType.COURSE_CATEGORY);

export const PostCategoryApi = new CatalogApi(CatalogType.POST_CATEGORY);

export const MaterialCategoryApi = new CatalogApi(CatalogType.MATERIAL_CATEGORY);

export const LibraryCategoryApi = new CatalogApi(CatalogType.LIBRARY_CATEGORY);

export default CatalogApi;

