import React, { useState, useEffect } from "react";
import { Input, Row, Col, Card, Form, Checkbox, message, Button, Menu, Modal, DatePicker, Descriptions } from "antd";
import {
  CloudUploadOutlined,  
  SendOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import FileDialog from "views/app-views/shared/fileDialog";
import LessonPlanApi from "api/lesson-plan-api";
import UserDialog from "views/app-views/shared/userdialog";
import CatalogSelector from 'views/app-views/shared/catalogSelector';
import { CatalogType } from "types/CatalogType";
import moment from "moment";
import Role from "enum/Role";
import FileList from "views/app-views/shared/files";

const { confirm } = Modal;
const dateFormat = "DD-MM-YYYY";

const GeneralField = (props) => {
  const [item, setItem] = useState(props.item);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);

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
  }

  const onFinish = () => {
    setSubmitLoading(true);
    new LessonPlanApi().save(item).then((response) => {
      setSubmitLoading(false);
      if (item.id === 0) {
        message.success(`Tạo mới thành công.`);
        history.push(`/lms/modules/mylesson/lessonplans/edit/${response.data.id}`);
      }
      if (item.id > 0) {
        message.success(`Cập nhật thành công.`);
      }
    });
  };

  const onSelectedUsers = (selectedUsers) => {
    if (!selectedUsers || selectedUsers.length == 0) return;
    const userIds = selectedUsers.map(item => item.id);
    new LessonPlanApi().requestApproval(props.item.id, userIds).then((response) => {
      setSubmitLoading(false);
      message.success(`Gửi kiểm tra thành công.`);
      history.push(`/lms/modules/mylesson/lessonplans/edit/${props.item.id}/overview`);
    });
    setOpenUserDialog(false);
  };

  const removeUser = (user) => {
    const currentItem = Object.assign({}, item);
    var reviewers = currentItem["reviewers"] || [];
    reviewers = reviewers.filter(x => x.userId != user.userId);
    currentItem["reviewers"] = reviewers;
    setItem({ ...currentItem });
  };

  const selectApproval = () => {
    setOpenUserDialog(true);
  };

  const removeFile = (file) => {
    item.fileModels = item.fileModels.filter(x => x.url != file.url);
    item["files"] = JSON.stringify(item.fileModels);
    setItem({ ...item });
  };

  const selectFiles = () => {
    window.CKFinder.modal({
      chooseFiles: true,
      width: 800,
      height: 600,
      onInit: function (finder) {
        finder.on('files:choose', function (evt) {
          const currentItem = Object.assign({}, item);

          evt.data.files.map((file) => {
            const fileModel = { name: file.attributes.name, extension: file._extenstion, size: file.attributes.size, url: file.attributes.url };
            currentItem.fileModels.push(fileModel);
          });

          currentItem["files"] = JSON.stringify(currentItem.fileModels);
          setItem({ ...currentItem });
        });
      }
    });
  }

  const selectAvatar = () => {
    window.CKFinder.modal({
      chooseFiles: true,
      width: 800,
      height: 600,
      onInit: function (finder) {
        finder.on('files:choose', function (evt) {
          const currentItem = Object.assign({}, item);
          var file = evt.data.files.first();
          currentItem["avatarUrlObject"] = { name: file.attributes.name, extension: file._extenstion, size: file.attributes.size, url: file.attributes.url };
          currentItem["avatarUrl"] = JSON.stringify(currentItem["avatarUrlObject"]);
          setItem({ ...currentItem });
        });
      }
    });
  }

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
                {item.id > 0 && (
                  <>
                    &nbsp;
                    <Button
                      type="primary"
                      onClick={() => selectApproval()}
                      loading={submitLoading}
                    >
                      <SendOutlined />&nbsp;Gửi Kiểm tra
                    </Button>
                  </>
                )}
              </div>
            </Flex>
          </Col>
          <Col xs={24} sm={24} md={17}>
            <Card title="Thông tin">
              <Form.Item label="Tên chủ đề" >
                <Input
                  name="name"
                  value={item.name}
                  onChange={handleChange}
                  defaultValue={props.item?.name}
                />
              </Form.Item>
              <Form.Item label="Bài dạy">
                <Input
                  name="lessonName"
                  value={item.lessonName}
                  onChange={handleChange}
                />
              </Form.Item>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Khối lớp" >
                    <CatalogSelector
                      value={item.schoolBlockCatalogId}
                      onChange={(value) => hangeCatalogChange('schoolBlockCatalogId', value)}
                      type={CatalogType.SCHOOL_BLOCK_CATALOG} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Môn học" >
                    <CatalogSelector
                      value={item.subjectCatalogId}
                      onChange={(value) => hangeCatalogChange('subjectCatalogId', value)}
                      type={CatalogType.SUBJECT_CATALOG} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Bộ sách" >
                    <CatalogSelector
                      value={item.bookCatalogId}
                      onChange={(value) => hangeCatalogChange('bookCatalogId', value)}
                      type={CatalogType.BOOK_CATALOG} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Lớp">
                <Input
                  name="className"
                  value={item.className}
                  onChange={handleChange}
                />
              </Form.Item>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Thời gian thực hiện (tiết)">
                    <Input
                      type="number"
                      name="lessonNumber"
                      value={item.lessonNumber}
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Từ ngày">
                    {item.startDate && (
                      <DatePicker
                        className="w-100"
                        showTime={false}
                        onChange={(value, format) => {
                          handleDateChange("startDate", value);
                        }}
                        name="startDate"
                        value={moment(item.startDate)}
                        placeholder="Chọn ngày"
                        format={dateFormat}
                      />)}
                    {!item.startDate && (
                      <DatePicker
                        className="w-100"
                        showTime={false}
                        onChange={(value, format) => {
                          handleDateChange("startDate", value);
                        }}
                        name="startDate"
                        placeholder="Chọn ngày"
                        format={dateFormat}
                      />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Tới ngày">
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
                <Button onClick={() => selectFiles()} icon={<CloudUploadOutlined />}>Chọn file</Button>
                {item.fileModels && (
                  <FileList removeFile={removeFile} viewOnly={false} files={item.fileModels} />
                )}
              </Form.Item>
              <Form.Item label="Số thứ tự">
                <Input
                  name="order"
                  type="number"
                  value={item.order}
                  onChange={handleChange}
                  defaultValue={props.item?.order}
                />
              </Form.Item>
              {item.reviewers && (
                <Form.Item>
                  <Card title="Người Kiểm tra">
                    <Row gutter={16}>
                      <Col span={24}>
                        <div className="table-responsive">
                          <div className="ant-table">
                            <div className="ant-table-container">
                              <div className="ant-table-content">
                                <table>
                                  <thead className="ant-table-thead">
                                    <tr>
                                      <th
                                        className="ant-table-cell"
                                        style={{ width: 25 }}
                                      >
                                        #
                                      </th>
                                      <th
                                        className="ant-table-cell"
                                      >
                                        Thông tin
                                      </th>
                                      <th
                                        className="ant-table-cell"
                                        style={{ width: 260 }}
                                      >
                                        Thời gian
                                      </th>
                                      <th
                                        className="ant-table-cell"
                                        style={{ width: 150 }}
                                      >
                                        Trạng thái
                                      </th>
                                      {/* <th
                                        style={{ width: 120 }}
                                        className="ant-table-cell">
                                        Thao tác
                                      </th> */}
                                    </tr>
                                  </thead>
                                  <tbody className="ant-table-tbody">
                                    {item.reviewers.map((item, index) => {
                                      return (
                                        <tr
                                          className="ant-table-row ant-table-row-level-0"
                                          key={`tr-user-row-${item.userId}`}
                                        >
                                          <td className="ant-table-cell ">{index + 1}</td>
                                          <td className="ant-table-cell ">
                                            {item.userName}
                                            <br />
                                            {item.fullName}
                                            <br />
                                            {item.email}
                                          </td>
                                          <td className="ant-table-cell ">
                                            <span style={{ display: 'block' }}>
                                              <span className="text-muted">Ngày gửi duyệt:&nbsp;</span>{moment(item.createdTime).format("YYYY-MM-DD HH:mm")}
                                            </span>
                                            {item.approvalDate && (
                                              <span  >
                                                <span className="text-muted">Ngày duyệt:&nbsp;
                                                </span>{moment(item.createdTime).format("YYYY-MM-DD HH:mm")}
                                              </span>
                                            )}
                                          </td>
                                          <td className="ant-table-cell ">
                                            {item.statusName}
                                          </td>
                                          {/* <td className="ant-table-cell ">
                                            <Button onClick={() => removeUser(item)} size="small"><DeleteOutlined /></Button>
                                          </td> */}
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
                  </Card>
                </Form.Item>
              )}
            </Card>
          </Col>
          <Col xs={24} sm={24} md={7}>
            <Card title="Ảnh đại diện">
              <FileDialog onClick={() => selectAvatar()} fileUrlObject={item.avatarUrlObject} />
            </Card>
          </Col>
        </Row>
        {openUserDialog && (
          <UserDialog
            onOK={onSelectedUsers}
            role={Role.APPROVAL}
            onClose={() => {
              setOpenUserDialog(false);
            }}
          />
        )}
      </>
    )
  );
};

export default GeneralField;
