import axios from 'axios'

import { CategoryType } from '../types/CategoryType'
import ApiBase from './api-base'

class CatalogApi extends ApiBase {
  type: CategoryType
  url: string

  constructor(catalogType: CategoryType) {
    super('')

    this.url = ''
    this.type = catalogType

    if (catalogType === CategoryType.QUESTION_CATEGORY) {
      this.baseApiUrl += 'questioncategories'
    }

    if (catalogType === CategoryType.EXAM_CATEGORY) {
      this.baseApiUrl += 'examcategories'
    }

    if (catalogType === CategoryType.COURSE_CATEGORY) {
      this.baseApiUrl += 'coursecategories'
    }

    if (catalogType === CategoryType.POST_CATEGORY) {
      this.baseApiUrl += 'postcategories'
    }

    if (catalogType === CategoryType.PROGRAM_CATALOG) {
      this.baseApiUrl += 'programcatalog'
    }

    if (catalogType === CategoryType.BOOK_CATALOG) {
      this.baseApiUrl += 'bookcatalog'
    }

    if (catalogType === CategoryType.SUBJECT_CATALOG) {
      this.baseApiUrl += 'subjectcatalog'
    }

    if (catalogType === CategoryType.SCHOOL_BLOCK_CATALOG) {
      this.baseApiUrl += 'schoolblockcatalog'
    }

    if (catalogType === CategoryType.DOCUMENT_ORGANIZATION) {
      this.baseApiUrl += 'organizationCatalog'
    }

    if (catalogType === CategoryType.DOCUMENT_TOPIC) {
      this.baseApiUrl += 'topicCatalog'
    }

    if (catalogType === CategoryType.DOCUMENT_AREA) {
      this.baseApiUrl += 'areaCatalog'
    }

    if (catalogType === CategoryType.DOCUMENT_SIGNER) {
      this.baseApiUrl += 'signerCatalog'
    }

    if (catalogType === CategoryType.DOCUMENT_POSITION) {
      this.baseApiUrl += 'positionCatalog'
    }

    if (catalogType === CategoryType.MATERIAL_CATEGORY) {
      this.baseApiUrl += 'materialcategories'
    }

    if (catalogType === CategoryType.LIBRARY_CATEGORY) {
      this.baseApiUrl += 'librarycategories'
    } 
  }

  getAll = () => {
    const url = `${this.baseApiUrl}`
    const response = axios.get(url)
    return response
  }

  getCategoriesByCatalogId = (catalogId: number) => {
    const url = `${this.baseApiUrl}/GetByCatalogId/${catalogId}`
    const response = axios.get(url)
    return response
  }
}

export const QuestionCategoryApi = new CatalogApi(CategoryType.QUESTION_CATEGORY)

export const ExamCategoryApi = new CatalogApi(CategoryType.EXAM_CATEGORY)

export const TestGroupCategoryApi = new CatalogApi(CategoryType.TESTGROUP_CATEGORY)

export const CourseCategoryApi = new CatalogApi(CategoryType.COURSE_CATEGORY)

export const PostCategoryApi = new CatalogApi(CategoryType.POST_CATEGORY)

export const MaterialCategoryApi = new CatalogApi(CategoryType.MATERIAL_CATEGORY)

export const LibraryCategoryApi = new CatalogApi(CategoryType.LIBRARY_CATEGORY)

export default CatalogApi
