import React, { useState, useEffect } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import {
  Menu,
  Card,
  Button,
  Modal,
  message,
  Col,
  Row,
  Radio,
  Empty,
} from "antd";
import AnnouncementEdit from "./edit";
import CourseApi from "api/course-api";

const { confirm } = Modal;

const CourseAnnouncements = (props) => {
  const [data, setData] = useState(null);
  const [onEditing, setOnEditing] = useState(false);
  const [item, setItem] = useState(null);
  const { confirm } = Modal;

  const { param } = props;

  const fetchData = (param) => {
    const { id } = param;
    new CourseApi().getCourseAnnouncements(id).then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    fetchData(param);
  }, [param]);

  const add = () => {
    const { id } = param;
    setOnEditing(true);
    setItem({ id: 0, courseId: id });
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => editItem(row)} key={2}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Sửa</span>
        </Flex>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => deleteRow(row)} key={3} danger>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">Xóa</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const editItem = (item) => {
    setItem(item);
    setOnEditing(true);
  };

  const deleteRow = (row) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new CourseApi().deleteCourseAnnouncement(row.id).then((response) => {
          message.success("Xóa thành công.");
          fetchData(param);
        });
      },
      onCancel() {},
    });
  };

  const onSaved = (item) => {
    fetchData(param);
    setOnEditing(false);
    setItem(null);
  };

  return (
    <>
      <Card>
        <div className="container-fluid">
          <Row gutter={16}>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button
                type="primary"
                size="small"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Thêm mới
              </Button>
              <br />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              {data && data.length > 0 && (
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
                              <th className="ant-table-cell">Tên</th>
                              <th
                                className="ant-table-cell"
                                style={{ width: 180 }}
                              >
                                Ngày tạo
                              </th>
                              <th
                                className="ant-table-cell"
                                style={{ width: 120 }}
                              >
                                Thao tác
                              </th>
                            </tr>
                          </thead>
                          <tbody className="ant-table-tbody">
                            {data.map((item, index) => {
                              return (
                                <tr
                                  key={`tr-administrator-${item.id}`}
                                  className="ant-table-row ant-table-row-level-0"
                                >
                                  <td
                                    className="ant-table-cell "
                                    style={{ width: 25 }}
                                  >
                                    {index + 1}
                                  </td>
                                  <td className="ant-table-cell ">
                                    {item.name}
                                  </td>
                                  <td className="ant-table-cell ">
                                    {moment(item.createdTime).format(
                                      "YYYY-MM-DD HH:mm"
                                    )}
                                  </td>
                                  <td className="ant-table-cell ">
                                    <div className="text-right">
                                      <EllipsisDropdown
                                        menu={dropdownMenu(item)}
                                      />
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
              )}
            </Col>
          </Row>
          {(!data || data.length === 0) && (
            <Row gutter={16}>
              <Col xs={24} sm={24} lg={24} xl={24} xxl={24}>
                <Empty
                  description="Hiện tại chưa có thông báo."
                  style={{ marginTop: 50 }}
                />
              </Col>
            </Row>
          )}
        </div>
      </Card>
      {onEditing && item && (
        <AnnouncementEdit
          key={item.id}
          item={item}
          onSaved={(item) => {
            onSaved(item);
          }}
        />
      )}
    </>
  );
};

export default CourseAnnouncements;
