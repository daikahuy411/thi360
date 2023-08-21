import React from 'react'

// Renderer callback with condition
const Help = () => {
  return (
    <>
      <div className='ph3'>
        <div style={{ fontSize: '0.9em' }} className='sysInsTest1'>
          <div className='instructionSection'>
            {/* <p className="text-center">
                          <strong>
                            Please read the following instructions carefully
                          </strong>
                        </p> */}
            <p>
              <strong>
                <u>Hướng dẫn làm bài thi:</u>
              </strong>
            </p>
            <ol>
              <li>
                Đồng hồ đếm ngược thời gian ở góc phải trên cùng màn hình của bạn sẽ hiển thị thời gian còn lại cho bạn
                hoàn thành bài thi. Khi hết hạn nộp bài, hệ thống sẽ tự động thu bài của bạn.
                {/* The clock has been set at the server and the
                            countdown timer at the top right corner of your
                            screen will display the time remaining for you to
                            complete the exam. When the clock runs out the exam
                            ends by default - you are not required to end or
                            submit your exam. */}
              </li>
              <li>
                Bảng câu hỏi ở góc phải màn hình thế hiện câu hỏi được đánh số theo các trạng thái sau:
                {/* The question palette at the right of screen shows
                            one of the following statuses of each of the
                            questions numbered: */}
                <br />
                <table>
                  <tbody>
                    <tr>
                      <td valign='top'>
                        <span id='tooltip_not_visited'>1</span>
                      </td>
                      <td>
                        Câu hỏi bạn chưa xem.
                        {/* You have not visited the question yet. */}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <tbody>
                    <tr>
                      <td valign='top'>
                        <span id='tooltip_not_answered'>3</span>
                      </td>
                      <td>
                        Câu hỏi bạn chưa trả lời.
                        {/* You have not answered the question. */}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <tbody>
                    <tr>
                      <td valign='top'>
                        <span id='tooltip_answered'>5</span>
                      </td>
                      <td>
                        Câu hỏi bạn đã trả lời.
                        {/* You have answered the question. */}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <tbody>
                    <tr>
                      <td valign='top' style={{ position: 'relative' }}>
                        <span id='tooltip_review'>7</span>
                        <svg className='star-icon' viewBox='0 0 32 32' version='1.1' width='14' height='14'>
                          <path
                            fill-rule='evenodd'
                            d='M15.702 24.058L6.79 28.724l1.702-9.884-7.21-7 9.963-1.441 4.456-8.993 4.455 8.993 9.963 1.442-7.209 7 1.702 9.883z'
                          ></path>
                        </svg>
                      </td>
                      <td>
                        Câu hỏi bạn chưa trả lời và đánh dấu để xem sau.
                        {/* You have NOT answered the question but have
                                    marked the question for review. */}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <tbody>
                    <tr>
                      <td valign='top' style={{ position: 'relative' }}>
                        <span id='tooltip_reviewanswered'> 9</span>
                        <svg className='star-icon' viewBox='0 0 32 32' version='1.1' width='14' height='14'>
                          <path
                            fill-rule='evenodd'
                            d='M15.702 24.058L6.79 28.724l1.702-9.884-7.21-7 9.963-1.441 4.456-8.993 4.455 8.993 9.963 1.442-7.209 7 1.702 9.883z'
                          ></path>
                        </svg>
                      </td>
                      <td>
                        Câu hỏi bạn đã trả lời và đánh dấu xem sau.
                        {/* You have answered the question but marked it
                                    for review. */}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li style={{ listStyleType: 'none' }}>
                Câu hỏi được đánh dấu xem sau giúp bạn có thể đánh dấu lại câu hỏi cần xem lại.
                {/* The Marked for Review status simply acts as a
                            reminder that you have set to look at the question
                            again. */}
                {/* <font color="red">
                              <i>
                                If an answer is selected for a question that is
                                Marked for Review, the answer will be considered
                                in the final evaluation.
                              </i>
                            </font> */}
              </li>
            </ol>
            <p>
              <strong>
                {/* <u>Navigating to a question :</u> */}
                <u>Di chuyển tới Câu hỏi:</u>
              </strong>
            </p>
            <ol start='3'>
              <li>
                {/* To select a question to answer, you can do one of
                            the following: */}
                Bạn có 3 cách để chọn một câu hỏi
                <ol type='a'>
                  <li>
                    Chọn vào số thứ tự câu hỏi ở Bảng cẩu hỏi bên phải màn hình. Hệ thống sẽ chuyển bạn tới câu hỏi đó.
                    Chú ý: khi đó hệ thống không lưu đáp án của bạn đã chọn của câu hỏi hiện tại.
                    {/* Click on the question number on the question
                                palette at the right of your screen to go to
                                that numbered question directly. Note that using
                                this option does NOT save your answer to the
                                current question. */}
                  </li>
                  <li>
                    Chọn vào "Lưu và Tiếp tục" để hệ thống lưu trả lời của bạn với câu hỏi hiện tại và chuyển tiếp sang
                    câu hỏi tuần tự tiếp theo.
                    {/* Click on Save and Next to save answer to current
                                question and to go to the next question in
                                sequence. */}
                  </li>
                  <li>
                    Chọn vào "Đánh dấu để xem", hệ thống sẽ Đánh dấu câu hỏi hiện tại và chuyển bạn sang câu hỏi tuần tự
                    tiếp theo.
                    {/* Click on Mark for Review to save answer to
                                current question, mark it for review, and to go
                                to the next question in sequence. */}
                  </li>
                </ol>
              </li>
              {/* <li>
                            You can view the entire paper by clicking on the
                            <b>Question Paper </b>button.
                          </li> */}
            </ol>
            {/* <p>
                          <strong>
                            <u>Trả lời câu hỏi :</u>
                          </strong>
                        </p>
                        <ol start="5">
                          <li>
                            For multiple choice type question :
                            <ol type="a">
                              <li>
                                To select your answer, click on one of the
                                option buttons
                              </li>
                              <li>
                                To change your answer, click the another desired
                                option button
                              </li>
                              <li>
                                To save your answer, you MUST click on
                                <b> Save &amp; Next</b>
                              </li>
                              <li>
                                To deselect a chosen answer, click on the chosen
                                option again or click on the
                                <b> Clear Response</b> button.
                              </li>
                              <li>
                                To mark a question for review click on
                                <b> Mark for Review </b>.
                                <font color="red">
                                  <i>
                                    If an answer is selected for a question that
                                    is Marked for Review, the answer will be
                                    considered in the final evaluation.
                                  </i>
                                </font>
                              </li>
                            </ol>
                          </li>
                          <li>
                            To change an answer to a question, first select the
                            question and then click on the new answer option
                            followed by a click on the
                            <b>Save &amp; Next</b>
                            button.
                          </li>
                          <li>
                            Questions that are saved or marked for review after
                            answering will ONLY be considered for evaluation.
                          </li>
                        </ol> */}
            <p>
              <strong>
                <u>Di chuyển giữa Phần thi :</u>
              </strong>
            </p>
            <ol start='8'>
              <li>
                {/* Sections in this question paper are displayed on the
                            top bar of the screen. Questions in a section can be
                            viewed by clicking on the section name. The section
                            you are currently viewing is highlighted. */}
                Các phần thi của bài thi được hiển thị ở trên cùng của màn hình. Phần thi hiện tại sẽ được hiển thị nổi
                bật.
              </li>
              <li>
                Sau khi bạn chọn "Lưu và Tiếp tục" câu hỏi cuối cùng của một phần, bạn sẽ được tự động chuyenr sang câu
                hỏi đầu tiên của phần tiếp theo.
                {/* After clicking the<b> Save &amp; Next</b> button on
                            the last question for a section, you will
                            automatically be taken to the first question of the
                            next section. */}
              </li>
              {/* <li>
                            You can move the mouse cursor over the section names
                            to view the status of the questions for that
                            section.
                          </li> */}
              <li>
                Bạn có thể di chuyển giữa các Phần thi và câu hỏi tùy ý.
                {/* You can shuffle between sections and questions
                            anytime during the examination as per your
                            convenience. */}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  )
}

export default Help
