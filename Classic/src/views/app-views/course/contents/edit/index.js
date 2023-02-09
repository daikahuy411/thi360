import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Input,
  message,
  Result,
  Spin,
  Card,
  Radio,
  Checkbox,
} from "antd";
import ContentType, { getContentTypeName } from "enum/ContentType";
import ContentTree from "../tree";
import CourseApi from "api/course-api";
import ScormApi from "api/scorm-api";
import FileList from "views/app-views/shared/files";
import FileDialog from "views/app-views/shared/fileDialog";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  SendOutlined,
  LoadingOutlined,
  EyeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import CkEditor from "views/app-views/shared/ckeditor";

const ContentEdit = (props) => {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [processingScorm, setProcessingScorm] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    if (props.item.id > 0) {
      new CourseApi().getCourseContent(props.item.id).then((response) => {
        setItem(response.data);
      });
    } else {
      new CourseApi().getCourseOnlines(props.item.courseId).then((response) => {
        const currentItem = Object.assign({}, props.item);
        currentItem.outlineTree = response.data;
        currentItem.contentType = parseInt(ContentType.TEXT);
        setItem(currentItem);
      });
    }
  }, [props.item.id]);

  const changeContentType = (type) => {
    const currentItem = Object.assign({}, item);
    currentItem.contentType = type;
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

  const selectAttachmentFiles = () => {
    window.CKFinder.modal({
      chooseFiles: true,
      width: 800,
      height: 600,
      onInit: function (finder) {
        finder.on("files:choose", function (evt) {
          const currentItem = Object.assign({}, item);
          currentItem.fileModels = currentItem.fileModels || [];
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

  const removeFile = (file) => {
    item.fileModels = item.fileModels.filter((x) => x.url != file.url);
    item["files"] = JSON.stringify(item.fileModels);
    setItem({ ...item });
  };

  const onSave = () => {
    setIsLoading(true);
    const currentItem = Object.assign({}, item);
    currentItem.outlineTree = null;
    if (currentItem.contentType.toString() === ContentType.SCORM) {
      currentItem.scorm = JSON.stringify(currentItem.scormContent);
    }
    new CourseApi().saveCourseContent(currentItem).then((response) => {
      message.success("Cập nhật thành công.");
      setIsLoading(false);
      if (props.onSaved) {
        props.onSaved();
      }
    });
  };

  const selectScorm = () => {
    window.CKFinder.modal({
      chooseFiles: true,
      width: 800,
      height: 600,
      onInit: function (finder) {
        finder.on("files:choose", function (evt) {
          var file = evt.data.files.first();
          console.log(file);
          const currentItem = Object.assign({}, item);
          currentItem.scorm = file.attributes.url;
          setItem({ ...currentItem });
          processScorm(currentItem.scorm);
        });
      },
    });
  };

  const processScorm = (filePath) => {
    setProcessingScorm(true);
    new ScormApi().extractScorm(filePath).then((response) => {
      setProcessingScorm(false);
      if (response.data.IsSuccess) {
        item.scormContent = response.data.Value;
        item.scorm = "";
        message.success("Xử lý thành công.");
        setItem({ ...item });
      } else {
        message.error(response.Message);
      }
    });
  };

  const clearScormModel = () => {
    item.scormContent = null;
    item.scorm = "";
    setItem({ ...item });
  };

  return (
    item && (
      <>
        <Card title="Thông tin chung">
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Tên">
                  <Input
                    placeholder="Tên"
                    name="name"
                    defaultValue={item.name}
                    value={item.name}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Thứ tự">
                  <Input
                    name="order"
                    type="number"
                    defaultValue={item.order}
                    value={item.order}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Thời lượng (phút)">
                  <Input
                    name="duration"
                    defaultValue={item.duration}
                    value={item.duration}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Nội dung bắt buộc">
                  <Checkbox
                    checked={item.isRequired}
                    label="Bắt buộc"
                    name="isRequired"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Nội dung cha">
                  <ContentTree
                    data={item.outlineTree}
                    onChange={(value) => {
                      const currentItem = Object.assign({}, item);
                      currentItem.parentId = value;
                      setItem({ ...currentItem });
                    }}
                    value={item.parentId > 0 ? item.parentId.toString() : ""}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="Nội dung">
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Loại nội dung">
                  <Radio.Group
                    buttonStyle="solid"
                    style={{ marginTop: 16 }}
                    value={item.contentType}
                    onChange={(e) =>
                      changeContentType(parseInt(e.target.value))
                    }
                  >
                    {Object.keys(ContentType).map((type) => (
                      <Radio.Button
                        key={`type-${type}`}
                        value={parseInt(ContentType[type])}
                      >
                        {getContentTypeName(ContentType[type])}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            {item.contentType.toString() === ContentType.SCORM && (
              <>
                {!item.scormContent && (
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="File scorm">
                        <Input.Group compact>
                          <Input
                            style={{ width: "calc(100% - 90px)" }}
                            name="scorm"
                            defaultValue={item.scorm}
                            value={item.scorm}
                            onChange={handleChange}
                          />
                          <Button onClick={selectScorm} type="primary">
                            Tải file
                          </Button>
                        </Input.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                )}
                {processingScorm && (
                  <Row gutter={16}>
                    <Col span={24}>
                      <Spin indicator={antIcon} />
                      <span className="text-muted">
                        Hệ thống đang xử lý file, vui lòng chờ....
                      </span>
                    </Col>
                  </Row>
                )}
                {item.scormContent && (
                  <Row gutter={16}>
                    <Col span={24}>
                      <div className="ant-upload-list ant-upload-list-picture">
                        <div className="ant-upload-list-picture-container">
                          <div className="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture">
                            <div className="ant-upload-list-item-info">
                              <span className="ant-upload-span">
                                <FileTextOutlined size={64} />
                                <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ant-upload-list-item-name"
                                  title={item.scormContent.Name}
                                  href="#"
                                >
                                  {item.scormContent.Name}&nbsp;(
                                  {item.scormContent.SizeString})
                                </a>
                                <span className="ant-upload-list-item-card-actions picture">
                                  <Button
                                    onClick={clearScormModel}
                                    icon={<DeleteOutlined />}
                                  ></Button>
                                  &nbsp;
                                  <Button
                                    // onClick={() => viewOnline()}
                                    icon={<EyeOutlined />}
                                  ></Button>
                                  &nbsp;
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                )}
                {/* <Row gutter={16}>
                  <Col span={24}>
                    <Button
                      onClick={() => {
                        processScorm(item.scorm);
                      }}
                    >
                      Xử lý
                    </Button>
                  </Col>
                </Row> */}
              </>
            )}
            {item.contentType.toString() === ContentType.LINK && (
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Liên kết">
                    <Input
                      name="link"
                      defaultValue={item.link}
                      value={item.link}
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
            )}
            {item.contentType.toString() === ContentType.VIDEO && (
              <>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="Liên kết hoặc file đính kèm">
                      <Input
                        name="video"
                        defaultValue={item.video}
                        value={item.video}
                        onChange={handleChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="File đính kèm">
                      <Button
                        block
                        onClick={() => selectAttachmentFiles()}
                        icon={<CloudUploadOutlined />}
                      >
                        Tải file
                      </Button>
                      {item.fileModels && (
                        <FileList
                          removeFile={removeFile}
                          files={item.fileModels}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
            {/* {item.contentType.toString() === ContentType.TEXT && ( */}
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Nội dung">
                  <CkEditor
                    data={item.content}
                    onChange={(data) => {
                      const currentItem = Object.assign({}, item);
                      currentItem.content = data;
                      setItem({ ...currentItem });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            {/* )} */}
            {item.contentType.toString() !== ContentType.FOLDER &&
              item.contentType.toString() !== ContentType.SCORM &&
              item.contentType.toString() !== ContentType.VIDEO && (
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="File đính kèm">
                      <Button
                        block
                        onClick={() => selectAttachmentFiles()}
                        icon={<CloudUploadOutlined />}
                      >
                        Tải file
                      </Button>
                      {item.fileModels && (
                        <FileList
                          removeFile={removeFile}
                          files={item.fileModels}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              )}
          </Form>
        </Card>
        <Row gutter={16}>
          <Col span={24}>
            <Button
              style={{ marginRight: 8 }}
              onClick={onSave}
              loading={isLoading}
              type="primary"
            >
              Cập nhật
            </Button>
          </Col>
        </Row>
      </>
    )
  );
};

export default ContentEdit;
