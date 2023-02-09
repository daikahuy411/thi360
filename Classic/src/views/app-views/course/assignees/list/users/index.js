import React, { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Pagination,
  Checkbox,
  message,
  Button,
  Menu,
  Modal,
  DatePicker,
  Descriptions,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import UserDialog from "views/app-views/shared/userdialog";
import Role from "enum/Role";
import CourseApi from "api/course-api";

const { confirm } = Modal;

const UserList = (props) => {
  const { courseId } = props;
  const [items, setItems] = useState(null);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const onSelectedUsers = (selectedUsers) => {
    if (!selectedUsers || selectedUsers.length == 0) return;
    setLoading(true);
    const userIds = selectedUsers.map((item) => item.id);
    new CourseApi().addUsersToCourse(courseId, userIds).then((response) => {
      setLoading(false);
      message.success(`Cập nhật thành công.`);
      fetchData(props.courseId);
    });
    setOpenUserDialog(false);
  };

  const fetchData = (courseId) => {
    new CourseApi()
      .searchesCourseUsers({ courseId: parseInt(courseId), page: page })
      .then((response) => {
        setItems(response.data.value);
        setTotalItems(response.data.totalItems);
      });
  };

  const removeUser = (user) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new CourseApi().deleteCourseUser(user.id).then((response) => {
          message.success(`Cập nhật thành công.`);
          fetchData(props.courseId);
        });
      },
      onCancel() {},
    });
  };

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  useEffect(() => {
    fetchData(props.courseId);
  }, [props.courseId]);

  return (
    <>
      <Row>
        <Col span={24}>
          <Form.Item>
            <Card
              extra={
                <Button
                  size="sm"
                  type="primary"
                  loading={loading}
                  onClick={() => {
                    setOpenUserDialog(true);
                  }}
                  icon={<PlusOutlined />}
                >
                  Chọn Học viên
                </Button>
              }
            >
              <Row>
                <Col span={24}>
                  <span color="secondary">Tổng số {totalItems} bản ghi.</span>
                </Col>
              </Row>
              {items && items.length > 0 && (
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
                                    style={{ width: 240 }}
                                  >
                                    Tên đăng nhập
                                  </th>
                                  <th
                                    className="ant-table-cell"
                                    style={{ width: 120 }}
                                  >
                                    Đơn vị
                                  </th>
                                  <th
                                    className="ant-table-cell"
                                    style={{ width: 120 }}
                                  >
                                    Trạng thái
                                  </th>
                                  <th
                                    className="ant-table-cell"
                                    style={{ width: 80 }}
                                  >
                                    Thao tác
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="ant-table-tbody">
                                {items.map((user, index) => {
                                  return (
                                    <tr
                                      key={`tr-administrator-${user.userName}`}
                                      className="ant-table-row ant-table-row-level-0"
                                    >
                                      <td
                                        className="ant-table-cell "
                                        style={{ width: 25 }}
                                      >
                                        {index + 1}
                                      </td>
                                      <td className="ant-table-cell ">
                                        {user.userName}
                                        <br />
                                        {user.fullName}
                                        <br />
                                        {user.email}
                                      </td>
                                      <td className="ant-table-cell ">
                                        {user.organizationName}
                                      </td>
                                      <td className="ant-table-cell ">
                                        {user.statusName}
                                      </td>
                                      <td className="ant-table-cell ">
                                        <div className="text-right">
                                          <Button
                                            size="small"
                                            onClick={() => {
                                              removeUser(user);
                                            }}
                                          >
                                            <DeleteOutlined />
                                          </Button>
                                        </div>
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
              )}
              <Row gutter={16}>
                <Col span={24} alignItems="right" flex={"flex-end"}>
                  <Pagination
                    showSizeChanger={false}
                    className="ant-table-pagination-right ant-table-pagination"
                    total={totalItems}
                    defaultCurrent={page}
                    onChange={pageChanged}
                    pageSize={20}
                  />
                </Col>
              </Row>
            </Card>
          </Form.Item>
          {openUserDialog && (
            <UserDialog
              onOK={onSelectedUsers}
              role={Role.STUDENT}
              onClose={() => {
                setOpenUserDialog(false);
              }}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default UserList;
