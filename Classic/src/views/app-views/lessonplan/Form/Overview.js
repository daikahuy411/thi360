import React, { useState, useEffect } from "react";
import { Descriptions, Badge, Card, Row, Col, Button, message } from "antd";
import LessonPlanApi from "api/lesson-plan-api";
import {
  SendOutlined,
  FileTextOutlined,
  DownloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import UserDialog from "views/app-views/shared/userdialog";
import moment from "moment";
import Role from "enum/Role";
import { useHistory } from "react-router-dom";
// import FileInfo from "views/app-views/shared/fileInfo";
// import ApprovalFn from "../approvalfn";
import FileList from "views/app-views/shared/files";

const Overview = (props) => {
  const [item, setItem] = useState(null);
  const { param } = props;
  const [submitLoading, setSubmitLoading] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);

  let history = useHistory();

  useEffect(() => {
    const { id } = param;
    const api = new LessonPlanApi();
    api.get(parseInt(id)).then((response) => {
      setItem(response.data);
    });
  }, [param, props]);

  const viewOnline = (fileUrl) => {
  };

  const onSelectedUsers = (selectedUsers) => {
    const { id } = param;
    if (!selectedUsers || selectedUsers.length == 0) return;
    const userIds = selectedUsers.map(item => item.id);
    new LessonPlanApi().requestApproval(id, userIds).then((response) => {
      setSubmitLoading(false);
      message.success(`Gửi kiểm tra thành công.`);
      history.push(`/lms/modules/mylesson/lessonplans/edit/${id}/overview`);
    });
    setOpenUserDialog(false);
  };

  const downloadFile = (fileUrl) => {
  };

  const selectApproval = () => {
    setOpenUserDialog(true);
  };

  return (
    <>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          {props.mode !== "PROCESS" && (
            <Button
              type="primary"
              onClick={() => selectApproval()}
              loading={submitLoading}
            >
              <SendOutlined />&nbsp;Gửi Kiểm tra
            </Button>
          )}
          {/* {props.mode === "PROCESS" && (
            <ApprovalFn item={item} />
          )} */}
        </Col>
      </Row>
      <br />
      <Card>
        {item && (
          <Descriptions bordered>
            <Descriptions.Item label="Tên Giáo án" span={3}>
              {item.name}
            </Descriptions.Item>
            <Descriptions.Item label="File đính kèm" span={3}>
              {item.fileModels && (
                <FileList viewOnly={true} files={item.fileModels} />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Khối"  >
              {item.schoolBlockCatalogName}
            </Descriptions.Item>
            <Descriptions.Item label="Môn học"  >
              {item.subjectCatalogName}
            </Descriptions.Item>
            <Descriptions.Item label="Bộ sách"  >
              {item.bookCatalogName}
            </Descriptions.Item>
            <Descriptions.Item label="Tiết dạy"  >
              {item.lessonNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Từ ngày"  >
              {moment(item.startDate).format(
                "YYYY-MM-DD"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Tới ngày"  >
              {moment(item.endDate).format(
                "YYYY-MM-DD"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái" >
              <Badge status="processing" text={item.statusName} />
            </Descriptions.Item>
            <Descriptions.Item label="Số người duyệt"  >
              {item.totalReviewer}
            </Descriptions.Item>
            <Descriptions.Item label="Số bình luận">
              {item.totalComment}
            </Descriptions.Item>
            <Descriptions.Item label="Lịch sử" span={3}>
              Ngày tạo: {moment(item.createdTime).format("YYYY-MM-DD HH:mm:ss")}
              <br />
              Ngày sửa gần nhất:{" "}
              {moment(item.lastModifiedTime).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>
      <Card title="Người Kiểm tra">
        {item && item.reviewers && (
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
                                    <span className="text-muted">Ngày gửi:&nbsp;</span>{moment(item.createdTime).format("YYYY-MM-DD HH:mm")}
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
      {openUserDialog && (
        <UserDialog
          onOK={onSelectedUsers}
          role={Role.GroupLeader}
          onClose={() => {
            setOpenUserDialog(false);
          }}
        />
      )}
    </>
  );
};

export default Overview;
