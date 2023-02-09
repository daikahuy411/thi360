import React, { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  TreeSelect,
  Upload,
  message,
  Button,
  Select,
  Checkbox,
  DatePicker,
} from "antd";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import { LoadingOutlined } from "@ant-design/icons";
import ExamApi from "api/exam-api";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import { ExamCategoryApi } from "api/catalog-api";

const { Dragger } = Upload;
const { Option } = Select;

const rules = {
  content: [
    {
      required: true,
      message: "Nhập vào nội dung câu hỏi",
    },
  ],
};

const GeneralField = (props) => {
  const [item, setItem] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [categories, setCategories] = useState(null);

  let history = useHistory();

  useEffect(() => {
    setItem(props.item);
    getQuestionCategories();
  }, [props.item]);

  const dateFormat = "DD-MM-YYYY HH:mm";

  const handleDateChange = (fieldName, value) => {
    const currentItem = Object.assign({}, item);
    currentItem[fieldName] = value;
    setItem({ ...currentItem });
    if (props.handleChange) {
      props.handleChange(currentItem);
    }
  };

  const handleChange = (event) => {
    event.persist();
    const currentItem = Object.assign({}, item);
    const targetValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    currentItem[event.target.name] = targetValue;
    setItem({ ...currentItem });
    if (props.handleChange) {
      props.handleChange(currentItem);
    }
  };

  const handleSelectChange = (field, value) => {
    const currentItem = Object.assign({}, item);
    currentItem[field] = value;
    setItem({ ...currentItem });
    if (props.handleChange) {
      props.handleChange(currentItem);
    }
  };

  const onFinish = () => {
    setSubmitLoading(true);
    new ExamApi().save(item).then((response) => {
      setSubmitLoading(false);
      if (item.id === 0) {
        message.success(`Tạo kỳ thi thành công.`);
        history.push(`/lms/exams/edit/${response.data.id}/overview`);
      }
      if (item.id > 0) {
        message.success(`Cập nhật kỳ thi thành công.`);
      }
    });
  };

  const getQuestionCategories = () => {
    ExamCategoryApi.getAll().then((response) => {
      setCategories(response.data);
    });
  };

  const changeCategoryId = (value) => {
    const currentItem = Object.assign({}, item);
    currentItem.categoryId = parseInt(value);
    setItem({ ...currentItem });
    if (props.handleChange) {
      props.handleChange({ ...currentItem });
    }
  };

  return (
    item && (
      <>
        <Form layout="vertical" hideRequiredMark>
          <Row>
            <Col span={24}>
              <Flex justifyContent="between">
                <div className="mb-3">&nbsp;</div>
                <div className="mb-3">
                  <Button
                    type="primary"
                    onClick={() => onFinish()}
                    loading={submitLoading}
                  >
                    Cập nhật
                  </Button>
                </div>
              </Flex>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={17}>
              <Card>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item label="Tên" rules={rules.content}>
                      <Input
                        name="name"
                        value={item.name}
                        defaultValue={item.name}
                        onChange={(event) => handleChange(event)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item label="Mô tả" rules={rules.content}>
                      <Input.TextArea
                        name="content"
                        value={item.content}
                        defaultValue={item.content}
                        onChange={(event) => handleChange(event)}
                        rows={4}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Trạng thái">
                      <Select
                        placeholder="Chọn Trạng thái Kỳ thi"
                        defaultValue={item.status}
                        value={item.status}
                        name="status"
                        onChange={(value) =>
                          handleSelectChange("status", value)
                        }
                      >
                        <Option value={0}>Chọn</Option>
                        <Option value={1}>Chuẩn bị</Option>
                        <Option value={2}>Đang diễn ra</Option>
                        <Option value={3}>Kết thúc</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Hình thức tổ chức">
                      <Select
                        placeholder="Chọn Hình thức tổ chức Kỳ thi"
                        defaultValue={item.examType}
                        value={item.examType}
                        name="type"
                        onChange={(value) =>
                          handleSelectChange("examType", value)
                        }
                      >
                        <Option value={0}>Chọn</Option>
                        <Option value={1}>Luyện tập</Option>
                        <Option value={2}>Thi-Kiểm tra</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Hình thức đăng ký">
                      <Select
                        placeholder="Chọn Hình thức đăng ký Kỳ thi"
                        defaultValue={item.registrationType}
                        value={item.registrationType}
                        name="registrationType"
                        onChange={(value) =>
                          handleSelectChange("registrationType", value)
                        }
                      >
                        <Option value={0}>Chọn</Option>
                        <Option value={1}>Hạn chế</Option>
                        <Option value={2}>Công khai</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Hiển thị Kết quả sau khi thi">
                      <Select
                        placeholder="Cấu hình hiển thị Kết quả sau khi thi"
                        defaultValue={item.viewPermissionAfterFinish}
                        value={item.viewPermissionAfterFinish}
                        name="viewPermissionAfterFinish"
                        onChange={(value) =>
                          handleSelectChange("viewPermissionAfterFinish", value)
                        }
                      >
                        <Option value={0}>Chọn</Option>
                        <Option value={1}>Chỉ xem điểm</Option>
                        <Option value={2}>Xem điểm và chi tiết bài làm</Option>
                        <Option value={4}>
                          Không xem điểm và chi tiết bài làm
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item>
                      <Checkbox
                        checked={item.isSpecificDuration}
                        name="isSpecificDuration"
                        onChange={(event) => handleChange(event)}
                      >
                        Xác định thời gian bắt đầu/ kết thúc
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
                {item.isSpecificDuration && (
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Thời gian bắt đầu">
                        <DatePicker
                          showTime
                          className="w-100"
                          placeholder="Chọn thời gian bắt đầu"
                          // defaultValue={item.startDate}
                          onChange={(value, format) => {
                            handleDateChange("startDate", value);
                          }}
                          name="startDate"
                          format={dateFormat}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Thời gian kết thúc">
                        <DatePicker
                          showTime
                          className="w-100"
                          placeholder="Chọn thời gian kết thúc"
                          // defaultValue={item.endDate}
                          onChange={(value, format) => {
                            handleDateChange("endDate", value);
                          }}
                          name="endDate"
                          format={dateFormat}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              </Card>
            </Col>
            <Col xs={24} sm={24} md={7}>
              <Card title="Ảnh đại diện">
                <Dragger onChange={(e) => props.handleUploadChange(e)}>
                  <div>
                    {props.uploadLoading ? (
                      <div>
                        <LoadingOutlined className="font-size-xxl text-primary" />
                        <div className="mt-3">Uploading</div>
                      </div>
                    ) : (
                      <div>
                        <CustomIcon className="display-3" svg={ImageSvg} />
                        <p>Click or drag file to upload</p>
                      </div>
                    )}
                  </div>
                </Dragger>
              </Card>
              <Card title="Phân loại">
                <Form.Item name="category" label="Danh mục Kỳ thi">
                  {categories && (
                    <TreeSelect
                      style={{ width: "100%" }}
                      treeData={categories}
                      className="w-100"
                      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                      placeholder="Chọn Danh mục Kỳ thi"
                      allowClear
                      defaultValue={[props.item.categoryName]}
                      treeDefaultExpandAll
                      onChange={(value) => changeCategoryId(value)}
                    ></TreeSelect>
                  )}
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>
      </>
    )
  );
};

export default GeneralField;
