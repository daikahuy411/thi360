import axios from 'axios'

import Answer from '../interfaces/Answer'
import Question from '../interfaces/Question'
import QuestionType from '../interfaces/QuestionType'
import { QuestionType as QuestionTypeEnum } from '../types/QuestionType'
import ApiBase from './api-base'

export default class QuestionApi extends ApiBase {
  constructor() {
    super('questions')
  }

  getQuestionTypes = () => {
    const response = axios.get(this.baseApiUrl + '/QuestionTypes')
    return response
  }

  parseFillTheBlankQuestion = (question: Question) => {
    const response = axios.post(this.baseApiUrl + '/ParseFillTheBlank', question)
    return response
  }

  saveSetting = (question: Question) => {
    const response = axios.put(this.baseApiUrl + '/Setting', question)
    return response
  }

  createQuestion = (type: QuestionType): Question => {
    let typeName = ''
    var allTypes = [
      {
        code: 'SC',
        order: 1,
        typeId: 12,
        id: 5,
        name: 'Câu hỏi Một lựa chọn',
        createdBy: '1',
        lastModifiedBy: '1',
        createdTime: '2022-09-03T09:44:34.4560987',
        lastModifiedTime: '2022-09-03T09:44:34.4560987',
        enabled: true,
        cacheKey: 'IGN.mySchool.Business.Entities.QuestionType:5'
      },
      {
        code: 'MC',
        order: 2,
        typeId: 8,
        id: 2,
        name: 'Câu hỏi Nhiều lựa chọn',
        createdBy: '1',
        lastModifiedBy: '1',
        createdTime: '2022-09-03T09:44:34.4560979',
        lastModifiedTime: '2022-09-03T09:44:34.4560982',
        enabled: true,
        cacheKey: 'IGN.mySchool.Business.Entities.QuestionType:2'
      },
      {
        code: 'TF',
        order: 3,
        typeId: 13,
        id: 4,
        name: 'Câu hỏi Đúng/Sai',
        createdBy: '1',
        lastModifiedBy: '1',
        createdTime: '2022-09-03T09:44:34.4560985',
        lastModifiedTime: '2022-09-03T09:44:34.4560986',
        enabled: true,
        cacheKey: 'IGN.mySchool.Business.Entities.QuestionType:4'
      },
      {
        code: 'GQ',
        order: 4,
        typeId: 9,
        id: 3,
        name: 'Câu hỏi Chính phụ',
        createdBy: '1',
        lastModifiedBy: '1',
        createdTime: '2022-09-03T09:44:34.4560984',
        lastModifiedTime: '2022-09-03T09:44:34.4560984',
        enabled: true,
        cacheKey: 'IGN.mySchool.Business.Entities.QuestionType:3'
      },
      {
        code: 'SA',
        order: 5,
        typeId: 4,
        id: 1,
        name: 'Câu hỏi Trả lời ngắn',
        createdBy: '1',
        lastModifiedBy: '1',
        createdTime: '2022-09-03T09:44:34.4519515',
        lastModifiedTime: '2022-09-03T09:44:34.456034',
        enabled: true,
        cacheKey: 'IGN.mySchool.Business.Entities.QuestionType:1'
      },
      {
        code: 'FB',
        order: 6,
        typeId: 19,
        id: 6,
        name: 'Câu hỏi Điền từ vào chỗ trống',
        createdBy: '1',
        lastModifiedBy: '1',
        createdTime: '2022-09-03T09:44:34.4560996',
        lastModifiedTime: '2022-09-03T09:44:34.4560996',
        enabled: true,
        cacheKey: 'IGN.mySchool.Business.Entities.QuestionType:6'
      },
      {
        code: 'MATCHING',
        order: 7,
        typeId: 20,
        id: 7,
        name: 'Câu hỏi Ghép đôi',
        createdBy: '1',
        lastModifiedBy: '1',
        createdTime: '2022-09-03T09:44:34.4560997',
        lastModifiedTime: '2022-09-03T09:44:34.4560998',
        enabled: false,
        cacheKey: 'IGN.mySchool.Business.Entities.QuestionType:7'
      },
      {
        code: 'ORDER',
        order: 8,
        typeId: 21,
        id: 8,
        name: 'Câu hỏi Sắp xếp',
        createdBy: '1',
        lastModifiedBy: '1',
        createdTime: '2022-09-03T09:44:34.4560999',
        lastModifiedTime: '2022-09-03T09:44:34.4560999',
        enabled: true,
        cacheKey: 'IGN.mySchool.Business.Entities.QuestionType:8'
      }
    ]
    typeName = allTypes.find(x => x.typeId === type.id)?.name ?? ''

    const errors = {
      isError: false,
      message: ''
    }

    if (type.id == QuestionTypeEnum.SC || type.id == QuestionTypeEnum.MC) {
      return {
        id: 0,
        content: '',
        name: '',
        parentId: 0,
        order: 0,
        explain: '',
        contentFormat: 'html',
        totalQuestion: 0,
        questionTypeId: type.id,
        questionTypeName: typeName,
        categoryId: 0,
        answers: [
          this.createAnswer(-1, 1, '', true, errors),
          this.createAnswer(-2, 2, '', false, errors),
          this.createAnswer(-3, 3, '', false, errors),
          this.createAnswer(-4, 4, '', false, errors)
        ]
      }
    }

    if (type.id == QuestionTypeEnum.TF) {
      return {
        id: 0,
        content: '',
        name: '',
        parentId: 0,
        order: 0,
        explain: '',
        contentFormat: 'html',
        totalQuestion: 0,
        questionTypeId: type.id,
        questionTypeName: typeName,
        categoryId: 0,
        answers: [this.createAnswer(-1, 1, 'Đúng', true, errors), this.createAnswer(-2, 2, 'Sai', false, errors)]
      }
    }

    if (type.id == QuestionTypeEnum.FB) {
      return {
        id: 0,
        content: '',
        name: '',
        parentId: 0,
        order: 0,
        explain: '',
        contentFormat: 'html',
        totalQuestion: 0,
        questionTypeId: type.id,
        questionTypeName: typeName,
        categoryId: 0,
        answers: [this.createAnswer(-1, 1, '', true, errors)]
      }
    }

    if (type.id == QuestionTypeEnum.GQ) {
      return {
        id: 0,
        content: '',
        name: '',
        parentId: 0,
        order: 0,
        explain: '',
        contentFormat: 'html',
        totalQuestion: 0,
        questionTypeId: type.id,
        questionTypeName: typeName,
        categoryId: 0,
        answers: [],
        children: []
      }
    }

    if (type.id == QuestionTypeEnum.SA) {
      return {
        id: 0,
        content: '',
        name: '',
        parentId: 0,
        order: 0,
        explain: '',
        contentFormat: 'html',
        totalQuestion: 0,
        questionTypeId: type.id,
        questionTypeName: typeName,
        categoryId: 0,
        answers: [],
        children: []
      }
    }

    if (type.id == QuestionTypeEnum.ORDER) {
      return {
        id: 0,
        content: '',
        name: '',
        parentId: 0,
        order: 0,
        explain: '',
        contentFormat: 'html',
        totalQuestion: 0,
        questionTypeId: type.id,
        questionTypeName: typeName,
        categoryId: 0,
        answers: [this.createAnswer(-1, 1, '', true, errors), this.createAnswer(-2, 2, '', true, errors)],
        children: []
      }
    }

    return {
      id: 0,
      content: '',
      name: '',
      parentId: 0,
      order: 0,
      explain: '',
      contentFormat: 'html',
      totalQuestion: 0,
      questionTypeId: type.id,
      questionTypeName: typeName,
      categoryId: 0,
      answers: [],
      children: []
    }
  }

  createAnswer = (id: number, order: number, content: string, isCorrect: boolean, errors: any): Answer => {
    return {
      id: id,
      content: content,
      isCorrect: isCorrect,
      order: order,
      questionId: 0,
      parentQuestionId: 0,
      name: '',
      explain: '',
      errors: errors,
      group: 0
    }
  }

  getQuestionPreview = (id: number) => {
    const url = `${this.baseApiUrl}/GetQuestionPreview/${id}`
    const response = axios.post(url)
    return response
  }
}
