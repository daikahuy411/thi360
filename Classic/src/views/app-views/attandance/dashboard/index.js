import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Table, Tag, Select, Badge, List, Descriptions, Divider } from "antd";
import {
  EditOutlined
} from "@ant-design/icons";
import AttendanceApi from "api/attendance-api";
import EditForm from "../edit";
import moment from "moment";
import UserApi from "api/user-api";
import Role from "enum/Role";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [data, setData] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState(0);
  const [editing, setEditing] = useState(false);
  const [userRoleScopes, setUserRoleScopes] = useState(null);

  const edit = (classId) => {
    setSelectedClassId(classId);
    setEditing(true);
  }

  const onClose = (changed) => {
    setSelectedClassId(0);
    setEditing(false);
    fetchData();
  }

  const fetchData = () => {
    new AttendanceApi().getCurrentAttendances(0).then((response) => {
      setData(response.data);
    })

    new AttendanceApi().getDashboard().then((response) => {
      setDashboard(response.data);
    })
  };

  useEffect(() => {
    fetchData();

    new UserApi().getUserRoleScopes().then((response) => {
      setUserRoleScopes(response.data);
    });
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderEdit = (classId) => (
    <>
      {userRoleScopes && userRoleScopes.length > 0 &&
        userRoleScopes.filter(x => (x.roleName === Role.TEACHER || x.roleName === Role.SUBJECTTEACHER)
          && x.organizationId == classId).length > 0 && (
          <Button size="sm"
            onClick={() => { edit(classId) }}
            shape="circle" icon={<EditOutlined />}></Button>
        )}
    </>
  );

  return (
    <>
      <Card title="Tổng quan Điểm danh">
        {dashboard && (
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Descriptions bordered>
                <Descriptions.Item span={2} label="Thời gian">
                  {moment(dashboard.time).format("DD-MM-YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Tổng số học sinh">
                  <b style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>
                    {dashboard.totalUsers}
                  </b>
                </Descriptions.Item>
                <Descriptions.Item label="Chưa điểm danh">
                  <b style={{ color: 'rgb(255, 77, 79)', fontWeight: 'bold', fontSize: 18 }}>
                    {dashboard.totalAbsent}
                  </b>
                </Descriptions.Item>
                <Descriptions.Item label="Đã điểm danh">
                  <b style={{ color: 'rgb(82, 196, 26)', fontWeight: 'bold', fontSize: 18 }}>
                    {dashboard.totalPresent}
                  </b>
                </Descriptions.Item>
                <Descriptions.Item label="Hs bán trú đã điểm danh">
                  <b style={{ color: 'rgb(82, 196, 26)', fontWeight: 'bold', fontSize: 18 }}>
                    {dashboard.totalDayBoardingPresent}
                  </b>
                </Descriptions.Item>
                <Descriptions.Item label="Lớp đã báo cáo" >
                  <b style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>
                    {dashboard.totalRecord}
                  </b>
                </Descriptions.Item>
                <Descriptions.Item label="Tổng số lớp"   >
                  <b style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>
                    {dashboard.totalClasses}
                  </b>
                </Descriptions.Item>
                <Descriptions.Item label="Cập nhật gần nhất"   >
                  {moment(dashboard.now).format("DD-MM-YYYY HH:mm:ss")}
                </Descriptions.Item>
              </Descriptions>
              <br />
            </Col>
          </Row>
        )}
        <Row gutter={16}>
          {data && (
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <div className="table-responsive" style={{ width: '100%' }}>
                <div className="ant-table ant-table-bordered">
                  <div className="ant-table-container">
                    <div className="ant-table-content">
                      <table style={{ width: '100%' }}>
                        <thead className="ant-table-thead">
                          <tr>
                            {data.map((item) => (
                              <th className="ant-table-cell"
                                style={{ width: '10%', textAlign: 'center', backgroundColor: '#fafafa' }}
                                key={`group-attendance-${item.group}`}>
                                <b>  KHỐI {item.group}</b>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="ant-table-tbody">
                          <tr>
                            {data.map((item) => (
                              <td className="ant-table-cell"
                                style={{ width: '10%', verticalAlign: 'top' }}
                                key={`classes-attendance-${item.group}`}>
                                {item.attendances.map((a) => (
                                  <Card title={a.class.name}
                                    extra={renderEdit(a.classId)}
                                    key={`class-overview-${a.classId}`}>
                                    <table>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <span className="ant-avatar ant-avatar-md ant-avatar-square" style={{ backgroundColor: '#ff4d4f' }}>
                                              <span className="ant-avatar-string" style={{ fontWeight: 'bold', fontSize: 18, left: '10%' }}>
                                                {a.totalAbsent}
                                              </span>
                                            </span>
                                          </td>
                                          <td>
                                            <span className="ant-avatar ant-avatar-md ant-avatar-square" style={{ backgroundColor: '#52c41a' }}>
                                              <span className="ant-avatar-string" style={{ fontWeight: 'bold', fontSize: 18, left: '10%' }}>
                                                {a.totalPresent}
                                              </span>
                                            </span>
                                          </td>
                                          <td>
                                            <span className="ant-avatar ant-avatar-md ant-avatar-square" style={{ backgroundColor: '#ccc' }}>
                                              <span className="ant-avatar-string" style={{ color: '#000', fontWeight: 'bold', fontSize: 18, left: '10%' }}>
                                                {a.totalUser}
                                              </span>
                                            </span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </Card>
                                ))}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                        <tfoot className="ant-table-summary">
                          <tr>
                            {data.map((item) => (
                              <td className="ant-table-cell" key={`class-total-td-${item.group}`}>
                                <Card
                                  title={"Tổng số"}
                                  key={`class-total-${item.group}`}>
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <span className="ant-avatar ant-avatar-md ant-avatar-square" style={{ backgroundColor: '#ff4d4f' }}>
                                            <span className="ant-avatar-string" style={{ fontWeight: 'bold', fontSize: 18, left: '10%' }}>
                                              {item.totalAbsent}
                                            </span>
                                          </span>
                                        </td>
                                        <td>
                                          <span className="ant-avatar ant-avatar-md ant-avatar-square" style={{ backgroundColor: '#52c41a' }}>
                                            <span className="ant-avatar-string" style={{ fontWeight: 'bold', fontSize: 18, left: '10%' }}>
                                              {item.totalPresent}
                                            </span>
                                          </span>
                                        </td>
                                        <td>
                                          <span className="ant-avatar ant-avatar-md ant-avatar-square" style={{ backgroundColor: '#ccc' }}>
                                            <span className="ant-avatar-string" style={{ color: '#000', fontWeight: 'bold', fontSize: 18, left: '10%' }} >
                                              {item.totalUser}
                                            </span>
                                          </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </Card>
                              </td>
                            ))}
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </Col>)}
        </Row>
      </Card>
      {editing && selectedClassId > 0 && (
        <EditForm classId={selectedClassId} onClose={(changed) => { onClose(changed) }} />
      )}
    </>
  );
};

export default Dashboard;
