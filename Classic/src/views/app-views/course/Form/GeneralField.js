import React, { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  TreeSelect,
  message,
  Button,
  Radio,
  Select,
  Checkbox,
  DatePicker,
} from "antd";
import CourseApi from "api/course-api";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import { CourseCategoryApi } from "api/catalog-api";
import FileDialog from "views/app-views/shared/fileDialog";
import moment from "moment";
import CkEditor from "views/app-views/shared/ckeditor";

const { Option } = Select;

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

  const selectAvatar = () => {
    window.CKFinder.modal({
      chooseFiles: true,
      width: 800,
      height: 600,
      onInit: function (finder) {
        finder.on("files:choose", function (evt) {
          const currentItem = Object.assign({}, item);
          var file = evt.data.files.first();
          currentItem["avatarModel"] = {
            name: file.attributes.name,
            extension: file._extenstion,
            size: file.attributes.size,
            url: file.attributes.url,
          };
          currentItem["avatarUrl"] = JSON.stringify(
            currentItem["avatarModel"]
          );
          setItem({ ...currentItem });
        });
      },
    });
  };

  const handleDateChange = (fieldName, value) => {
    const currentItem = Object.assign({}, item);
    currentItem[fieldName] = value;
    setItem({ ...currentItem });
  };

  const handleChange = (event) => {
    const currentItem = Object.assign({}, item);
    const targetValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    currentItem[event.target.name] = targetValue;
    setItem({ ...currentItem });
  };

  const handleSelectChange = (field, value) => {
    const currentItem = Object.assign({}, item);
    currentItem[field] = parseInt(value);
    setItem({ ...currentItem });
  };

  const onFinish = () => {
    setSubmitLoading(true);
    new CourseApi().save(item).then((response) => {
      setSubmitLoading(false);
      if (item.id === 0) {
        message.success(`Tạo Khóa học thành công.`);
        history.push(
          `/lms/modules/mystudies/courses/edit/${response.data.id}/overview`
        );
      }
      if (item.id > 0) {
        message.success(`Cập nhật Khóa học thành công.`);
      }
    });
  };

  const getQuestionCategories = () => {
    CourseCategoryApi.getAll().then((response) => {
      setCategories(response.data);
    });
  };

  const changeCategoryId = (value) => {
    const currentItem = Object.assign({}, item);
    currentItem.categoryId = parseInt(value);
    setItem({ ...currentItem });
  };

  const changeRegistrationType = (type) => {
    const currentItem = Object.assign({}, item);
    currentItem.registrationType = parseInt(type);
    setItem({ ...currentItem });
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
                    <Form.Item label="Tên">
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
                    <Form.Item label="Mô tả">
                      <CkEditor
                        data={item.note}
                        onChange={(data) => {
                          const currentItem = Object.assign({}, item);
                          currentItem.note = data;
                          setItem({ ...currentItem });
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item label="Hình thức tham gia">
                      <Radio.Group
                        buttonStyle="solid"
                        value={item.registrationType}
                        onChange={(e) => changeRegistrationType(e.target.value)}
                      >
                        <Radio.Button value={1}>Công khai</Radio.Button>
                        <Radio.Button value={0}>Hạn chế</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item label="Trạng thái">
                      <Select
                        placeholder="Chọn Trạng thái"
                        defaultValue={item.status}
                        value={item.status}
                        name="status"
                        onChange={(value) =>
                          handleSelectChange("status", value)
                        }
                      >
                        <Option value={0}>Đang soạn thảo</Option>
                        <Option value={1}>Đang diễn ra</Option>
                        <Option value={2}>Kết thúc</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item label="Thời lượng (phút)">
                      <Input
                        name="duration"
                        type="number"
                        value={item.duration}
                        defaultValue={item.duration}
                        onChange={(event) => handleChange(event)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item>
                      <Checkbox
                        checked={item.showOnHomePage}
                        name="showOnHomePage"
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
                        {!item.startDate && (
                          <DatePicker
                            className="w-100"
                            showTime={false}
                            onChange={(value, format) => {
                              handleDateChange("startDate", value);
                            }}
                            name="startDate"
                            placeholder="Chọn thời gian bắt đầu"
                            format={dateFormat}
                          />
                        )}
                        {item.startDate && (
                          <DatePicker
                            className="w-100"
                            showTime={false}
                            placeholder="Chọn thời gian bắt đầu"
                            onChange={(value, format) => {
                              handleDateChange("startDate", value);
                            }}
                            name="startDate"
                            value={moment(item.startDate)}
                            format={dateFormat}
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Thời gian kết thúc">
                        {!item.endDate && (
                          <DatePicker
                            className="w-100"
                            showTime={false}
                            onChange={(value, format) => {
                              handleDateChange("endDate", value);
                            }}
                            name="endDate"
                            placeholder="Chọn thời gian kết thúc"
                            format={dateFormat}
                          />
                        )}
                        {item.endDate && (
                          <DatePicker
                            className="w-100"
                            showTime={false}
                            placeholder="Chọn thời gian kết thúc"
                            onChange={(value, format) => {
                              handleDateChange("endDate", value);
                            }}
                            name="endDate"
                            value={moment(item.endDate)}
                            format={dateFormat}
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              </Card>
            </Col>
            <Col xs={24} sm={24} md={7}>
              <Card title="Ảnh đại diện">
                <FileDialog
                  onClick={() => selectAvatar()}
                  fileUrlObject={item.avatarModel}
                />
              </Card>
              <Card title="Phân loại">
                <Form.Item label="Danh mục">
                  {categories && (
                    <TreeSelect
                      style={{ width: "100%" }}
                      treeData={categories}
                      className="w-100"
                      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                      placeholder="Chọn Danh mục"
                      allowClear
                      value={
                        item.categoryId > 0 ? item.categoryId.toString() : ""
                      }
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
