import axios from 'axios'

import ApiBase from './api-base'

export default class TestingApi extends ApiBase {
  constructor() {
    super("testing");
  }

  // Create Exam Attempt For Exam.
  CreateExamAttempt = (
    examId: any,
    examItemId: any,
    testId: any,
    mode: any,
    token: any
  ) => {
    var request = {
      examId: examId,
      examItemId: examItemId,
      testId: testId,
      mode: mode,
      token: token,
    };
    return axios.post(this.baseApiUrl + "/CreateExamAttempt/", request);
  };

  // Create Exam Attempt For Course
  CreateAttemptForCourse = (
    classId: any,
    courseId: any,
    lectureId: any,
    testId: any,
    token: any
  ) => {
    var request = {
      classId: classId,
      courseId: courseId,
      lectureId: lectureId,
      testId: testId,
      token: token,
    };
    return axios.post(this.baseApiUrl + "/CreateExamAttempt/", request);
  };

  //  Force Finish Exam Attempt
  ForceFinishExamAttempt = (token: any) => {
    var request = { token: token };
    return axios.post(this.baseApiUrl + "/ForceFinishExamAttempt/", request);
  };

  //  GetExamAttemptHistory
  GetExamAttemptHistory = (examItemId: any) => {
    return axios.post(this.baseApiUrl + "/GetExamAttemptHistory/", examItemId);
  };

  //  Get Exam Attempt
  GetExamAttempt = (token: any) => {
    var request = { token: token };
    return axios.post(this.baseApiUrl + "/GetExamAttempt/", request);
  };

  //  Update Exam Attempt
  UpdateExamAttempt = (
    token: any,
    userAnswers: any,
    userExamAttemptTracking: any,
  ) => {
    var request = {
      token: token,
      userAnswers: userAnswers,
      userExamAttemptTracking: userExamAttemptTracking,
    };
    return axios.post(this.baseApiUrl + "/UpdateExamAttempt/", request);
  };

  //  GetExamAttemptReview
  GetExamAttemptReview = (token: any) => {
    var request = {
      token: token,
    };
    return axios.post(this.baseApiUrl + "/GetExamAttemptReview/", request);
  };

  // Lấy toàn bộ danh mục kỳ thi
  GetAllExamCategories = () => {
    return axios.get(this.baseApiUrl + "/GetAllExamCategories/");
  };

  // Kết thúc bài tự luyện
  FinishExamPractice = (
    token: any,
    answerVersion: any,
    userAnswers: any,
    userAttemptStat: any
  ) => {
    var request = {
      token: token,
      answerVersion: answerVersion,
      userAnswers: userAnswers,
      userAttemptStat: userAttemptStat,
    };
    return axios.post(this.baseApiUrl + "/FinishExamPractice/", request);
  };

  //  Finish Exam Attempt version 2
  FinishExamAttempt = (
    token: any,
    userAnswers: any,
    userAnswerMedia: any,
    userAttemptStat: any
  ) => {
    var request = {
      token: token,
      userAnswers: userAnswers,
      userAnswerMedia: userAnswerMedia,
      userAttemptStat: userAttemptStat,
    };
    return axios.post(this.baseApiUrl + "/FinishExamAttempt/", request);
  };

  //  Get Leader board cho kỳ thi
  LeaderBoard = (query: any) => {
    return axios.post(this.baseApiUrl + "/GetLeaderBoard", query);
  };

  // Lấy lịch sử thi của người dùng
  GetExamAttemptHistoryByUserId = (query: any) => {
    return axios.post(this.baseApiUrl + "/GetExamAttemptHistoryByUserId", query);
  };

  //  Lấy toàn bộ danh mục bộ đề
  GetAllTestGroupCategories = () => {
    return axios.get(this.baseApiUrl + "/GetAllTestGroupCategories/");
  };

  //  Lấy toàn bộ sách đề thi theo danh mục
  GetTests = (typeId: any, categoryId: any) => {
    return axios.post(this.baseApiUrl + "/GetTests/", {
      typeId: typeId,
      categoryId: categoryId,
    });
  };

  //  Lấy toàn bộ danh sách bộ đề thi
  GetTestCatalogs = (typeId: any, categoryId: any) => {
    return axios.get(this.baseApiUrl + "/GetTestCatalogs/");
  };

  //  Lấy đề thi v2
  GetTestAttempts = (typeId: any, categoryId: any) => {
    return axios.post(this.baseApiUrl + "/GetTestAttempts/", {
      typeId: typeId,
      categoryId: categoryId,
    });
  };

  // Lấy giải thích câu hỏi
  GetQuestionExplain = (questionId: string) => {
    return axios.post(this.baseApiUrl + "/GetQuestionExplain/" + questionId);
  };

  //  Cập nhật thống kê cho câu hỏi
  UpdateQuestionStat = (questionId: any, isCorrect: any) => {
    return axios.post(this.baseApiUrl + "/UpdateQuestionStat/", {
      QuestionId: questionId,
      IsCorrect: isCorrect,
    });
  };

  //  Lấy chi tiết bài thi.
  GetTestSolution = (id: any) => {
    var request = { Id: id };
    return axios.post(this.baseApiUrl + "/GetTestSolution/", request);
  };

  //  Cập nhật thống kê cho câu hỏi
  GetQuestionStat = (questionId: any) => {
    return axios.post(this.baseApiUrl + "/GetQuestionStat/", {
      QuestionId: questionId,
    });
  };

  //  Lấy toàn bộ Test Catalogs mà ko có tracking progress
  GetAllTestCatalogs = () => {
    return axios.get(this.baseApiUrl + "/GetAllTestCatalogs/");
  };

  //  Lấy toàn bộ Test Catalogs mà ko có tracking progress
  GetUserPerformanceStat = (categoryId: any) => {
    return axios.post(this.baseApiUrl + "/GetUserPerformanceStat/", {
      CategoryId: categoryId,
    });
  };

  //  Lấy kì thi theo loại
  GetExamsByType = (type: string) => {
    return axios.get(this.baseApiUrl + "/GetExamsByType/" + type);
  };

  //  Lấy chi tiết kỳ thi.
  GetExamForAttempt = (id: string) => {
    return axios.get(this.baseApiUrl + "/GetExamForAttempt/" + id);
  };

  // Lấy bảng xếp hạng
  GetExamResultStat = (
    classBlockId: any,
    limit: any,
    fromDate: any,
    toDate: any
  ) => {
    var query = {
      classBlockId: classBlockId,
      limit: limit,
      fromDate: fromDate,
      toDate: toDate,
    };
    return axios.post(this.baseApiUrl + "/GetExamResultStat/", query);
  };

  // Bắt đầu vào làm bài thi
  StartExamAttempt = (token: string, timeToken: string) => {
    return axios.get(
      this.baseApiUrl + "/StartExamAttempt/" + token + "/" + timeToken
    );
  };

  // Lấy kì thi theo danh mục
  GetExamsByCatalog = (type: string) => {
    return axios.get(this.baseApiUrl + "/GetExamsByCatalog/" + type);
  };

  // Lấy kì thi theo danh mục
  GetExamCategory = (id: string) => {
    return axios.get(this.baseApiUrl + "/GetExamCategoryById/" + id);
  };

  // Lấy bài thi trong kỳ thi
  GetTestsByExam = (query: any) => {
    return axios.post(this.baseApiUrl + "/GetTestsByExam/", query);
  };

  // Lấy bài thi trong kỳ thi
  GetExam = (id: string) => {
    return axios.get(this.baseApiUrl + "/GetExam/" + id);
  };

  // Lấy danh sách kỳ thi theo người dùng hiện tại.
  GetAclExamsForUser = (categoryId: any) => {
    return axios.post(this.baseApiUrl + "/GetAclExamsForUser/", {
      CategoryId: categoryId,
    });
  };

  // Lấy danh mục học/ thi đệ quy
  GetAllCatalogs = (parentId: string) => {
    return axios.get(this.baseApiUrl + "/GetAllCatalogs/" + parentId);
  };

  // Lấy nội dung luyện tập: khóa học/ bài thi.
  GetPracticeContents = (query: any) => {
    return axios.post(this.baseApiUrl + "/GetPracticeContents/", query);
  };

  // Lấy nội dung luyện tập: khóa học/ bài thi.
  GetAncestorExamCatalog = (catalogId: string) => {
    return axios.get(this.baseApiUrl + "/catalog/ancestors/" + catalogId);
  };

  // Get Exam Attempt Result.
  GetExamAttemptResult = (token: any, testingFormat: any) => {
    var request = {
      token: token,
      testingFormat: testingFormat,
    };
    return axios.post(this.baseApiUrl + "/GetExamAttemptResult/", request);
  };

  // Lấy lịch sử thi gộp theo kỳ thi trạng thái kết thúc của người dùng
  GetExamAttemptHistoryGroupExamByUserId = (query: any) => {
    return axios.post(
      this.baseApiUrl + "/GetExamAttemptHistoryGroupExamByUserId",
      query
    );
  };

  // Lấy danh sách môn thi có lịch sử thi của kỳ thi của người dùng
  GetExamItemAttempHistoryByUserId = (query: any) => {
    return axios.post(
      this.baseApiUrl + "/GetExamItemAttempHistoryByUserId",
      query
    );
  };

  // lấy lịch sử thi của người dùng theo userid, kỳ thi, môn thi, đề thi
  UserExamAttemptHistory = (param: any) => {
    return axios.get(this.baseApiUrl + "/UserExamAttemptHistory", { params: param })
  };
}