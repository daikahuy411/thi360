import React, { useEffect, useState } from "react";
import { Table, Radio, Divider, Input, Form, Checkbox, Button } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { QuestionType } from "types/QuestionType";

const rules = {
  content: [
    {
      required: true,
      message: "Nhập vào nội dung câu hỏi",
    },
  ],
  price: [
    {
      required: true,
      message: "Please enter product price",
    },
  ],
  comparePrice: [],
  taxRate: [
    {
      required: true,
      message: "Please enter tax rate",
    },
  ],
  cost: [
    {
      required: true,
      message: "Please enter item cost",
    },
  ],
};

const Answers = (props) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    setItem(props.item);
  }, [props.item]);

  const removeAnswer = (id) => {
    let answers = [...item.answers];
    answers = answers.filter((x) => x.id !== id);
    item.answers = answers;
    // setItem(item);
    if (props.handleChange) {
      props.handleChange({ ...item });
    }
  };

  return (
    <div className="ant-table">
      <div className="ant-table-container">
        <div className="ant-table-content">
          <table>
            <thead className="ant-table-thead">
              <tr>
                <th className="ant-table-cell" style={{ width: 25 }}>
                  #
                </th>
                <th className="ant-table-cell" style={{ width: 120 }}>
                  Đáp án đúng
                </th>
                <th className="ant-table-cell"> Nội dung</th>
                <th className="ant-table-cell" style={{ width: 60 }}></th>
              </tr>
            </thead>
            <tbody className="ant-table-tbody">
              {item &&
                item.answers.map((anwser, index) => {
                  return (
                    <tr
                      className="ant-table-row"
                      key={`tr-ans-answer-${anwser.id}`}
                    >
                      <td className="ant-table-cell ">{index + 1}</td>
                      <td className="ant-table-cell ">
                        {(item.questionTypeId === QuestionType.SC ||
                          item.questionTypeId === QuestionType.TF) && (
                          <Radio
                            checked={anwser.isCorrect}
                            value={anwser.isCorrect}
                            name={`rdb-ans-content-${anwser.id}`}
                            onChange={(event) => {
                              item.answers.map((x) => {
                                x.isCorrect = false;
                              });
                              anwser.isCorrect = event.target.checked;
                              item.answers[index] = anwser;
                              setItem({ ...item });
                              if (props.handleChange) {
                                props.handleChange({ ...item });
                              }
                            }}
                          />
                        )}
                        {props.item?.questionTypeId === QuestionType.MC && (
                          <Checkbox
                            checked={anwser.isCorrect}
                            value={anwser.isCorrect}
                            name={`chk-ans-content-${anwser.id}`}
                            onChange={(event) => {
                              anwser.isCorrect = event.target.checked;
                              item.answers[index] = anwser;
                              setItem({ ...item });
                              if (props.handleChange) {
                                props.handleChange({ ...item });
                              }
                            }}
                          />
                        )}
                      </td>
                      <td className="ant-table-cell ">
                        <Form.Item
                          label=""
                          rules={rules.name}
                          id={`fi-ans-content-${anwser.id}`}
                          name={`txt-ans-content-${anwser.id}`}
                          key={`fi-ans-content-${anwser.id}`}
                        >
                          <Input.TextArea
                            value={anwser.content}
                            defaultValue={anwser.content}
                            key={`txt-ans-content-${anwser.id}`}
                            id={`txt-ans-content-${anwser.id}`}
                            name={`txt-ans-content-${anwser.id}`}
                            onChange={(event) => {
                              anwser.content = event.target.value;
                              setItem(item);
                              if (props.handleChange) {
                                props.handleChange(item);
                              }
                            }}
                            rows={3}
                          />
                        </Form.Item>
                      </td>
                      <td className="ant-table-cell ">
                        {item.questionTypeId !== QuestionType.TF && (
                          <MinusCircleOutlined
                            onClick={() => removeAnswer(anwser.id)}
                          />
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
  );
};

export default Answers;
