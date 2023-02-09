import { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  message,
  Button,
  DatePicker,
  Select,
} from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import FileDialog from "views/app-views/shared/fileDialog";
import ProjectApi from "api/project-api";
import CatalogSelector from "views/app-views/shared/catalogSelector";
import { CatalogType } from "types/CatalogType";
import moment from "moment";
import FileList from "views/app-views/shared/files";

const dateFormat = "DD-MM-YYYY";
const { Option } = Select;

const GeneralField = (props) => {
  const [item, setItem] = useState(props.item);
  // if (item.documentStatus == null) {
  //   item.documentStatus = 0;
  // }

  const [submitLoading, setSubmitLoading] = useState(false);

  let history = useHistory();

  const handleChange = (event) => {
    const currentItem = Object.assign({}, item);
    const targetValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    currentItem[event.target.name] = targetValue;
    setItem({ ...currentItem });
  };

  const handleDateChange = (fieldName, value) => {
    const currentItem = Object.assign({}, item);
    currentItem[fieldName] = value;
    setItem({ ...currentItem });
  };

  const handleCatalogChange = (fieldName, value) => {
    const currentItem = Object.assign({}, item);
    currentItem[fieldName] = value;
    setItem({ ...currentItem });
  };

  const onFinish = () => {
    setSubmitLoading(true);
    new ProjectApi().save(item).then((response) => {
      setSubmitLoading(false);
      if (item.id === 0) {
        message.success(`Tạo mới thành công.`);
        history.push(`/lms/modules/myoffice/task/projects/edit/${response.data.id}`);
      }
      if (item.id > 0) {
        message.success(`Cập nhật thành công.`);
      }
    });
  };

  const handleSelectChange = (field, value) => {
    const currentItem = Object.assign({}, item);
    currentItem[field] = value;
    setItem({ ...currentItem });
    if (props.handleChange) {
      props.handleChange(currentItem);
    }
  };

  const removeFile = (file) => {
    item.fileModels = item.fileModels.filter((x) => x.url != file.url);
    item["files"] = JSON.stringify(item.fileModels);
    setItem({ ...item });
  };

  const selectFiles = () => {
    window.CKFinder.modal({
      chooseFiles: true,
      width: 800,
      height: 600,
      onInit: function (finder) {
        finder.on("files:choose", function (evt) {
          const currentItem = Object.assign({}, item);

          evt.data.files.map((file) => {
            const fileModel = {
              name: file.attributes.name,
              extension: file._extenstion,
              size: file.attributes.size,
              url: file.attributes.url,
            };
            currentItem.fileModels.push(fileModel);
          });

          currentItem["files"] = JSON.stringify(currentItem.fileModels);
          setItem({ ...currentItem });
        });
      },
    });
  };  

  useEffect(() => {
    setItem(props.item);
  }, [props.item]);

  return (
    item && (
      <>
        <Row gutter={16}>
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
          <Col xs={24} sm={24} md={24}>
            <Card title="Thông tin">              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Tên dự án">
                    <Input
                      name="name"
                      value={item.name}
                      onChange={handleChange}
                      defaultValue={props.item?.name}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
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
                      <Option value={0}>Chọn trạng thái</Option>
                      <Option value={1}>Đang diễn ra</Option>
                      <Option value={2}>Kết thúc</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Mô tả">
                    <Input.TextArea
                      name="description"
                      value={item.description}
                      rows={4}
                      placeholder="Nhập mô tả dự án"
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Ngày bắt đầu">
                    {!item.startDate && (
                      <DatePicker
                        className="w-100"
                        placeholder="Chọn ngày"
                        showTime={false}
                        onChange={(value, format) => {
                          handleDateChange("startDate", value);
                        }}
                        name="startDate"
                        format={dateFormat}
                      />
                    )}
                    {item.startDate && (
                      <DatePicker
                        className="w-100"
                        placeholder="Chọn ngày"
                        showTime={false}
                        onChange={(value, format) => {
                          handleDateChange("startDate", value);
                        }}
                        name="startDate"
                        format={dateFormat}
                        value={moment(item.startDate)}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Ngày kết thúc">
                    {!item.endDate && (
                      <DatePicker
                        className="w-100"
                        placeholder="Chọn ngày"
                        showTime={false}
                        onChange={(value, format) => {
                          handleDateChange("endDate", value);
                        }}
                        name="endDate"
                        format={dateFormat}
                      />
                    )}
                    {item.endDate && (
                      <DatePicker
                        className="w-100"
                        placeholder="Chọn ngày"
                        showTime={false}
                        onChange={(value, format) => {
                          handleDateChange("endDate", value);
                        }}
                        name="endDate"
                        format={dateFormat}
                        value={moment(item.endDate)}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="File đính kèm">
                <Button
                  onClick={() => selectFiles()}
                  icon={<CloudUploadOutlined />}
                >
                  Chọn file
                </Button>
                {item.fileModels && (
                  <FileList
                    removeFile={removeFile}
                    viewOnly={false}
                    files={item.fileModels}
                  />
                )}
              </Form.Item>
            </Card>
          </Col>          
        </Row>
      </>
    )
  );
};

export default GeneralField;
