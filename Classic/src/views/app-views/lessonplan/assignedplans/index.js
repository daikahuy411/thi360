import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import {
  Button,
  Row,
  Col,
  Tooltip,
  Modal,
  Tabs,
  message,
  Tag,
  Input,
  Menu,
  Card,
  Empty,
  Badge,
} from "antd";
import {
  EyeOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import LessonPlanApi from "api/lesson-plan-api";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import { Select } from "antd";
import ViewOnlineDialog from "views/app-views/shared/viewonlinedialog";
import ApprovalDialog from "../approvalfn/dialog";
import FileList from "views/app-views/shared/files";

const AssignedLessonPlanList = () => {
  let history = useHistory();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(0);
  const [openViewOnline, setOpenViewOnline] = useState(false);
  const [item, setItem] = useState(null);
  const [openApprovalDialog, setOpenApprovalDialog] = useState(false);
  const [stat, setStat] = useState(null);
  const [expanded, setExpanded] = useState({});

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewItem(row)} key={`viewDetail-${row.id}`}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">Xem chi tiết</span>
        </Flex>
      </Menu.Item>
      {/* <Menu.Item onClick={() => viewOnline(row)} key={'viewOnline'}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">Xem online</span>
        </Flex>
      </Menu.Item> */}
      <Menu.Item onClick={() => requestApproval(row)} key={`process-${row.id}`}>
        <Flex alignItems="center">
          <AuditOutlined />
          <span className="ml-2">Phê duyệt</span>
        </Flex>
      </Menu.Item>
      {/* <Menu.Item onClick={() => downloadFile(row)} key={'downloadFile'}>
        <Flex alignItems="center">
          <DownloadOutlined />
          <span className="ml-2">Tải file</span>
        </Flex>
      </Menu.Item> */}
    </Menu>
  );

  const toggle = (key) => {
    const currentExpaned = Object.assign({}, expanded);
    const isExpanded = currentExpaned[key] || false;
    currentExpaned[key] = !isExpanded;
    setExpanded({ ...currentExpaned });
  };

  const viewItem = (item) => {
    history.push(`/lms/modules/mylesson/lessonplans/process/${item.id}/overview`);
  };

  const viewOnline = (item) => {
    setItem(item);
    setOpenViewOnline(true);
  };

  const requestApproval = (item) => {
    setItem(item);
    setOpenApprovalDialog(true);
  };

  const downloadFile = (item) => {
    if (item.fileUrlObject) {
      window.open(item.fileUrlObject.url, "_blank");
    }
  };

  const edit = (id) => {
    history.push(`/lms/modules/mylesson/lessonplans/process/${id}/overview`);
  };

  const fetchData = () => {
    new LessonPlanApi().getAssignedLessonPlans(status).then((response) => {
      setData(response.data.value);
    });
  };

  const getStat = () => {
    new LessonPlanApi().getLessonPlanStat().then((response) => {
      setStat(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, [status]);

  useEffect(() => {
    getStat();
  }, []);

  return (
    <>
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center">
            <h4 style={{ marginBottom: 0 }}>Phê duyệt Giáo án</h4>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className={`my-1 container-fluid`}>
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey={0} onChange={(value) => setStatus(value)}>
              <Tabs.TabPane
                tab={`Chưa duyệt (${stat != null ? stat.totalPending : "0"})`}
                key={0}
                value={0}
              ></Tabs.TabPane>
              <Tabs.TabPane
                tab={`Đã duyệt (${stat != null ? stat.totalApproved : "0"})`}
                key={1}
                value={1}
              ></Tabs.TabPane>
              <Tabs.TabPane
                tab={`Từ chối (${stat != null ? stat.totalRejected : "0"})`}
                key={2}
                value={2}
              ></Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        <Card bodyStyle={{ padding: 0 }}>
          {data && (
            <div className="table-responsive">
              <div className="ant-table">
                <div className="ant-table-container">
                  <div className="ant-table-content">
                    <table>
                      <thead className="ant-table-thead">
                        <tr>
                          <th className="ant-table-cell" style={{ width: 25 }}>
                            #
                          </th>
                          <th
                            style={{ width: 30 }}
                            className="ant-table-cell ant-table-row-expand-icon-cell"
                          ></th>
                          <th className="ant-table-cell">Giáo án</th>
                          <th className="ant-table-cell" style={{ width: 180 }}>
                            Người gửi
                          </th>
                          <th className="ant-table-cell" style={{ width: 290 }}>
                            Thời gian
                          </th>
                          <th className="ant-table-cell" style={{ width: 180 }}>
                            Trạng thái
                          </th>
                          <th className="ant-table-cell" style={{ width: 90 }}>
                            {" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="ant-table-tbody">
                        {data.map((item, index) => {
                          return (
                            <>
                              <tr
                                className="ant-table-row ant-table-row-level-0"
                                key={`tr-user-row-${item.id}`}
                              >
                                <td className="ant-table-cell ">{index + 1}</td>
                                <td className="ant-table-cell ant-table-row-expand-icon-cell">
                                  <button
                                    type="button"
                                    onClick={() => toggle(item.id)}
                                    className={`ant-table-row-expand-icon ${
                                      expanded[item.id]
                                        ? "ant-table-row-expand-icon-expanded"
                                        : "ant-table-row-expand-icon-collapsed"
                                    }`}
                                    aria-label="Expand row"
                                    aria-expanded="false"
                                  ></button>
                                </td>
                                <td className="ant-table-cell ">
                                  <a onClick={() => edit(item.id)}>
                                    {item.name}
                                  </a>
                                  <div>
                                    <span className="text-muted">
                                      Bài dạy:{" "}
                                    </span>
                                    {item.lessonName}
                                  </div>

                                  <div>
                                    <span className="text-muted">
                                      Ngày tạo:{" "}
                                    </span>
                                    {moment(item.createdTime).format(
                                      "YYYY-MM-DD HH:mm"
                                    )}
                                  </div>
                                </td>
                                <td className="ant-table-cell ">
                                  <div className="text-muted">
                                    {item.fullName} ({item.userName})
                                  </div>
                                </td>
                                <td className="ant-table-cell ">
                                  <span>
                                    <span className="text-muted">
                                      Gửi duyệt:
                                    </span>
                                    &nbsp;
                                    {moment(item.requestedDateTime).format(
                                      "DD-MM-YYYY HH:mm"
                                    )}
                                  </span>
                                  {item.approvedDateTime && (
                                    <span style={{ display: "block" }}>
                                      <span className="text-muted">
                                        Ngày duyệt:
                                      </span>
                                      &nbsp;
                                      {moment(item.approvedDateTime).format(
                                        "DD-MM-YYYY HH:mm"
                                      )}
                                    </span>
                                  )}
                                </td>
                                <td className="ant-table-cell ">
                                  {(item.approvalStatus === 1 ||
                                    item.approvalStatus === 0) && (
                                    <Badge
                                      color={"green"}
                                      text={item.approvalStatusName}
                                    />
                                  )}
                                  {item.approvalStatus === 2 && (
                                    <Badge
                                      color={"red"}
                                      text={item.approvalStatusName}
                                    />
                                  )}
                                  <div className="text-muted">
                                    &nbsp;
                                    {item.totalApproved}/{item.totalReviewer}{" "}
                                    &nbsp;
                                    <Tooltip
                                      placement="topLeft"
                                      title={
                                        "Số người đã duyệt/ Tổng số người kiểm tra"
                                      }
                                    >
                                      <InfoCircleOutlined
                                        style={{ color: "rgba(0,0,0,.45)" }}
                                      />
                                    </Tooltip>
                                  </div>
                                </td>
                                <td className="ant-table-cell ">
                                  <div className="text-right">
                                    <EllipsisDropdown
                                      menu={dropdownMenu(item)}
                                    />
                                  </div>
                                </td>
                              </tr>
                              {expanded[item.id] && expanded[item.id] === true && (
                                <tr
                                  key={`tr-data-files-${item.id}`}
                                  className="ant-table-expanded-row ant-table-expanded-row-level-1"
                                >
                                  <td colSpan={7} className="ant-table-cell">
                                    {item.fileModels && (
                                      <FileList
                                        files={item.fileModels}
                                        viewOnly={true}
                                      />
                                    )}
                                    {item.fileModels.length == 0 && (
                                      <span className="text-muted">
                                        Không có file đính kèm...
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              )}
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
      {openViewOnline && item && item.fileUrlObject && (
        <ViewOnlineDialog
          file={item.fileUrlObject}
          onClose={() => {
            setOpenViewOnline(false);
          }}
        />
      )}
      {openApprovalDialog && item && (
        <ApprovalDialog
          onSaved={() => {
            fetchData();
            getStat();
          }}
          item={item}
          onClose={() => setOpenApprovalDialog(false)}
        />
      )}
    </>
  );
};

export default AssignedLessonPlanList;
