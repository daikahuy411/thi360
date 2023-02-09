import ApiBase from "./api-base";
import Answer from "interfaces/Answer";
import Question from "interfaces/Question";
import QuestionType from "interfaces/QuestionType";
import axios from "axios";
import { QuestionType as QuestionTypeEnum } from "types/QuestionType";

export default class QuestionApi extends ApiBase {
  constructor() {
    super("questions");
  }

  getQuestionTypes = () => {
    const response = axios.get(this.baseApiUrl + "/QuestionTypes");
    return response;
  };

  parseFillTheBlankQuestion = (question: Question) => {
    const response = axios.post(this.baseApiUrl + "/ParseFillTheBlank", question);
    return response;
  }

  saveSetting = (question: Question) => {
    const response = axios.put(this.baseApiUrl + "/Setting", question);
    return response;
  }

  createQuestion = (type: QuestionType): Question => {
    let typeName = "";
    var allTypes = [
      {
        code: "SA",
        order: 0,
        id: 1,
        name: "Câu hỏi Trả lời ngắn",
        files: null,
        createdBy: 1,
        lastModifiedBy: 1,
        createdTime: "2022-05-06T08:52:43.2899338",
        lastModifiedTime: "2022-05-06T08:52:43.3007385",
      },
      {
        code: "MC",
        order: 1,
        id: 2,
        name: "Câu hỏi Nhiều lựa chọn",
        files: null,
        createdBy: 1,
        lastModifiedBy: 1,
        createdTime: "2022-05-06T08:52:43.3007894",
        lastModifiedTime: "2022-05-06T08:52:43.3007897",
      },
      {
        code: "GQ",
        order: 2,
        id: 3,
        name: "Câu hỏi Chính phụ",
        files: null,
        createdBy: 1,
        lastModifiedBy: 1,
        createdTime: "2022-05-06T08:52:43.3007898",
        lastModifiedTime: "2022-05-06T08:52:43.3007899",
      },
      {
        code: "TF",
        order: 3,
        id: 4,
        name: "Câu hỏi Đúng/Sai",
        files: null,
        createdBy: 1,
        lastModifiedBy: 1,
        createdTime: "2022-05-06T08:52:43.30079",
        lastModifiedTime: "2022-05-06T08:52:43.30079",
      },
      {
        code: "SC",
        order: 4,
        id: 5,
        name: "Câu hỏi Một lựa chọn",
        files: null,
        createdBy: 1,
        lastModifiedBy: 1,
        createdTime: "2022-05-06T08:52:43.3007901",
        lastModifiedTime: "2022-05-06T08:52:43.3007902",
      },
      {
        code: "FB",
        order: 5,
        id: 6,
        name: "Câu hỏi Điền từ vào chỗ trống",
        files: null,
        createdBy: 1,
        lastModifiedBy: 1,
        createdTime: "2022-05-06T08:52:43.3007901",
        lastModifiedTime: "2022-05-06T08:52:43.3007902",
      },
    ];
    typeName = allTypes.find((x) => x.id === type.id)?.name ?? "";

    if (type.id == QuestionTypeEnum.SC || type.id == QuestionTypeEnum.MC) {
      return {
        id: 0,
        content: "",
        name: "",
        parentId: 0,
        order: 0,
        explain: "",
        contentFormat: "html",
        totalQuestion: 0,
        questionTypeId: type.id,
        questionTypeName: typeName,
        categoryId: 0,
        answers: [
          this.createAnswer(-1, 1, "", false),
          this.createAnswer(-2, 2, "", false),
          this.createAnswer(-3, 3, "", false),
          this.createAnswer(-4, 4, "", false),
        ],
      };
    }

    if (type.id == QuestionTypeEnum.TF) {
      return {
        id: 0,
        content: "",
        name: "",
        parentId: 0,
        order: 0,
        explain: "",
        contentFormat: "html",
        totalQuestion: 0,
        questionTypeId: type.id,
        questionTypeName: typeName,
        categoryId: 0,
        answers: [
          this.createAnswer(-1, 1, "Đúng", true),
          this.createAnswer(-2, 2, "Sai", false),
        ],
      };
    }

    if (type.id == QuestionTypeEnum.GQ) {
      return {
        id: 0,
        content: "",
        name: "",
        parentId: 0,
        order: 0,
        explain: "",
        contentFormat: "html",
        totalQuestion: 0,
        questionTypeId: type.id,
        questionTypeName: typeName,
        categoryId: 0,
        answers: [],
        children: [],
      };
    }

    if (type.id == QuestionTypeEnum.SA) {
      return {
        id: 0,
        content: "",
        name: "",
        parentId: 0,
        order: 0,
        explain: "",
        contentFormat: "html",
        totalQuestion: 0,
        questionTypeId: type.id,
        questionTypeName: typeName,
        categoryId: 0,
        answers: [],
        children: [],
      };
    }

    return {
      id: 0,
      content: "",
      name: "",
      parentId: 0,
      order: 0,
      explain: "",
      contentFormat: "html",
      totalQuestion: 0,
      questionTypeId: type.id,
      questionTypeName: typeName,
      categoryId: 0,
      answers: [],
      children: [],
    };
  };

  createAnswer = (
    id: number,
    order: number,
    content: string,
    isCorrect: boolean
  ): Answer => {
    return {
      id: id,
      content: content,
      isCorrect: isCorrect,
      order: order,
      questionId: 0,
      parentQuestionId: 0,
      name: "",
      explain: "",
    };
  };
}
