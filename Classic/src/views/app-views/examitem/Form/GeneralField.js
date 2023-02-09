import React, { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  message,
  Select,
  Button,
  Tooltip,
} from "antd";
import ExamItemApi from "api/exam-item-api";
import { useHistory, Link } from "react-router-dom";
import Flex from "components/shared-components/Flex";
import * as yup from "yup";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

let schema = yup.object().shape({
  name: yup.string().required("Tên đầy đủ không được để trống."),
  duration: yup
    .number()
    .moreThan(0, "Thời gian làm bài lớn hơn 0 phút.")
    .max(360, "Thời gian làm bài tối đa 360 phút."),
});

const yupSync = {
  async validator({ field }, value) {
    await schema.validateSyncAt(field, { [field]: value });
  },
};

const GeneralField = (props) => {
  const [item, setItem] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form] = Form.useForm();
  const [isValidForm, setIsValidForm] = useState(true);

  let history = useHistory();

  const validateForm = () => {
    form
      .validateFields(["name"])
      .then((values) => {
        setIsValidForm(true);
      })
      .catch((errorInfo) => {
        setIsValidForm(false);
      });
  };

  useEffect(() => {
    setItem(props.item);
  }, [props.item]);

  const onFinish = () => {
    setSubmitLoading(true);
    item.exam = null;
    new ExamItemApi().save(item).then((response) => {
      setSubmitLoading(false);
      if (item.id === 0) {
        message.success(`Tạo Môn thi thành công.`);
        history.push(`/lms/examitems/edit/${response.data.id}`);
      }
      if (item.id > 0) {
        message.success(`Cập nhật Môn thi thành công.`);
      }
    });
  };

  const handleChange = (event) => {
    validateForm();
    event.persist();
    const currentItem = Object.assign({}, item);
    const targetValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    currentItem[event.target.name] = targetValue;
    setItem({ ...currentItem });
    if (props.handleChange) {
      props.handleChange({ ...currentItem });
    }
  };

  return (
    <>
      {item && (
        <>
          <Form
            form={form}
            layout="vertical"
            method="post"
            hideRequiredMark
            autoComplete="off"
            initialValues={item}
          >
            <Row>
              <Col span={24}>
                <Flex
                  className="py-2"
                  mobileFlex={false}
                  justifyContent="between"
                  alignItems="center"
                >
                  <div className="mb-3">&nbsp;</div>
                  <div className="mb-3">
                    <Button
                      type="primary"
                      onClick={() => onFinish()}
                      disabled={!isValidForm}
                      loading={submitLoading}
                    >
                      {item.id === 0 ? "Thêm mới" : `Cập nhật`}
                    </Button>
                  </div>
                </Flex>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={17}>
                <Card>
                  <Form.Item name="name" label="Tên môn thi" rules={[yupSync]}>
                    <Input
                      name="name"
                      value={item.name}
                      defaultValue={item.name}
                      onChange={(event) => handleChange(event)}
                    />
                  </Form.Item>
                  <Form.Item label="Mô tả">
                    <Input.TextArea
                      name="content"
                      value={item.content}
                      defaultValue={item.content}
                      onChange={(event) => handleChange(event)}
                      rows={4}
                    />
                  </Form.Item>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={7}>
                <Card title="Cấu hình">
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={24}>
                      <Form.Item label="Số lần thi cho phép">
                        <Input
                          name="numberOfExamAttemptAllow"
                          value={item.numberOfExamAttemptAllow}
                          defaultValue={item.numberOfExamAttemptAllow}
                          onChange={(event) => handleChange(event)}
                          suffix={
                            <Tooltip title="Mật khẩu có tối đa 6 ký tự, bao gồm ít nhất 1 ký tự đặc biệt.">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                      <Form.Item
                        name="duration"
                        label="Thời gian làm bài (phút)"
                        rules={[yupSync]}
                      >
                        <Input
                          name="duration"
                          value={item.duration}
                          defaultValue={item.duration}
                          suffix={
                            <Tooltip title="Thời gian bàm bài thi lớn hơn 0 và bé hơn hoặc bằng 360 phút.">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          onChange={(event) => handleChange(event)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={12} sm={12} md={12}>
                      <Form.Item label="Điểm yêu cầu đạt" name="requiredScore">
                        <Input
                          name="requiredScore"
                          value={item.requiredScore}
                          defaultValue={item.requiredScore}
                          onChange={(event) => handleChange(event)}
                          suffix={
                            <Tooltip title="Bài làm lớn hơn hoặc bằng điểm yêu cầu sẽ được tính là Đạt.">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                      <Form.Item label="Điểm tổng" name="maxScore">
                        <Input
                          name="maxScore"
                          value={item.maxScore}
                          defaultValue={item.maxScore}
                          onChange={(event) => handleChange(event)}
                          suffix={
                            <Tooltip title="Điểm tổng sẽ được chia cho từng câu hỏi theo hệ số điểm của phần trong Cấu trúc đề thi.">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </>
  );
};

export default GeneralField;
