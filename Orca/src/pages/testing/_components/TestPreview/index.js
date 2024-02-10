import React from 'react'

import QuestionApi from 'api/question-api'
import TestApi from 'api/test-api'
import authConfig from 'configs/auth'
import _ from 'lodash'
import Head from 'next/head'
import { withRouter } from 'next/router'
import ReactHtmlParser from 'react-html-parser'
import { scroller } from 'react-scroll'

import LoadingSpinner from '@core/components/loading-spinner'

import QuestionContent from '../Question/QuestionContent'

class TestPreview extends React.Component {
  state = {
    loading: false,
    currentQuestionId: 0, // Id of current question.
    currentSectionId: 0,
    currentQuestion: null, // Current question, nếu là chính phụ là Parent Question.
    totalQuestion: 0,
    test: null,
    userProfile: null
  }

  loadTestById(testId) {
    const testingApi = new TestApi()
    testingApi.getTestPreview(testId).then(response => {
      let test = response.data
      this.initialize(test)
    })
  }

  loadQuestionById(questionId) {
    const questionApi = new QuestionApi()
    questionApi.getQuestionPreview(questionId).then(response => {
      let test = response.data
      this.initialize(test)
    })
  }

  initialize(test) {
    // Determine the question to render after initializing
    let question = test.testGroup.sections[0].items[0].questions[0]
    this.setState(
      {
        test: test,
        currentSectionId: test.testGroup.sections[0].id,
        currentQuestion: question,
        totalQuestion: test.testGroup.questionMaps.length,
        currentQuestionId: question.id
      },
      // Select the first question after setSate.
      () => {
        this.viewQuestion(question.id, question.parentId, question.testGroupSectionItemId, question.testGroupSectionId)
      }
    )
  }

  changeTestGroupSection(section) {
    var firstQuetion = section.items[0].questions[0]
    var currentQuestionId = firstQuetion.questionTypeId == 9 ? firstQuetion.children[0].id : firstQuetion.id

    this.setState({
      currentQuestion: firstQuetion,
      currentSectionId: section.id,
      currentQuestionId: currentQuestionId
    })
  }

  scrollToQuestion(questionId) {
    scroller.scrollTo(`question-${questionId}`, {
      duration: 800,
      delay: 0,
      offset: -130,
      smooth: 'easeInOutQuart'
    })
  }

  saveAndNext() {
    let currentQuestionIndex = 0
    currentQuestionIndex = _.findIndex(this.state.test.testGroup.questionMaps, {
      id: this.state.currentQuestionId
    })

    currentQuestionIndex++

    const totalQuestion = this.state.test.testGroup.questionMaps.length
    if (currentQuestionIndex == totalQuestion) {
      return
    }

    const nextQuestion = this.state.test.testGroup.questionMaps[currentQuestionIndex]

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
    return notVisitedClassName
  }

  viewQuestion(questionId, parentQuestionId, sectionItemId, sectionId) {
    if (parentQuestionId == 0) {
      parentQuestionId = questionId
    }

    var section = this.state.test.testGroup.sections.filter(x => x.id == sectionId)[0]
    var sectionItem = section.items.filter(x => x.id == sectionItemId)[0]
    var question = sectionItem.questions.filter(x => x.id == parentQuestionId)[0]

    //Save to state
    this.setState(prevState => ({
      ...prevState,
      currentQuestion: question,
      currentQuestionId: questionId
    }))

    this.scrollToQuestion(questionId)
  }

  componentDidMount() {
    // this.props.token

    if (this.props.testId) {
      this.loadTestById(this.props.testId)
    }
    if (this.props.questionId) {
      this.loadQuestionById(this.props.questionId)
    }

    this.setState({ userProfile: JSON.parse(window.localStorage.getItem(authConfig.storageUserDataKeyName)) })
  }

  render() {
    return (
      <>
        <Head>
          <title>{`Xem trước đề thi `}</title>
        </Head>
        <LoadingSpinner active={this.state.loading}>
          {this.state.test && (
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
                      <b> {this.state.test.name}</b>
                    </span>
                  </div>
                  <div className='flex items-center pa3 flex-grow-1'>
                    <span className='darkest-blue flex-l dn'>Thời gian làm bài:</span>
                    <span className='f4 fw7 flex-grow-1 justify-center flex darkest-blue'>00:00</span>
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
                </div>

                <div className='flex'>
                  <div className='flex flex-column h-100 w-100 w-80-l br-l bn b--black-20 content-container justify-between-l'>
                    <div className='flex mh4-l mh3 flex-shrink-0'>
                      <div className='flex-l dn flex-shrink-0 gray items-center f6'>PHẦN :</div>
                      <div className='flex w-100 overflow-auto mh2'>
                        {this.state.test.testGroup.sections.map(section => (
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
                      <div className='ques-detail ph4-l ph3 flex mv4 flex-auto overflow-y-scroll overflow-unset-l'>
                        {this.state.currentQuestion && (
                          <>
                            {/* Câu hỏi chính phụ */}
                            {this.state.currentQuestion.questionTypeId == 9 && (
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
                                      <div key={`q-${question.id}`}>
                                        {this.state.currentQuestionId == question.id && (
                                          <>
                                            <b>Câu: {question.order}</b>
                                            <span className='gray mb2 flex-shrink-0'>
                                              <QuestionContent question={question} />
                                            </span>
                                            <div className='flex flex-column'>
                                              {question.answers.map(item => (
                                                <div
                                                  key={`a-{item.id}`}
                                                  className='flex items-center mb2 pa3 br2 flex-shrink-0 ques-option pointer'
                                                >
                                                  <div className='flex pointer mr3 items-center '>
                                                    <span className='w1-5 h1-5 pa1 border-box flex items-center justify-center br-100 ba b--silver pointer mr3'></span>
                                                  </div>
                                                  <div className='pointer'>{item.content}</div>
                                                </div>
                                              ))}
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </>
                            )}
                            {/* Câu hỏi thông thường */}
                            {this.state.currentQuestion.questionTypeId != 9 && (
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
                                    <div className='flex flex-column'>
                                      {this.state.currentQuestion.answers.map(answer => (
                                        <>
                                          {answer.isCorrect == false && (
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
                                          {answer.isCorrect && (
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
                                        </>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                      {/* End of Question detail */}
                    </div>
                    <div class='w-100 flex ph4-l ph3 pv2 bg-light-sky-blue'>
                      <div
                        onClick={() => {
                          this.saveAndNext()
                        }}
                        class='flex pointer br2 ba ml-auto bg-transparent ttu sky-blue b--sky-blue f6-l f7 ph2 ph3-l pv2'
                        data-s='next'
                      >
                        Tiếp tục &gt;
                      </div>
                    </div>
                  </div>
                  <div className='flex-l dn w-20'>
                    <div className='flex flex-column flex-grow-1 content-container overflow-hidden'>
                      <div className='ph3 pv2 flex justify-between bt bb bw1 b--white'>
                        <span className='flex-grow-1 flex darkest-blue items-center'>
                          {this.state.userProfile && (
                            <>
                              <span style={{fontSize: '0.96rem'}}>{this.state.userProfile.name}</span>
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
                      {this.state.test.testGroup.sections.map(section => (
                        <div key={`section-panel-${section.id}`}>
                          <div className='flex pv2 ph3 f6 overflow-ellipsis flex-shrink-0 bg-light-sky-blue darkest-blue'>
                            <span className='ml1 overflow-ellipsis'>{section.name}</span>
                          </div>
                          <div className='flex flex-column pa3 flex-grow-1 overflow-auto'>
                            <div className='flex flex-wrap'>
                              {section.items.map(item => (
                                <>
                                  {item.questions.map(question => (
                                    <div
                                      key={`question-panel-${question.id}`}
                                      onClick={() => {
                                        this.viewQuestion(
                                          question.id,
                                          question.parentId,
                                          question.testGroupSectionItemId,
                                          section.id
                                        )
                                      }}
                                      className='flex items-center justify-center mb3 relative'
                                      style={{ flexBasis: '20%' }}
                                    >
                                      <div className={this.questionClassName(question.id)}>
                                        <span className='f6 z-1'>{question.order}</span>
                                      </div>
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
                                  ))}
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className='flex flex-column mv2'>
                        {this.props.testGroupId && (
                          <a
                            href={`/apps/test-group/${this.props.testGroupId}/tests/`}
                            className='flex pointer br2 ba mt2 sky-blue mh2 ttu f6 b--sky-blue fw6 justify-center pa2'
                          >
                            Quay lại
                          </a>
                        )}
                        {this.props.examId && (
                          <a
                            href={`/apps/exam/${this.props.examId}/items/${this.props.itemId}/tests/`}
                            className='flex pointer br2 ba mt2 sky-blue mh2 ttu f6 b--sky-blue fw6 justify-center pa2'
                          >
                            Quay lại
                          </a>
                        )}
                        {this.props.catalogId &&
                          this.props.categoryId(
                            <a
                              href={`/apps/question-catalog/${this.props.catalogId}/categories/${this.props.categoryId}/questions/`}
                              className='flex pointer br2 ba mt2 sky-blue mh2 ttu f6 b--sky-blue fw6 justify-center pa2'
                            >
                              Quay lại
                            </a>
                          )}
                        {this.props.catalogId &&
                          !this.props.categoryId(
                            <a
                              href={`/apps/question-catalog/${this.props.catalogId}/questions/`}
                              className='flex pointer br2 ba mt2 sky-blue mh2 ttu f6 b--sky-blue fw6 justify-center pa2'
                            >
                              Quay lại
                            </a>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </LoadingSpinner>
      </>
    )
  }
}

export default withRouter(TestPreview)
