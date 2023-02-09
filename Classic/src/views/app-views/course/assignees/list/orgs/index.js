import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, message, Button, Menu, Modal } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Role from "enum/Role";
import CourseApi from "api/course-api";
import OrganizationSelector from "views/app-views/shared/organizationtselector";

const { confirm } = Modal;

const OrgList = (props) => {
  const { courseId } = props;
  const [items, setItems] = useState(null);
  const [openOrgDialog, setOpenOrgDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const onSelectedOrgs = (selectedOrgs) => {
    if (!selectedOrgs || selectedOrgs.length == 0) return;
    setLoading(true);
    const ids = selectedOrgs.map((item) => parseInt(item));
    new CourseApi().addOrgsToCourse(courseId, ids).then((response) => {
      setLoading(false);
      message.success(`Cập nhật thành công.`);
      fetchData(props.courseId);
    });
    setOpenOrgDialog(false);
  };

  const fetchData = (courseId) => {
    new CourseApi()
      .searchesCourseOrgs({ courseId: parseInt(courseId) })
      .then((response) => {
        setItems(response.data.value);
        setTotalItems(response.data.totalItems);
      });
  };

  const remove = (item) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new CourseApi().deleteCourseOrg(item.id).then((response) => {
          message.success(`Cập nhật thành công.`);
          fetchData(props.courseId);
        });
      },
      onCancel() {},
    });
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
                    setOpenOrgDialog(true);
                  }}
                  icon={<PlusOutlined />}
                >
                  Chọn Đơn vị
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
                                  <th className="ant-table-cell">Đơn vị</th>
                                  <th
                                    className="ant-table-cell"
                                    style={{ width: 120 }}
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
                                        {user.name}
                                      </td>
                                      <td className="ant-table-cell ">
                                        <div className="text-right">
                                          <Button
                                            size="small"
                                            onClick={() => {
                                              remove(user);
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
            </Card>
          </Form.Item>
          {openOrgDialog && (
            <OrganizationSelector
              onOK={onSelectedOrgs}
              onClose={() => {
                setOpenOrgDialog(false);
              }}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default OrgList;
