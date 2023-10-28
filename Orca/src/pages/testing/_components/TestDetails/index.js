import React from 'react'
import Countdown from 'react-countdown'
import ReactHtmlParser from 'react-html-parser'
import TestingApi from 'api/testing-api'
import QuestionContent from '../Question/QuestionContent'
import Clock from './Clock'
import _ from 'lodash'
import moment from 'moment'
import QuestionExplain from './QuestionExplain'
import { QuestionType } from 'types/QuestionType'
import LoadingSpinner from '@core/components/loading-spinner'
import Help from '../Help'
import { withRouter } from 'next/router'
import Fullscreen from 'react-fullscreen-crossbrowser'
import authConfig from 'configs/auth'

// MODE
// 0: Practice: hiển thị đáp án sau khi trả lời.
// 1: Testing: lưu, gửi lên server.
// 2: Reviewing Exam Attempt: xem lại chi tiết bài làm.
// 3: Solution: xem lời giải

class TestDetails extends React.Component {
  state = {
    loading: false,
    mode: 0,
    userProfile: null,
    token: '',
    lastUpdated: null,
    currentQuestion: null, // Current question, nếu là chính phụ là Parent Question.
    curentParentQuestionId: 0,
    currentQuestionId: 0, // Id của câu hỏi hiện tại đang selected. Nếu là câu hỏi chính phụ: curentQuestionId là Id của câu hỏi con.
    totalQuestion: 0,
    examAttempt: null,
    showConfirm: false,
    showHelp: false,
    userAnswers: {},
    userExamAttemptTracking: {
      //Lưu mảng câu hỏi đã được trả lời
      questionAttempteds: [],
      //Lưu mảng câu hỏi đã được đánh dấu
      questionBookmarkeds: [],
      //Lưu mảng câu hỏi được trả lời đúng
      questionCorrects: [],
      //Lưu mảng câu hỏi bị trả lời sai
      questionIncorrects: [],
      //Lưu mảng câu hỏi đã submit
      questionSubmitteds: [],
      //Lưu mảng trả lời đúng
      answerCorrects: [],
      //Lưu mảng trả lại chọn sai
      answerIncorrects: [],
      //Lưu mảng câu hỏi bỏ qua không trả lời
      questionSkippeds: [],
      //Lưu mảng câu hỏi đã xem
      questionVisiteds: [],
      //Lưu câu hỏi cuối cùng
      lastVisitedTracking: {}
    },
    disableNextButton: false,
    fullScreen: false,
    timeLeftInSeconds: 0
  }

  constructor(props) {
    super(props)
    this.state.mode = props.mode
  }

  loadExamAttempt(token) {
    this.setState({ loading: true })
    const testingApi = new TestingApi()
    testingApi.GetExamAttempt(token).then(response => {
      let examAttempt = response.data.value
      this.initialize(examAttempt)
      this.setState({ loading: false })
      // if (examAttempt.Status == -1) {
      //   testingApi
      //     .StartExamAttempt(token, examAttempt.UpdateTimeToken)
      //     .then((response) => {
      //       if (response.IsSuccess) {
      //         examAttempt.TimeLeftInSeconds = response.value;
      //         examAttempt.Status = 1;
      //       }
      //       this.initialize(examAttempt);
      //     });
      // } else {
      //   this.initialize(examAttempt);
      // }
    })
  }

  confirmFinish(status) {
    this.setState({ showConfirm: status })
  }

  showHelp(status) {
    this.setState({ showHelp: status })
  }

  viewResult() {
    this.props.router.push('/test-result/' + this.state.token)
  }

  initialize(examAttempt) {
    examAttempt.userExamAttemptTracking.questionVisiteds = examAttempt.userExamAttemptTracking.questionVisiteds || []

    // Determine the question to render after initializing
    let currentQuestionId = 0
    let currentParentQuestionId = 0
    let question

    if (examAttempt.userExamAttemptTracking.lastVisitedTracking) {
      const section = _.find(examAttempt.testGroup.sections, {
        id: examAttempt.userExamAttemptTracking.lastVisitedTracking.sectionId
      })

      const sectionItem = _.find(section?.items, {
        id: examAttempt.userExamAttemptTracking.lastVisitedTracking.itemId
      })

      const questionMap = _.find(section?.questionMaps, {
        id: examAttempt.userExamAttemptTracking.lastVisitedTracking.questionId
      })

      currentQuestionId = examAttempt.userExamAttemptTracking.lastVisitedTracking.questionId
      if (questionMap) {
        currentParentQuestionId = questionMap.parentId

        if (questionMap.parentId == 0) {
          question = _.find(sectionItem?.questions, {
            id: questionMap.id
          })
        } else {
          question = _.find(sectionItem?.questions, {
            id: questionMap.parentId
          })
        }
      }
    }

    if (!question) {
      // Nếu câu đầu tiên là câu hỏi chính phụ, select câu hỏi con đầu tiên.
      question = examAttempt.testGroup.sections[0].items[0].questions[0]
      if (question.questionTypeId == QuestionType.GQ) {
        question = question.children[0]
      }

      currentQuestionId = question.id
      currentParentQuestionId = question.parentId
    }

    this.setState(
      {
        token: examAttempt.token,
        userExamAttemptTracking: examAttempt.userExamAttemptTracking,
        userAnswers: examAttempt.userAnswersJSON !== '' ? JSON.parse(examAttempt.userAnswersJSON) : {},
        examAttempt: examAttempt,
        currentQuestion: question,
        currentQuestionId: currentQuestionId,
        totalQuestion: examAttempt.totalQuestion,
        timeLeftInSeconds: examAttempt.timeLeftInSeconds
      },
      // Select the first question after setSate.
      () => {
        this.viewQuestion(
          currentQuestionId,
          currentParentQuestionId,
          question.testGroupSectionItemId,
          question.testGroupSectionId
        )
      }
    )
  }

  setLastVisittedQuestion() {
    let cached = {}
    cached.questionId = this.state.currentQuestion.id
    cached.parentQuestionId = this.state.currentQuestion.parentId
    cached.sectionId = this.state.currentQuestion.testGroupSectionId
    cached.itemId = this.state.currentQuestion.testGroupSectionItemId

    //Save to state
    this.setState(prevState => ({
      ...prevState,
      userExamAttemptTracking: {
        ...prevState.userExamAttemptTracking
      }
    }))
  }

  changeTestGroupSection(section) {
    var firstQuetion = section.items[0].questions[0]
    var currentQuestionId =
      firstQuetion.questionTypeId == QuestionType.GQ ? firstQuetion.children[0].id : firstQuetion.id

    this.setState({
      currentQuestion: firstQuetion,
      currentSectionId: section.id,
      currentQuestionId: currentQuestionId
    })
  }

  onTick() {
    var time = this.state.timeLeftInSeconds
    this.setState({ timeLeftInSeconds: --time })
  }

  scrollToQuestion(questionId, sectionId = 0) {
    setTimeout(() => {
      const questionPanel = document.getElementById(`question-${questionId}`)
      if (questionPanel) {
        questionPanel.scrollIntoView({ behavior: 'smooth' })
      }

      if (sectionId != 0) {
        const questionPalettePanel = document.getElementById(`section-panel-${sectionId}`)
        if (questionPalettePanel) {
          questionPalettePanel.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }, 250)
  }

  saveAndNext() {
    let currentQuestionIndex = 0
    currentQuestionIndex = _.findIndex(this.state.examAttempt.testGroup.questionMaps, {
      id: this.state.currentQuestionId
    })

    currentQuestionIndex++

    const totalQuestion = this.state.examAttempt.testGroup.questionMaps.length
    if (currentQuestionIndex == totalQuestion) {
      // this.setState({ disableNextButton: true });
      return
    }

    const nextQuestion = this.state.examAttempt.testGroup.questionMaps[currentQuestionIndex]
    this.viewQuestion(nextQuestion.id, nextQuestion.parentId, nextQuestion.itemId, nextQuestion.sectionId)
  }

  navigateQuestion(isNext) {
    let currentQuestionIndex = 0
    currentQuestionIndex = _.findIndex(this.state.examAttempt.testGroup.questionMaps, {
      id: this.state.currentQuestionId
    })
    currentQuestionIndex = isNext ? currentQuestionIndex - 1 : currentQuestionIndex + 1

    if (currentQuestionIndex < 0) return

    const totalQuestion = this.state.examAttempt.testGroup.questionMaps.length
    if (currentQuestionIndex == totalQuestion) {
      return
    }

    const nextQuestion = this.state.examAttempt.testGroup.questionMaps[currentQuestionIndex]
    this.viewQuestion(nextQuestion.id, nextQuestion.parentId, nextQuestion.itemId, nextQuestion.sectionId)
  }

  sectionClassName(sectionId) {
    const normalClassName = 'b--black-20 gray pointer f6 ba br-pill flex flex-shrink-0 h2 items-center mv2 mr2 ph3'
    const activeClassName =
      'bg-light-sky-blue b--light-sky-blue sky-blue pointer f6 ba br-pill flex flex-shrink-0 h2 items-center mv2 mr2 ph3'
    if (this.state.currentSectionId === sectionId) {
      return activeClassName
    } else {
      return normalClassName
    }
  }

  questionClassName(questionId) {
    const notVisitedClassName =
      'relative w2 h2 flex items-center justify-center pointer ba pa2 br-100 b--very-light-gray bg-white silver'
    const answeredClassName =
      'relative w2 h2 flex items-center justify-center pointer ba pa2 br-100 b--green bg-green white'
    const notAnsweredClassName =
      'relative w2 h2 flex items-center justify-center pointer ba pa2 br-100 b--red bg-red white'
    const boorkmarkedAndAnsweredClassName =
      'relative w2 h2 flex items-center justify-center pointer ba pa2 br-100 b--green bg-green white'
    const boorkmarkedAndNotAnsweredClassName =
      'relative w2 h2 flex items-center justify-center pointer ba pa2 br-100 b--red bg-red white'

    if (this.state.mode == 1) {
      if (this.state.userExamAttemptTracking.questionAttempteds.indexOf(questionId) > -1) {
        return answeredClassName
      } else if (
        this.state.userExamAttemptTracking.questionVisiteds.indexOf(questionId) > -1 &&
        this.state.currentQuestionId !== questionId
      ) {
        return notAnsweredClassName
      }

      if (this.state.userExamAttemptTracking.questionVisiteds.indexOf(questionId) > -1) {
        if (this.state.userExamAttemptTracking.questionBookmarkeds.indexOf(questionId) > -1) {
          if (this.state.userExamAttemptTracking.questionAttempteds.indexOf(questionId) > -1) {
            return boorkmarkedAndAnsweredClassName
          } else {
            return boorkmarkedAndNotAnsweredClassName
          }
        }
      }

      if (this.state.userExamAttemptTracking.questionAttempteds.indexOf(questionId) > -1) {
        return answeredClassName
      }

      if (this.state.userExamAttemptTracking.questionVisiteds.indexOf(questionId) < 0) {
        return notVisitedClassName
      }
    } else {
      if (this.state.userExamAttemptTracking.questionVisiteds.indexOf(questionId) > -1) {
        if (
          this.state.userExamAttemptTracking.questionBookmarkeds.indexOf(questionId) > -1 &&
          this.state.userExamAttemptTracking.questionCorrects.indexOf(questionId) > -1
        ) {
          return boorkmarkedAndAnsweredClassName
        }

        if (
          this.state.userExamAttemptTracking.questionBookmarkeds.indexOf(questionId) > -1 &&
          this.state.userExamAttemptTracking.questionIncorrects.indexOf(questionId) > -1
        ) {
          return boorkmarkedAndNotAnsweredClassName
        }

        if (this.state.userExamAttemptTracking.questionCorrects.indexOf(questionId) > -1) {
          return answeredClassName
        }

        if (this.state.userExamAttemptTracking.questionIncorrects.indexOf(questionId) > -1) {
          return notAnsweredClassName
        }
      }
    }

    return notVisitedClassName
  }

  isSelectedAnswer(questionId, answerId) {
    const questionUserAnswers = this.state.userAnswers[questionId] || []
    return questionUserAnswers.indexOf(answerId) >= 0
  }

  clearCurrentAttemptedQuestion() {
    let userAnswers = this.state.userAnswers
    userAnswers[this.state.currentQuestionId] = 0

    let questionAttempteds = [...this.state.userExamAttemptTracking.questionAttempteds]

    const currentQuestionIndex = questionAttempteds.indexOf(this.state.currentQuestionId)
    questionAttempteds.splice(currentQuestionIndex, 1)

    this.setState(prevState => ({
      ...prevState,
      userAnswers: userAnswers,
      userExamAttemptTracking: {
        ...prevState.userExamAttemptTracking,
        questionAttempteds: questionAttempteds
      }
    }))
  }

  //Chấm điểm câu hỏi hiện tại
  markQuestion(question, answerId) {
    // Chỉ chấm điểm với dạng Luyện tập
    if (this.state.mode !== 0) {
      return
    }

    let questionId = question.id
    let questionSubmiteds = this.state.userExamAttemptTracking.questionSubmitteds
    if (questionSubmiteds.indexOf(questionId) >= 0) {
      return
    }

    questionSubmiteds.push(questionId)

    let questionIncorrects = this.state.userExamAttemptTracking.questionIncorrects
    let questionCorrects = this.state.userExamAttemptTracking.questionCorrects
    let answerIncorrects = this.state.userExamAttemptTracking.answerIncorrects
    let answerCorrects = this.state.userExamAttemptTracking.answerCorrects

    //Show solution & stat & comment box
    let correctAnwser = _.find(question.answers, {
      isCorrect: true
    })

    // Nếu câu hỏi không có đáp án đúng (lỗi dữ liệu)
    if (!correctAnwser) {
      questionIncorrects.push(questionId)
    }

    if (answerId !== correctAnwser.id) {
      questionIncorrects.push(questionId)
      answerIncorrects.push(answerId)
    } else {
      questionCorrects.push(questionId)
      answerCorrects.push(answerId)
    }

    //Save to state
    this.setState(prevState => ({
      ...prevState,
      userExamAttemptTracking: {
        ...prevState.userExamAttemptTracking,
        questionSubmiteds: questionSubmiteds,
        questionIncorrects: questionIncorrects,
        questionCorrects: questionCorrects,
        answerCorrects: answerCorrects,
        answerIncorrects: answerIncorrects
      }
    }))
  }

  ///Trả lời câu hỏi.
  onQuestionAttempted = function (question, answerId) {
    const questionId = question.id

    // //Nếu câu hỏi đã submit câu trả lời thì không cho phép thay đổi
    const questionAttempteds = [...this.state.userExamAttemptTracking.questionAttempteds]
    const questionVisiteds = [...this.state.userExamAttemptTracking.questionVisiteds]

    if (this.state.mode !== 2 && questionVisiteds.indexOf(questionId) < 0) {
      questionVisiteds.push(questionId)
    }

    if (questionAttempteds.indexOf(questionId) < 0) {
      questionAttempteds.push(questionId)
    }

    if (question.questionTypeId !== QuestionType.SA) {
      let userAnswers = this.state.userAnswers
      let questionUserAnswers = userAnswers[questionId] || []

      if (questionUserAnswers.indexOf(answerId) < 0) {
        if (question.questionTypeId === QuestionType.MC) {
          questionUserAnswers.push(answerId)
        } else {
          questionUserAnswers = [answerId]
        }
      } else {
        questionUserAnswers.splice(questionUserAnswers.indexOf(answerId, 0), 1)
      }

      userAnswers[question.id] = questionUserAnswers

      this.setState(
        prevState => ({
          ...prevState,
          userAnswers: userAnswers,
          currentQuestionId: questionId,
          userExamAttemptTracking: {
            ...prevState.userExamAttemptTracking,
            questionAttempteds: questionAttempteds,
            questionVisiteds: questionVisiteds
          }
        }),
        () => {
          this.markQuestion(question, answerId)
          this.updateExamAttempt()
        }
      )
    }
  }

  viewQuestion(questionId, parentQuestionId, sectionItemId, sectionId) {
    if (parentQuestionId == 0) {
      parentQuestionId = questionId
    }

    var section = this.state.examAttempt.testGroup.sections.find(x => x.id == sectionId)
    var sectionItem = section.items.find(x => x.id == sectionItemId)
    var question = sectionItem.questions.find(x => x.id == parentQuestionId)

    const questionVisiteds = [...this.state.userExamAttemptTracking.questionVisiteds]

    if (this.state.mode !== 2 && questionVisiteds.indexOf(questionId) < 0) {
      questionVisiteds.push(questionId)
    }

    // Lưu câu hỏi người dùng focus gần nhất.
    // Câu hỏi chính phụ: questionId là id của câu con, parentId lưu id của câu cha.
    let lastVisittedQuestion = {
      questionId: questionId,
      parentQuestionId: parentQuestionId == questionId ? 0 : parentQuestionId,
      sectionId: question.testGroupSectionId,
      itemId: question.testGroupSectionItemId
    }

    //Save to state
    this.setState(
      prevState => ({
        ...prevState,
        currentQuestionId: questionId,
        curentParentQuestionId: parentQuestionId == questionId ? 0 : parentQuestionId,
        currentSectionId: sectionId,
        currentQuestion: question,
        userExamAttemptTracking: {
          ...prevState.userExamAttemptTracking,
          questionVisiteds: questionVisiteds,
          lastVisitedTracking: lastVisittedQuestion
        },
        disableNextButton: false
      }),
      () => {
        this.updateExamAttempt()
        this.scrollToQuestion(questionId, sectionId)
      }
    )
  }

  bookMarkQuestion() {
    if (this.state.userExamAttemptTracking.questionBookmarkeds.indexOf(this.state.currentQuestion.id) < 0) {
      let questionBookmarkeds = [...this.state.userExamAttemptTracking.questionBookmarkeds]
      questionBookmarkeds.push(this.state.currentQuestionId)

      this.setState(prevState => ({
        ...prevState,
        userExamAttemptTracking: {
          ...prevState.userExamAttemptTracking,
          questionBookmarkeds: questionBookmarkeds
        }
      }))
      this.saveAndNext()
    }
  }

  updateExamAttempt = function () {
    if (this.state.examAttempt.status != 0) return
    const testingApi = new TestingApi()
    testingApi
      .UpdateExamAttempt(
        this.state.token,
        JSON.stringify(this.state.userAnswers),
        JSON.stringify(this.state.userExamAttemptTracking)
      )
      .then(response => {
        if (response.data.isSuccess) {
          this.setState({ lastUpdated: response.data.value })
          // $scope.removeSavingMarkButton();
          if (!response.data.value) {
            // toastr.error("Không thể kết nối đến server.Vui lòng kiểm tra lại mạng.");
          }
        }
      })
  }

  finishExamAttempt = function () {
    new TestingApi().FinishExamAttempt(this.state.token).then(response => {
      if (response.data.isSuccess) {
        this.props.router.push('/test-result/' + this.state.token)
      }
    })
  }

  unloadCallback = function (event) {
    event.preventDefault()
    event.returnValue = ''
    return ''
  }

  componentDidMount() {
    this.loadExamAttempt(this.props.token)

    // // Registering the 'begin' event and logging it to the console when triggered.
    // Events.scrollEvent.register('begin', (to, element) => {
    //   console.log('begin', to, element)
    // })

    // // Registering the 'end' event and logging it to the console when triggered.
    // Events.scrollEvent.register('end', (to, element) => {
    //   console.log('end', to, element)
    // })

    // // Updating scrollSpy when the component mounts.
    // scrollSpy.update()

    // window.addEventListener('beforeunload', this.unloadCallback)
    // return () => {
    //   window.addEventListener('popstate', confirmation())
    //   window.removeEventListener('beforeunload', this.unloadCallback)
    // }

    this.setState({ userProfile: JSON.parse(window.localStorage.getItem(authConfig.storageUserDataKeyName)) })
  }

  getSectionStat = function (section, type) {
    // Type: 0: answered, 1: not answer, 2: not view, 3: bookmark
    var tracking = this.state.userExamAttemptTracking
    if (!tracking) return 0
    if (type == 0) {
      return section.questionMaps.filter(function (n) {
        return tracking.questionAttempteds.indexOf(n.id) !== -1
      }).length
    }

    if (type == 3) {
      return section.questionMaps.filter(function (n) {
        return tracking.questionBookmarkeds.indexOf(n.id) !== -1
      }).length
    }

    if (type == 2) {
      return section.questionMaps.filter(function (n) {
        return tracking.questionSkippeds.indexOf(n.id) !== -1
      }).length
    }

    if (type == 1) {
      return (
        section.questionMaps.length -
        section.questionMaps.filter(function (n) {
          return tracking.questionAttempteds.indexOf(n.id) !== -1
        }).length
      )
    }
  }

  render() {
    return (
      <>
        <LoadingSpinner active={this.state.loading}>
          {this.state.examAttempt && (
            <Fullscreen enabled={this.state.fullScreen} onChange={fullScreen => this.setState({ fullScreen })}>
              <div id='__next'>
                <div className='flex flex-column flex-grow-1 bg-white'>
                  <div className='mt-header w-100 flex bb b--black-20'>
                    <div
                      className={
                        this.state.showHelp
                          ? ' w-100 flex pl3-l pl0 pr3-l pr2 items-center justify-between-l justify-start br-l bn b--black-20'
                          : 'w-80-l w-50 flex pl3-l pl0 pr3-l pr2 items-center justify-between-l justify-start br-l bn b--black-20'
                      }
                    >
                      <div className='db dn-l z-10 ml3'>
                        <span>
                          <svg className='db svg-f-gray' viewBox='0 0 40 36' version='1.1' width='25' height='18'>
                            <rect x='0' y='5.1' width='40' height='4'></rect>
                            <rect x='0' y='16' width='40' height='4'></rect>
                            <rect x='0' y='27' width='40' height='4'></rect>
                          </svg>
                        </span>
                      </div>
                      <span className='flex-l dn'>
                        <b> {this.state.examAttempt.name}</b>
                      </span>
                      <span className='flex ml3 ml0-l'>
                        <div
                          onClick={() => this.setState({ fullScreen: true })}
                          className='flex pointer br2 ba bg-transparent silver b--silver f6-l f7 ph2 ph3-l pv2 mr3-l mr1'
                        >
                          Toàn màn hình
                        </div>
                      </span>
                    </div>
                    {this.state.showHelp === false && (
                      <>
                        {this.state.mode !== 2 && (
                          <div className='flex items-center pa3 flex-grow-1'>
                            <span className='darkest-blue flex-l dn'>Thời gian còn lại:</span>
                            <span className='f4 fw7 flex-grow-1 justify-center flex darkest-blue'>
                              <Countdown
                                onComplete={() => {
                                  this.finishExamAttempt()
                                }}
                                onTick={() => {
                                  this.onTick()
                                }}
                                date={Date.now() + this.state.timeLeftInSeconds * 1000}
                                renderer={Clock}
                              />
                            </span>
                            <svg className='pointer' viewBox='0 0 36 36' version='1.1' width='28' height='28'>
                              <g fill='none' fillRule='evenodd'>
                                <circle cx='18' cy='18' r='17.5' fill='#F8C346' opacity='.297'></circle>
                                <g fill='#F5A623' transform='translate(6 3.5)'>
                                  <path d='M.46 14.808c0 6.451 5.241 11.693 11.693 11.693 6.451 0 11.693-5.242 11.693-11.693 0-3.203-1.3-6.138-3.405-8.243l-1.367-1.187a11.575 11.575 0 0 0-5.98-2.218v-.784h2.037a.908.908 0 0 0 .92-.918.91.91 0 0 0-.92-.919H9.084a.909.909 0 0 0-.918.919c0 .515.403.918.918.918h2.173v.784C5.209 3.63.46 8.67.46 14.808zm11.693-9.855c5.443 0 9.878 4.435 9.878 9.877 0 5.444-4.435 9.879-9.878 9.879-5.443 0-9.879-4.435-9.879-9.879 0-5.465 4.436-9.877 9.88-9.877z'></path>
                                  <rect width='1' height='9' x='9.41' y='10' stroke='#F5A623' rx='.5'></rect>
                                  <rect width='1' height='9' x='13.896' y='10' stroke='#F5A623' rx='.5'></rect>
                                </g>
                              </g>
                            </svg>
                          </div>
                        )}
                        {this.state.mode === 2 && (
                          <div className='flex items-center pa3 flex-grow-1'>
                            <span className='darkest-blue flex-l dn'>Thời gian làm bài:</span>
                            <span className='f4 fw7 flex-grow-1 justify-center flex darkest-blue'>30:20</span>
                            <svg className='pointer' viewBox='0 0 36 36' version='1.1' width='28' height='28'>
                              <g fill='none' fillRule='evenodd'>
                                <circle cx='18' cy='18' r='17.5' fill='#F8C346' opacity='.297'></circle>
                                <g fill='#F5A623' transform='translate(6 3.5)'>
                                  <path d='M.46 14.808c0 6.451 5.241 11.693 11.693 11.693 6.451 0 11.693-5.242 11.693-11.693 0-3.203-1.3-6.138-3.405-8.243l-1.367-1.187a11.575 11.575 0 0 0-5.98-2.218v-.784h2.037a.908.908 0 0 0 .92-.918.91.91 0 0 0-.92-.919H9.084a.909.909 0 0 0-.918.919c0 .515.403.918.918.918h2.173v.784C5.209 3.63.46 8.67.46 14.808zm11.693-9.855c5.443 0 9.878 4.435 9.878 9.877 0 5.444-4.435 9.879-9.878 9.879-5.443 0-9.879-4.435-9.879-9.879 0-5.465 4.436-9.877 9.88-9.877z'></path>
                                  <rect width='1' height='9' x='9.41' y='10' stroke='#F5A623' rx='.5'></rect>
                                  <rect width='1' height='9' x='13.896' y='10' stroke='#F5A623' rx='.5'></rect>
                                </g>
                              </g>
                            </svg>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {this.state.showConfirm === true && this.state.showHelp === false && (
                    <div className='flex flex-column center items-center justify-center vh-100 w-100 mh2'>
                      <div className='fw6 f4'>THỐNG KÊ</div>
                      <div className='flex w-100 overflow-auto justify-center-l justify-start ph3'>
                        <div className='mt3 flex flex-column'>
                          <div className='bg-light-sky-blue flex flex-shrink-0 br--top br3'>
                            <div className='flex w4-5 flex-shrink-0 pa3 sky-blue'>PHẦN</div>
                            <div className='flex flex-column tc w4-5 flex-shrink-0 pa3'>
                              <span className='sky-blue'>Tổng số câu hỏi</span>
                              <span className='f4 fw6 mt3'>{this.state.examAttempt.testGroup.questionMaps.length}</span>
                            </div>
                            <div className='flex flex-column tc w4-5 flex-shrink-0 pa3'>
                              <span className='sky-blue'>Đã trả lời</span>
                              <span className='f4 fw6 mt3'>
                                {this.state.userExamAttemptTracking.questionSubmitteds.length}
                              </span>
                            </div>
                            <div className='flex flex-column tc w4-5 flex-shrink-0 pa3'>
                              <span className='sky-blue'>Chưa trả lời</span>
                              <span className='f4 fw6 mt3'>
                                {this.state.examAttempt.testGroup.questionMaps.length -
                                  this.state.userExamAttemptTracking.questionSubmitteds.length}
                              </span>
                            </div>
                            <div className='flex flex-column tc w4-5 flex-shrink-0 pa3'>
                              <span className='sky-blue'>Chưa xem</span>
                              <span className='f4 fw6 mt3'>
                                {this.state.examAttempt.testGroup.questionMaps.length -
                                  this.state.userExamAttemptTracking.questionVisiteds.length}
                              </span>
                            </div>
                            <div className='flex flex-column tc w4-5 flex-shrink-0 pa3'>
                              <span className='sky-blue'>Đánh dấu</span>
                              <span className='f4 fw6 mt3'>
                                {this.state.userExamAttemptTracking.questionBookmarkeds.length}
                              </span>
                            </div>
                          </div>
                          <div className='flex flex-column ba b--black-20 br--bottom br3'>
                            {this.state.examAttempt.testGroup.sections.map(section => (
                              <div className='flex flex-shrink-0' key={`es-s-${section.id}`}>
                                <div className='flex w4-5 flex-shrink-0 pa3 bg-black-05 gray'>{section.name}</div>
                                <div className='flex items-center justify-center w4-5 flex-shrink-0 pa3 gray'>
                                  {section.questionMaps.length}
                                </div>
                                <div className='flex items-center justify-center w4-5 flex-shrink-0 pa3 gray'>
                                  {this.getSectionStat(section, 0)}
                                </div>
                                <div className='flex items-center justify-center w4-5 flex-shrink-0 pa3 red'>
                                  {this.getSectionStat(section, 1)}
                                </div>
                                <div className='flex items-center justify-center w4-5 flex-shrink-0 pa3 red'>
                                  {this.getSectionStat(section, 2)}
                                </div>
                                <div className='flex items-center justify-center w4-5 flex-shrink-0 pa3 gray'>
                                  {this.getSectionStat(section, 3)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className='fw6 f4 mt4'>Bạn có chắc chắn muốn nộp bài?</div>
                      {this.state.examAttempt.testGroup.questionMaps.length -
                        this.state.userExamAttemptTracking.questionSubmitteds.length >
                        0 && (
                        <div className='red mt2 flex tc'>
                          Bạn đang còn{' '}
                          {this.state.examAttempt.testGroup.questionMaps.length -
                            this.state.userExamAttemptTracking.questionSubmitteds.length}{' '}
                          chưa trả lời
                        </div>
                      )}
                      <div className='flex flex mt3'>
                        <div
                          onClick={() => {
                            this.confirmFinish(false)
                          }}
                          className='flex pointer br2 ba br2 flex ba b--black-10 gray w4 pa2 justify-center'
                        >
                          HỦY BỎ
                        </div>
                        <div
                          onClick={() => {
                            this.finishExamAttempt()
                          }}
                          className='flex pointer br2 ba br2 flex ba b--sky-blue bg-sky-blue white w4 ml3 pa2 justify-center'
                        >
                          ĐỒNG Ý
                        </div>
                      </div>
                    </div>
                  )}
                  {this.state.showConfirm === false && this.state.showHelp === false && (
                    <div className='flex'>
                      <div className='flex flex-column h-100 w-100 w-80-l br-l bn b--black-20 content-container justify-between-l'>
                        <div className='flex mh4-l mh3 flex-shrink-0'>
                          <div className='flex-l dn flex-shrink-0 gray items-center f6'>PHẦN :</div>
                          <div className='flex w-100 overflow-auto mh2'>
                            {this.state.examAttempt.testGroup.sections.map(section => (
                              <span
                                key={`section-header-${section.id}`}
                                className={this.sectionClassName(section.id)}
                                onClick={() => {
                                  this.changeTestGroupSection(section)
                                }}
                              >
                                {section.name}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className='flex flex-column w-100 h-100 flex-auto'>
                          <div className='flex justify-between ph4-l ph3 pv2 bg-black-10 flex-shrink-0'>
                            <span className='flex flex-row-l flex-column f6 w-100'>
                              <span className='flex items-center'>
                                <span className='darkest-blue fw6 mr3-l mr2'>
                                  Câu hỏi &nbsp;
                                  {this.state.currentQuestion && <>{this.state.currentQuestion.order}</>}
                                </span>
                              </span>
                              {/* <span className="gray mr3-l mr2">Single Correct</span>
                        <span className="gray">Marks : +4, -1.33</span> */}
                            </span>
                          </div>
                          {/* Queston detail */}
                          <div
                            id='question-content-panel'
                            className='ques-detail ph4-l ph3 flex mv4 flex-auto overflow-y-scroll overflow-unset-l'
                          >
                            {this.state.currentQuestion && (
                              <>
                                {/* Câu hỏi chính phụ */}
                                {this.state.currentQuestion.questionTypeId == QuestionType.GQ && (
                                  <>
                                    <div className='flex flex-column flex-auto  flex-row-l'>
                                      <span className='overflow-y-auto-l overflow-unset mb4 mb0-l mr0 mr3-l pr0 pr3-l w-50-l w-100 bn br-l b--moon-gray gray dn du-l'>
                                        <QuestionContent question={this.state.currentQuestion} />
                                      </span>
                                      <div className='relative dn-l mb4'>
                                        <div
                                          className='overflow-hidden '
                                          style={{
                                            maxHeight: '6.4rem',
                                            lineHeight: '1.6rem'
                                          }}
                                        >
                                          <QuestionContent question={this.state.currentQuestion} />
                                        </div>
                                      </div>
                                      <div className='flex flex-column overflow-y-auto-l overflow-unset w-50-l w-100'>
                                        {this.state.currentQuestion.children.map(question => (
                                          <div key={`q1-${question.id}`} id={`question-${question.id}`}>
                                            <>
                                              <b>Câu: {question.order}</b>
                                              <span className='gray mb2 flex-shrink-0'>
                                                <QuestionContent question={question} />
                                              </span>
                                              <div className='flex flex-column'>
                                                {this.state.userExamAttemptTracking.questionSubmitteds.indexOf(
                                                  question.id
                                                ) < 0 &&
                                                  this.state.mode !== 2 && (
                                                    <>
                                                      <div className='flex flex-column'>
                                                        {question.answers.map(answer => (
                                                          <div
                                                            onClick={() => {
                                                              this.onQuestionAttempted(question, answer.id)
                                                            }}
                                                            key={`answer-block1-${answer.id}`}
                                                            className='flex items-center mb2 pa3 br2 flex-shrink-0 ques-option pointer'
                                                          >
                                                            <div className='flex pointer mr3 items-center '>
                                                              {this.isSelectedAnswer(question.id, answer.id) && (
                                                                <span
                                                                  className={
                                                                    question.questionTypeId != QuestionType.MC
                                                                      ? 'w1-5 h1-5 pa1 border-box flex items-center justify-center br-100 ba b--sky-blue pointer mr3'
                                                                      : 'w1-5 h1-5 pa1 border-box flex items-center justify-center ba b--sky-blue pointer mr3'
                                                                  }
                                                                >
                                                                  <span
                                                                    className={
                                                                      question.questionTypeId != QuestionType.MC
                                                                        ? 'db w-100 h-100 border-box bg-sky-blue br-100'
                                                                        : 'db w-100 h-100 border-box bg-sky-blue'
                                                                    }
                                                                  ></span>
                                                                </span>
                                                              )}
                                                              {!this.isSelectedAnswer(question.id, answer.id) && (
                                                                <span
                                                                  className={
                                                                    question.questionTypeId != QuestionType.MC
                                                                      ? 'w1-5 h1-5 pa1 border-box flex items-center justify-center br-100 ba b--silver pointer mr3'
                                                                      : 'w1-5 h1-5 pa1 border-box flex items-center justify-center  ba b--silver pointer mr3'
                                                                  }
                                                                ></span>
                                                              )}
                                                            </div>
                                                            <div className='pointer'>
                                                              {ReactHtmlParser(answer.content)}
                                                            </div>
                                                          </div>
                                                        ))}
                                                      </div>
                                                      {(this.state.mode === 2 || this.state.mode === 3) && (
                                                        <QuestionExplain explain={question.explain} />
                                                      )}
                                                    </>
                                                  )}
                                                {(this.state.userExamAttemptTracking.questionSubmitteds.indexOf(
                                                  question.id
                                                ) >= 0 ||
                                                  this.state.mode == 2) && (
                                                  <>
                                                    <div className='flex flex-column'>
                                                      {question.answers.map(answer => (
                                                        <>
                                                          {this.state.userExamAttemptTracking.answerCorrects.indexOf(
                                                            answer.id
                                                          ) < 0 &&
                                                            answer.isCorrect == false &&
                                                            this.state.userExamAttemptTracking.answerIncorrects.indexOf(
                                                              answer.id
                                                            ) < 0 && (
                                                              <div
                                                                className='flex items-center mb2 pa3 br2 flex-shrink-0 '
                                                                key={`answer-block2-${answer.id}`}
                                                              >
                                                                <div className='flex  mr3 items-center '>
                                                                  <span className='w1-5 h1-5 pa1 border-box flex items-center justify-center br-100 ba bg-white mr3'></span>
                                                                </div>
                                                                <div>
                                                                  <span>{ReactHtmlParser(answer.content)}</span>
                                                                </div>
                                                              </div>
                                                            )}
                                                          {(this.state.userExamAttemptTracking.answerCorrects.indexOf(
                                                            answer.id
                                                          ) >= 0 ||
                                                            answer.isCorrect) && (
                                                            <div
                                                              className='flex items-center mb2 pa3 br2 flex-shrink-0 bg-washed-green'
                                                              key={`answer-block3-${answer.id}`}
                                                            >
                                                              <div className='flex  mr3 items-center '>
                                                                <span className='w1-5 h1-5 pa1 border-box flex items-center justify-center br-100 ba bg-green b--green mr3'>
                                                                  <svg
                                                                    className='db bg-green ba b--green br-100 svg-s-white svg-fn'
                                                                    viewBox='0 0 32 24'
                                                                    version='1.1'
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    width='12px'
                                                                    height='12px'
                                                                    style={{
                                                                      strokeWidth: '5px'
                                                                    }}
                                                                  >
                                                                    <polyline points='2.6 13.4 11.3 21.4 29.7 2.9'></polyline>
                                                                  </svg>
                                                                </span>
                                                              </div>
                                                              <div>
                                                                <span>{ReactHtmlParser(answer.content)}</span>
                                                              </div>
                                                            </div>
                                                          )}

                                                          {this.state.userExamAttemptTracking.answerIncorrects.indexOf(
                                                            answer.id
                                                          ) >= 0 && (
                                                            <div
                                                              key={`answer-block4-${answer.id}`}
                                                              className='flex items-center mb2 pa3 br2 flex-shrink-0 bg-washed-red'
                                                            >
                                                              <div className='flex  mr3 items-center '>
                                                                <span className='w1-5 h1-5 pa1 border-box flex items-center justify-center br-100 ba bg-red b--red mr3'>
                                                                  <svg
                                                                    className='svg-s-white'
                                                                    viewBox='0 0 24 24'
                                                                    version='1.1'
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    width='12px'
                                                                    height='12px'
                                                                    style={{
                                                                      strokeWidth: '4px'
                                                                    }}
                                                                  >
                                                                    <line x1='2.5' y1='2.9' x2='21.5' y2='21.9'></line>
                                                                    <line x1='21.5' y1='2.9' x2='2.5' y2='21.9'></line>
                                                                  </svg>
                                                                </span>
                                                              </div>
                                                              <div>
                                                                <span>{ReactHtmlParser(answer.content)}</span>
                                                              </div>
                                                            </div>
                                                          )}
                                                        </>
                                                      ))}
                                                    </div>
                                                    <QuestionExplain explain={question.explain} />
                                                  </>
                                                )}
                                                {/* {question.answers.map(answer => (
                                                  <div
                                                    key={`a-${answer.id}`}
                                                    onClick={() => {
                                                      this.onQuestionAttempted(question, answer.id)
                                                    }}
                                                    className='flex items-center mb2 pa3 br2 flex-shrink-0 ques-option pointer'
                                                  >
                                                    <div className='flex pointer mr3 items-center '>
                                                      {this.isSelectedAnswer(question.id, answer.id) && (
                                                        <span
                                                          className={
                                                            question.questionTypeId != QuestionType.MC
                                                              ? 'w1-5 h1-5 pa1 border-box flex items-center justify-center br-100 ba b--sky-blue pointer mr3'
                                                              : 'w1-5 h1-5 pa1 border-box flex items-center justify-center ba b--sky-blue pointer mr3'
                                                          }
                                                        >
                                                          <span
                                                            className={
                                                              question.questionTypeId != QuestionType.MC
                                                                ? 'db w-100 h-100 border-box bg-sky-blue br-100'
                                                                : 'db w-100 h-100 border-box bg-sky-blue'
                                                            }
                                                          ></span>
                                                        </span>
                                                      )}
                                                      {!this.isSelectedAnswer(question.id, answer.id) && (
                                                        <span
                                                          className={
                                                            question.questionTypeId != QuestionType.MC
                                                              ? 'w1-5 h1-5 pa1 border-box flex items-center justify-center br-100 ba b--silver pointer mr3'
                                                              : 'w1-5 h1-5 pa1 border-box flex items-center justify-center  ba b--silver pointer mr3'
                                                          }
                                                        ></span>
                                                      )}
                                                    </div>
                                                    <div className='pointer'>{answer.content}</div>
                                                  </div>
                                                ))} */}
                                              </div>
                                            </>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </>
                                )}
                                {/* Câu hỏi thông thường */}
                                {this.state.currentQuestion.questionTypeId !== QuestionType.GQ && (
                                  <>
                                    <div className='flex flex-column flex-auto  overflow-y-auto-l overflow-unset'>
                                      <span className='mb4 w-100 gray dn du-l'>
                                        <QuestionContent question={this.state.currentQuestion} />
                                      </span>
                                      <div className='relative dn-l mb4'>
                                        <div
                                          className='overflow-hidden '
                                          style={{
                                            maxHeight: '6.4rem',
                                            lineHeight: '1.6rem'
                                          }}
                                        >
                                          <QuestionContent question={this.state.currentQuestion} />
                                        </div>
                                      </div>
                                      <div className='flex flex-column w-100'>
                                        {this.state.userExamAttemptTracking.questionSubmitteds.indexOf(
                                          this.state.currentQuestion.id
                                        ) < 0 &&
                                          this.state.mode !== 2 && (
                                            <>
                                              <div className='flex flex-column'>
                                                {this.state.currentQuestion.answers.map(answer => (
                                                  <div
                                                    onClick={() => {
                                                      this.onQuestionAttempted(this.state.currentQuestion, answer.id)
                                                    }}
                                                    key={`answer-block1-${answer.id}`}
                                                    className='flex items-center mb2 pa3 br2 flex-shrink-0 ques-option pointer'
                                                  >
                                                    <div className='flex pointer mr3 items-center '>
                                                      {this.isSelectedAnswer(
                                                        this.state.currentQuestion.id,
                                                        answer.id
                                                      ) && (
                                                        <span
                                                          className={
                                                            this.state.currentQuestion.questionTypeId != QuestionType.MC
                                                              ? 'w1-5 h1-5 pa1 border-box flex items-center justify-center br-100 ba b--sky-blue pointer mr3'
                                                              : 'w1-5 h1-5 pa1 border-box flex items-center justify-center ba b--sky-blue pointer mr3'
                                                          }
                                                        >
                                                          <span
                                                            className={
                                                              this.state.currentQuestion.questionTypeId !=
                                                              QuestionType.MC
                                                                ? 'db w-100 h-100 border-box bg-sky-blue br-100'
                                                                : 'db w-100 h-100 border-box bg-sky-blue'
                                                            }
                                                          ></span>
                                                        </span>
                                                      )}
                                                      {!this.isSelectedAnswer(
                                                        this.state.currentQuestion.id,
                                                        answer.id
                                                      ) && (
                                                        <span
                                                          className={
                                                            this.state.currentQuestion.questionTypeId != QuestionType.MC
                                                              ? 'w1-5 h1-5 pa1 border-box flex items-center justify-center br-100 ba b--silver pointer mr3'
                                                              : 'w1-5 h1-5 pa1 border-box flex items-center justify-center  ba b--silver pointer mr3'
                                                          }
                                                        ></span>
                                                      )}
                                                    </div>
                                                    <div className='pointer'>{ReactHtmlParser(answer.content)}</div>
                                                  </div>
                                                ))}
                                              </div>
                                              {(this.state.mode === 2 || this.state.mode === 3) && (
                                                <QuestionExplain explain={this.state.currentQuestion.explain} />
                                              )}
                                            </>
                                          )}
                                        {(this.state.userExamAttemptTracking.questionSubmitteds.indexOf(
                                          this.state.currentQuestion.id
                                        ) >= 0 ||
                                          this.state.mode == 2) && (
                                          <>
                                            <div className='flex flex-column'>
                                              {this.state.currentQuestion.answers.map(answer => (
                                                <>
                                                  {this.state.userExamAttemptTracking.answerCorrects.indexOf(
                                                    answer.id
                                                  ) < 0 &&
                                                    answer.isCorrect == false &&
                                                    this.state.userExamAttemptTracking.answerIncorrects.indexOf(
                                                      answer.id
                                                    ) < 0 && (
                                                      <div
                                                        className='flex items-center mb2 pa3 br2 flex-shrink-0 '
                                                        key={`answer-block2-${answer.id}`}
                                                      >
                                                        <div className='flex  mr3 items-center '>
                                                          <span className='w1-5 h1-5 pa1 border-box flex items-center justify-center br-100 ba bg-white mr3'></span>
                                                        </div>
                                                        <div>
                                                          <span>{ReactHtmlParser(answer.content)}</span>
                                                        </div>
                                                      </div>
                                                    )}
                                                  {(this.state.userExamAttemptTracking.answerCorrects.indexOf(
                                                    answer.id
                                                  ) >= 0 ||
                                                    answer.isCorrect) && (
                                                    <div
                                                      className='flex items-center mb2 pa3 br2 flex-shrink-0 bg-washed-green'
                                                      key={`answer-block3-${answer.id}`}
                                                    >
                                                      <div className='flex  mr3 items-center '>
                                                        <span className='w1-5 h1-5 pa1 border-box flex items-center justify-center br-100 ba bg-green b--green mr3'>
                                                          <svg
                                                            className='db bg-green ba b--green br-100 svg-s-white svg-fn'
                                                            viewBox='0 0 32 24'
                                                            version='1.1'
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            width='12px'
                                                            height='12px'
                                                            style={{
                                                              strokeWidth: '5px'
                                                            }}
                                                          >
                                                            <polyline points='2.6 13.4 11.3 21.4 29.7 2.9'></polyline>
                                                          </svg>
                                                        </span>
                                                      </div>
                                                      <div>
                                                        <span>{ReactHtmlParser(answer.content)}</span>
                                                      </div>
                                                    </div>
                                                  )}

                                                  {this.state.userExamAttemptTracking.answerIncorrects.indexOf(
                                                    answer.id
                                                  ) >= 0 && (
                                                    <div
                                                      key={`answer-block4-${answer.id}`}
                                                      className='flex items-center mb2 pa3 br2 flex-shrink-0 bg-washed-red'
                                                    >
                                                      <div className='flex  mr3 items-center '>
                                                        <span className='w1-5 h1-5 pa1 border-box flex items-center justify-center br-100 ba bg-red b--red mr3'>
                                                          <svg
                                                            className='svg-s-white'
                                                            viewBox='0 0 24 24'
                                                            version='1.1'
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            width='12px'
                                                            height='12px'
                                                            style={{
                                                              strokeWidth: '4px'
                                                            }}
                                                          >
                                                            <line x1='2.5' y1='2.9' x2='21.5' y2='21.9'></line>
                                                            <line x1='21.5' y1='2.9' x2='2.5' y2='21.9'></line>
                                                          </svg>
                                                        </span>
                                                      </div>
                                                      <div>
                                                        <span>{ReactHtmlParser(answer.content)}</span>
                                                      </div>
                                                    </div>
                                                  )}
                                                </>
                                              ))}
                                            </div>
                                            <QuestionExplain explain={this.state.currentQuestion.explain} />
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        {this.state.mode !== 2 && (
                          <div className='w-100 flex ph4-l ph3 pv2 justify-between bg-light-sky-blue flex-shrink-0'>
                            <div className='flex'>
                              <div
                                className='flex pointer br2 ba bg-transparent ttu sky-blue b--sky-blue f6-l f7 ph2 ph3-l pv2'
                                data-s='mfr'
                                onClick={() => {
                                  this.bookMarkQuestion()
                                }}
                              >
                                Đánh dấu để xem sau
                              </div>
                              {/* {this.state.mode !== 2 && (
                                <div
                                  onClick={() => {
                                    this.clearCurrentAttemptedQuestion()
                                  }}
                                  className='flex pointer br2 ba ml3 bg-transparent ttu sky-blue b--sky-blue f6-l f7 ph2 ph3-l pv2'
                                  data-s='clr'
                                >
                                  Xóa trả lời
                                </div>
                              )} */}
                            </div>
                            <div
                              onClick={() => {
                                this.saveAndNext()
                              }}
                              className='flex pointer br2 ba ml3 bg-sky-blue ttu white b--sky-blue f6-l f7 ph2 ph3-l pv2'
                            >
                              {this.state.mode === 0 && <span>Tiếp tục</span>}
                              {this.state.mode === 1 && <span> Lưu và Tiếp tục</span>}
                            </div>
                          </div>
                        )}
                        {this.state.mode === 2 && (
                          <div className='w-100 flex ph4-l ph3 pv2 justify-between bg-light-sky-blue flex-shrink-0'>
                            <div className='flex'>
                              <div
                                className='flex pointer br2 ba bg-transparent ttu sky-blue b--sky-blue f6-l f7 ph2 ph3-l pv2'
                                data-s='mfr'
                                onClick={() => {
                                  this.navigateQuestion(false)
                                }}
                              >
                                Câu trước
                              </div>
                            </div>
                            <div
                              onClick={() => {
                                this.navigateQuestion(true)
                              }}
                              className='flex pointer br2 ba bg-transparent ttu sky-blue b--sky-blue f6-l f7 ph2 ph3-l pv2'
                            >
                              <span>Câu tiếp theo</span>
                            </div>
                          </div>
                        )}
                        {/* {this.state.mode === 2 && (
                          <div className='w-100 flex ph4-l ph3 pv2 bg-light-sky-blue'>
                            <div
                              className='flex pointer br2 ba ml-auto bg-transparent ttu sky-blue b--sky-blue f6-l f7 ph2 ph3-l pv2'
                              data-s='next'
                              onClick={() => {
                                this.saveAndNext()
                              }}
                            >
                              Câu tiếp theo
                            </div>
                          </div>
                        )} */}
                      </div>
                      {/* Question Palette */}
                      <div className='flex-l dn w-20'>
                        <div className='flex flex-column flex-grow-1 content-container overflow-hidden'>
                          <div className='ph3 pv2 flex justify-between bt bb bw1 b--white'>
                            <span className='f4-5 flex-grow-1 flex darkest-blue items-center'>
                              {this.state.userProfile && (
                                <>
                                  <span>{this.state.userProfile.name}</span>
                                  &nbsp;({this.state.userProfile.userName})
                                </>
                              )}
                            </span>
                            <div
                              className='main-header__user-pic ma-auto br-100 overflow-hidden bg-mid-light-gray'
                              style={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/v1/account.png)`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center',
                                backgroundSize: 'cover',
                                height: '30px',
                                width: '30px'
                              }}
                            ></div>
                          </div>
                          <div style={{ overflowY: 'auto' }}>
                            {this.state.examAttempt.testGroup.sections.map(section => (
                              <div key={`section-panel-${section.id}`} id={`section-panel-${section.id}`}>
                                <>
                                  <div className='flex pv2 ph3 f6 overflow-ellipsis flex-shrink-0 bg-light-sky-blue darkest-blue'>
                                    <span className='ml1 overflow-ellipsis'>{section.name}</span>
                                  </div>
                                  <div className='flex flex-column flex-grow-1 overflow-auto'>
                                    <div className='flex flex-wrap mv3'>
                                      {section.questionMaps.map((question, index) => (
                                        <>
                                          <div
                                            key={`question-panel-${section.id}`}
                                            onClick={() => {
                                              this.viewQuestion(
                                                question.id,
                                                question.parentId,
                                                question.itemId,
                                                section.id
                                              )
                                            }}
                                            className='flex items-center justify-center mb3 relative'
                                            style={{ flexBasis: '20%' }}
                                          >
                                            <div className={this.questionClassName(question.id)}>
                                              <span className='f6 z-1'>{question.order}</span>
                                              {this.state.userExamAttemptTracking.questionBookmarkeds.indexOf(
                                                question.id
                                              ) >= 0 && (
                                                <span
                                                  className='ba bw1 b--white w1 h1 br-100 bg-white absolute flex items-center justify-center'
                                                  style={{
                                                    top: '-8px',
                                                    right: '-8px'
                                                  }}
                                                >
                                                  <svg
                                                    className='db svg-f-gold'
                                                    viewBox='0 0 32 32'
                                                    version='1.1'
                                                    width='14'
                                                    height='14'
                                                  >
                                                    <path
                                                      fillRule='evenodd'
                                                      d='M15.702 24.058L6.79 28.724l1.702-9.884-7.21-7 9.963-1.441 4.456-8.993 4.455 8.993 9.963 1.442-7.209 7 1.702 9.883z'
                                                    ></path>
                                                  </svg>
                                                </span>
                                              )}
                                            </div>
                                            {/* Show underline for current question */}
                                            {this.state.currentQuestionId === question.id && (
                                              <span
                                                className='w2 bg-sky-blue absolute left-0'
                                                style={{
                                                  height: '2px',
                                                  bottom: '-10px',
                                                  left: '50%',
                                                  transform: 'translateX(-50%)'
                                                }}
                                              ></span>
                                            )}
                                          </div>
                                        </>
                                      ))}
                                    </div>
                                  </div>
                                </>
                              </div>
                            ))}
                          </div>
                          {this.state.mode == 1 && (
                            <div className='flex flex-wrap flex-shrink-0 pa3'>
                              <div className='flex w-50 items-center mb3'>
                                <span className='w1 h1 br-100 bg-green'></span>
                                <span className='ml2 silver f6'>Đã trả lời</span>
                              </div>
                              <div className='flex w-50 items-center mb3'>
                                <span className='w1 h1 br-100 bg-red'></span>
                                <span className='ml2 silver f6'>Chưa trả lời</span>
                              </div>
                              <div className='flex w-50 items-center'>
                                <span className='w1 h1 br-100'>
                                  <svg
                                    className='db svg-f-gold'
                                    viewBox='0 0 32 32'
                                    version='1.1'
                                    width='14'
                                    height='14'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M15.702 24.058L6.79 28.724l1.702-9.884-7.21-7 9.963-1.441 4.456-8.993 4.455 8.993 9.963 1.442-7.209 7 1.702 9.883z'
                                    ></path>
                                  </svg>
                                </span>
                                <span className='ml2 silver f6'>Đánh dấu để xem</span>
                              </div>
                              <div className='flex w-50 items-center'>
                                <span className='w1 h1 br-100 ba b--very-light-gray'></span>
                                <span className='ml2 silver f6'>Chưa xem</span>
                              </div>
                            </div>
                          )}
                          {this.state.mode !== 1 && (
                            <div className='flex flex-wrap flex-shrink-0 pa3'>
                              <div className='flex w-50 items-center mb3'>
                                <span className='w1 h1 br-100 bg-green'></span>
                                <span className='ml2 silver f6'>Trả lời đúng</span>
                              </div>
                              <div className='flex w-50 items-center mb3'>
                                <span className='w1 h1 br-100 bg-red'></span>
                                <span className='ml2 silver f6'>Trả lời sai</span>
                              </div>
                              <div className='flex w-50 items-center'>
                                <span className='w1 h1 br-100'>
                                  <svg
                                    className='db svg-f-gold'
                                    viewBox='0 0 32 32'
                                    version='1.1'
                                    width='14'
                                    height='14'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M15.702 24.058L6.79 28.724l1.702-9.884-7.21-7 9.963-1.441 4.456-8.993 4.455 8.993 9.963 1.442-7.209 7 1.702 9.883z'
                                    ></path>
                                  </svg>
                                </span>
                                <span className='ml2 silver f6'>Đánh dấu để xem</span>
                              </div>
                              <div className='flex w-50 items-center'>
                                <span className='w1 h1 br-100 ba b--very-light-gray'></span>
                                <span className='ml2 silver f6'>Chưa xem</span>
                              </div>
                            </div>
                          )}
                          <div className='flex flex-column mv2'>
                            <div className='flex justify-between mh2'>
                              {this.state.lastUpdated && (
                                <span className='ml2 silver f6'>
                                  Lưu bài gần nhất:
                                  {moment(this.state.lastUpdated).format('DD-MM-YYYY hh:mm:ss')}
                                </span>
                              )}
                            </div>
                          </div>
                          {this.state.mode !== 2 && (
                            <div className='flex flex-column mv2'>
                              <div className='flex justify-between mh2'>
                                <div
                                  onClick={() => {
                                    this.showHelp(true)
                                  }}
                                  className='flex pointer br2 ba flex-grow-1 f6 b--black-20 silver justify-center pa2'
                                >
                                  Hướng dẫn
                                </div>
                              </div>
                              <div
                                onClick={() => {
                                  this.confirmFinish(true)
                                }}
                                className='flex pointer br2 ba mt2 sky-blue mh2 ttu f6 b--sky-blue fw6 justify-center pa2'
                              >
                                Nộp bài
                              </div>
                            </div>
                          )}
                          {this.state.mode == 2 && (
                            <div className='flex flex-column mv2'>
                              <div
                                onClick={() => {
                                  this.viewResult()
                                }}
                                className='flex pointer br2 ba mt2 sky-blue mh2 ttu f6 b--sky-blue fw6 justify-center pa2'
                              >
                                Kết quả
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {this.state.showHelp === true && (
                    <div className='flex flex-column flex-grow-1 justify-between'>
                      <Help />
                      <div
                        onClick={() => {
                          this.showHelp(false)
                        }}
                        className='flex bg-green white pv2 pointer justify-center fw6 sticky bottom-0'
                      >
                        TIẾP TỤC
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Fullscreen>
          )}
        </LoadingSpinner>
      </>
    )
  }
}

export default withRouter(TestDetails)
