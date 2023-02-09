import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Select,
  Collapse,
  Modal,
  Radio,
  Input,
  Button,
  message,
  Drawer,
} from "antd";
import QuestionApi from "api/question-api";

const { Option } = Select;
const { confirm } = Modal;
const { Panel } = Collapse;

const FillTheBlankEditor = (props) => {
  const [question, setQuestion] = useState(null);
  const [setting, setSetting] = useState({
    renderAs: 1,
    caseInsensitiveMask: 0,
  });

  const onChangeRadioControl = (e, name) => {
    var newValue = parseInt(e.target.value, 10);
    let newSetting = { ...setting };
    newSetting[name] = newValue;
    setSetting(newSetting);
  };

  const saveSetting = () => {
    let question = props.question;
    question.settingJSON = JSON.stringify(setting);
    new QuestionApi().saveSetting(question).then((response) => {
      setQuestion(response.data);
    });
  };

  useEffect(() => {
    new QuestionApi()
      .parseFillTheBlankQuestion(props.question)
      .then((response) => {
        setQuestion(response.data);
      });
  }, []);

  return (
    <Drawer
      title={"Soạn thảo câu hỏi điền vào chỗ trống"}
      width={820}
      onClose={props.onClose}
      closable={true}
      visible={true}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            onClick={saveSetting}
            type="primary"
            color="primary"
            style={{ marginRight: 8 }}
          >
            Cập nhật
          </Button>
          &nbsp;
          <Button onClick={props.onClose} style={{ marginRight: 8 }}>
            Đóng
          </Button>
        </div>
      }
    >
      {question && (
        <Form layout="vertical">
          <Row gutter={0}>
            <Col span={24} style={{ padding: 5 }}>
              <Collapse defaultActiveKey={["1"]}>
                <Panel header="Nội dung câu hỏi" key="1">
                  {question.previewContent}
                </Panel>
              </Collapse>
            </Col>
          </Row>
          <Row gutter={0}>
            <Col span={12} style={{ padding: 5 }}>
              <Form.Item label="Cấu hình hiển thị câu hỏi">
                <Radio.Group
                  value={setting.renderAs}
                  defaultValue={setting.renderAs}
                  onChange={(e) => onChangeRadioControl(e, "renderAs")}
                >
                  <Radio.Button value={1}>Textbox</Radio.Button>
                  <Radio.Button value={2}>Dropdonwlist</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={0}>
            <Col span={24} style={{ padding: 5 }}>
              <Form.Item label="Cấu hình chấm điểm">
                <Radio.Group
                  value={setting.caseInsensitiveMask}
                  defaultValue={setting.caseInsensitiveMask}
                  onChange={(e) =>
                    onChangeRadioControl(e, "caseInsensitiveMask")
                  }
                >
                  <Radio.Button value={0}>Đúng chính xác</Radio.Button>
                  <Radio.Button value={1}>
                    Không phân biệt chữ in, thường
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={0}>
            <Col span={24} style={{ padding: 5 }}>
              <div className="table-responsive">
                <div className="ant-table">
                  <div className="ant-table-container">
                    <div className="ant-table-content">
                      <table>
                        <thead className="ant-table-thead">
                          <tr>
                            <th
                              className="ant-table-cell"
                              style={{ width: 120 }}
                            >
                              Câu hỏi
                            </th>
                            <th className="ant-table-cell">Đáp án đúng</th>
                            <th
                              className="ant-table-cell"
                              style={{ width: 250 }}
                            >
                              Đáp án sai
                            </th>
                          </tr>
                        </thead>
                        <tbody className="ant-table-tbody">
                          {question.children
                            .filter((x) => x.questionTypeId != 7)
                            .map((question, index) => {
                              return (
                                <tr
                                  className="ant-table-row"
                                  key={`tr-ans-question-${question.id}`}
                                >
                                  <td className="ant-table-cell ">
                                    Câu {index + 1}
                                  </td>
                                  {setting.renderAs == 1 && (
                                    <td className="ant-table-cell ">
                                      <Input value={question.content} />
                                    </td>
                                  )}
                                  {setting.renderAs == 2 && (
                                    <td className="ant-table-cell ">
                                      <Select className="w-100">
                                        {question.answers.map((item) => (
                                          <Option
                                            value={item.id}
                                            key={`answer-${item.id}`}
                                          >
                                            {item.content}
                                          </Option>
                                        ))}
                                      </Select>
                                    </td>
                                  )}
                                  <td className="ant-table-cell ">
                                    {question.answers
                                      .filter((x) => x.isCorrect == false)
                                      .map((item) => (
                                        <span>{item.content};&nbsp;</span>
                                      ))}
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
      )}
    </Drawer>
  );
};

export default FillTheBlankEditor;
