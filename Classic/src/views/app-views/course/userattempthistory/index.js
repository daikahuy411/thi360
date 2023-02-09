import React, { useState, useEffect } from "react";
import { Form, Row, Col, Select, Button, Drawer, Checkbox, Input } from "antd";
import ExamUserApi from "api/exam-user-api";
import UserApi from "api/user-api";
import moment from "moment";
import { Descriptions, Badge, Card } from "antd";

const UserAttemptHistoryDialog = (props) => {
  const [data, setData] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const fetchData = () => {
    new ExamUserApi()
      .getExamAttemptsHistory(props.examId, props.userId)
      .then((response) => {
        setData(response.data);
      });

    new UserApi().getUserProfile(props.userId).then((response) => {
      setUserProfile(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, [props.examId, props.userId]);

  return (
    <Drawer
      title={"Lịch sử thi"}
      width={720}
      onClose={props.onClose}
      visible={true}
      bodyStyle={{ padding: 0 }}
    >
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={0}>
          <Col span={24} style={{ paddingTop: 5 }}>
            {userProfile && (
              <Descriptions bordered>
                <Descriptions.Item
                  labelStyle={{ width: 160 }}
                  label="Họ và tên"
                >
                  {userProfile.name}
                </Descriptions.Item>
                <Descriptions.Item
                  labelStyle={{ width: 160 }}
                  label="Tên đăng nhập"
                >
                  {userProfile.userName}
                </Descriptions.Item>
              </Descriptions>
            )}
          </Col>
        </Row>
        <Row gutter={0}>
          <Col span={24}>
            <div className="table-responsive">
              <div className="ant-table">
                <div className="ant-table-container">
                  <div className="ant-table-content">
                    <table>
                      <thead className="ant-table-thead">
                        <tr>
                          <th className="ant-table-cell" style={{ width: 25 }}>
                            #
                          </th>
                          <th className="ant-table-cell">Tên đề thi</th>
                          <th className="ant-table-cell">Thời gian</th>
                          <th className="ant-table-cell">Số câu đúng</th>
                          <th className="ant-table-cell">Số câu sai</th>
                          <th className="ant-table-cell">
                            Số câu chưa trả lời
                          </th>
                          <th className="ant-table-cell">Điểm</th>
                          <th className="ant-table-cell">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody className="ant-table-tbody">
                        {data &&
                          data.map((item, index) => {
                            return (
                              <tr
                                className="ant-table-row"
                                key={`tr-ans-content-${item.id}`}
                              >
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                  {item.timeTaken}
                                  <br />
                                  {moment(item.startDate).format(
                                    "YYYY-MM-DD HH:mm"
                                  )}
                                  <br />
                                </td>
                                <td className="ant-table-cell ">
                                  {item.totalCorrectQuestion}
                                </td>
                                <td className="ant-table-cell ">
                                  {item.totalIncorrectQuestion}
                                </td>
                                <td className="ant-table-cell ">
                                  {item.totalNoAnswerQuestion}
                                </td>
                                <td className="ant-table-cell ">
                                  {" "}
                                  {item.score}
                                </td>
                                <td className="ant-table-cell ">
                                  {item.isPassed && (
                                    <span className="badge badge-dot badge-success">
                                      Đạt
                                    </span>
                                  )}
                                  {item.isPassed === false && (
                                    <span className="badge badge-dot badge-error">
                                      Không đạt
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default UserAttemptHistoryDialog;
