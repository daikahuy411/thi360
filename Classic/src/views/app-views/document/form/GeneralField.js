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
import DocumentApi from "api/document-api";
import CatalogSelector from "views/app-views/shared/catalogSelector";
import { CatalogType } from "types/CatalogType";
import moment from "moment";
import FileList from "views/app-views/shared/files";

const dateFormat = "DD-MM-YYYY";
const { Option } = Select;

const GeneralField = (props) => {
  const [item, setItem] = useState(props.item);
  if (item.documentStatus == null) {
    item.documentStatus = 0;
  }

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

  const hangeCatalogChange = (fieldName, value) => {
    const currentItem = Object.assign({}, item);
    currentItem[fieldName] = value;
    setItem({ ...currentItem });
  };

  const onFinish = () => {
    setSubmitLoading(true);
    new DocumentApi().save(item).then((response) => {
      setSubmitLoading(false);
      if (item.id === 0) {
        message.success(`Tạo mới thành công.`);
        history.push(`/lms/modules/myoffice/document/edit/${response.data.id}`);
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
                  <Form.Item label="Số hiệu văn bản">
                    <Input
                      name="documentCode"
                      value={item.documentCode}
                      onChange={handleChange}
                      defaultValue={props.item?.documentCode}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Loại văn bản">
                    <Select
                      placeholder="Chọn loại văn bản"
                      value={item.documentType}
                      name="type"
                      onChange={(value) => handleSelectChange("documentType", value)}
                    >
                      <Option value={0}>Văn bản Nội bộ</Option>
                      <Option value={1}>Văn bản đến</Option>
                      <Option value={2}>Văn bản đi</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Trích yếu">
                    <Input.TextArea
                      name="summary"
                      value={item.summary}
                      rows={4}
                      placeholder="Nhập trích yếu"
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Chủ đề">
                    <CatalogSelector
                      value={item.topicId}
                      onChange={(value) => hangeCatalogChange("topicId", value)}
                      type={CatalogType.DOCUMENT_TOPIC}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Lĩnh vực">
                    <CatalogSelector
                      value={item.areaId}
                      onChange={(value) => hangeCatalogChange("areaId", value)}
                      type={CatalogType.DOCUMENT_AREA}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Cơ quan ban hành">
                    <CatalogSelector
                      value={item.organizationId}
                      onChange={(value) =>
                        hangeCatalogChange("organizationId", value)
                      }
                      type={CatalogType.DOCUMENT_ORGANIZATION}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Ngày ban hành">
                    {!item.issuedDate && (
                      <DatePicker
                        className="w-100"
                        placeholder="Chọn ngày"
                        showTime={false}
                        onChange={(value, format) => {
                          handleDateChange("issuedDate", value);
                        }}
                        name="issuedDate"
                        format={dateFormat}
                      />
                    )}
                    {item.issuedDate && (
                      <DatePicker
                        className="w-100"
                        placeholder="Chọn ngày"
                        showTime={false}
                        onChange={(value, format) => {
                          handleDateChange("issuedDate", value);
                        }}
                        name="issuedDate"
                        format={dateFormat}
                        value={moment(item.issuedDate)}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Người ký">
                    <CatalogSelector
                      value={item.signerId}
                      onChange={(value) =>
                        hangeCatalogChange("signerId", value)
                      }
                      type={CatalogType.DOCUMENT_SIGNER}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Chức vụ người ký">
                    <CatalogSelector
                      value={item.positionId}
                      onChange={(value) =>
                        hangeCatalogChange("positionId", value)
                      }
                      type={CatalogType.DOCUMENT_POSITION}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item label="Ngày đăng công báo">
                    {!item.annoucementDate && (
                      <DatePicker
                        className="w-100"
                        placeholder="Chọn ngày"
                        showTime={false}
                        onChange={(value, format) => {
                          handleDateChange("annoucementDate", value);
                        }}
                        name="annoucementDate"
                        format={dateFormat}
                      />
                    )}
                    {item.annoucementDate && (
                      <DatePicker
                        className="w-100"
                        placeholder="Chọn ngày"
                        showTime={false}
                        onChange={(value, format) => {
                          handleDateChange("annoucementDate", value);
                        }}
                        name="annoucementDate"
                        format={dateFormat}
                        value={moment(item.annoucementDate)}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Số ngày">
                    <Input
                      type="number"
                      name="annouceNumber"
                      value={item.annouceNumber}
                      placeholder="Hiệu lực sau ngày đăng công báo"
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Ngày hết hiệu lực">
                    {!item.expirationDate && (
                      <DatePicker
                        className="w-100"
                        placeholder="Chọn ngày"
                        showTime={false}
                        onChange={(value, format) => {
                          handleDateChange("expirationDate", value);
                        }}
                        name="expirationDate"
                        format={dateFormat}
                      />
                    )}
                    {item.expirationDate && (
                      <DatePicker
                        className="w-100"
                        placeholder="Chọn ngày"
                        showTime={false}
                        onChange={(value, format) => {
                          handleDateChange("expirationDate", value);
                        }}
                        name="expirationDate"
                        format={dateFormat}
                        value={moment(item.expirationDate)}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Số ngày">
                    <Input
                      type="number"
                      name="expireNumber"
                      value={item.expireNumber}
                      placeholder="Hết hiệu lực sau (số ngày)"
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                {/* <Col span={6}>
                  <Form.Item label="Số thứ tự">
                    <Input
                      name="order"
                      type="number"
                      value={item.order}
                      onChange={handleChange}
                      defaultValue={props.item?.order}
                    />
                  </Form.Item>
                </Col> */}
                <Col span={6}>
                  <Form.Item label="Trạng thái">
                    <Select
                      placeholder="Chọn Trạng thái"
                      defaultValue={item.documentStatus}
                      value={item.documentStatus}
                      name="documentStatus"
                      onChange={(value) =>
                        handleSelectChange("documentStatus", value)
                      }
                    >
                      <Option value={0}>Chọn trạng thái</Option>
                      <Option value={1}>Còn hiệu lực</Option>
                      <Option value={2}>Hết hiệu lực</Option>
                    </Select>
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
