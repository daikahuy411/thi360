import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, message, Button, Menu, Modal, Pagination } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Role from "enum/Role";
import DocumentApi from "api/document-api";
import OrganizationSelector from "views/app-views/shared/organizationtselector";

const { confirm } = Modal;

const OrgList = (props) => {
  const { documentId } = props;
  const [items, setItems] = useState(null);
  const [openOrgDialog, setOpenOrgDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalItems, setTotalItems] = useState(0);

  const onSelectedOrgs = (selectedOrgs) => {
    if (!selectedOrgs || selectedOrgs.length == 0) return;
    setLoading(true);
    const ids = selectedOrgs.map((item) => parseInt(item));
    new DocumentApi().addOrgToDocument(documentId, ids).then((response) => {
      setLoading(false);
      message.success(`Cập nhật thành công.`);
      fetchData(props.documentId);
    });
    setOpenOrgDialog(false);
  };

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  const fetchData = (documentId) => {
    new DocumentApi()
      .searchDocumentOrg({ documentId: parseInt(documentId), page: parseInt(page), limit: parseInt(limit) })
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
        new DocumentApi().deleteDocumentOrg(item.organizationId).then((response) => {
          message.success(`Cập nhật thành công.`);
          fetchData(props.documentId);
        });
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    fetchData(props.documentId);
  }, [props.documentId, page]);

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
                                {items.map((item, index) => {
                                  return (
                                    <tr
                                      key={`tr-administrator-${item.organizationId}`}
                                      className="ant-table-row ant-table-row-level-0"
                                    >
                                      <td
                                        className="ant-table-cell "
                                        style={{ width: 25 }}
                                      >
                                        {index + 1 + (page - 1)*limit}
                                      </td>
                                      <td className="ant-table-cell ">
                                        {item.organizationName}
                                      </td>
                                      <td className="ant-table-cell ">
                                        <div className="text-right">
                                          <Button
                                            size="small"
                                            onClick={() => {
                                              remove(item);
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
                    pageSize={limit}
                  />
                </Col>
              </Row>
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
