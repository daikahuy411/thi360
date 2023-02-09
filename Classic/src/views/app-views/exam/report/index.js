import React, { useState, useEffect } from "react";
import { Card, Modal, message, Select, Input, Button, Badge, Menu } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  FileExcelOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import OrganizationApi from "api/organization-api";
import moment from "moment";
import ExamApi from "api/exam-api";

const ExamReport = (props) => {
  let history = useHistory();
  const [reportingData, setReportingData] = useState(null);
  const [orgs, setOrgs] = useState([]);
  const [orgId, setOrgId] = useState(0);

  const getAllOrg = () => {
    var orgApi = new OrganizationApi();
    orgApi.getAll().then((response) => {
      setOrgs(response.data);
    });
  };

  const fetchData = () => {
    new ExamApi().getExamReport(props.examId, orgId).then((response) => {
      setReportingData(response.data);
    });
  };

  const exportExcel = () => {
    new ExamApi().exportExamReport(props.examId, orgId).then((response) => {
      if (response.data.isSuccess) {
        // window.location.href = response.data.value;
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [props.examId]);

  useEffect(() => {
    getAllOrg();
  }, []);

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          {/* <Flex className="mb-1" mobileFlex={false}>
            <div className="mr-md-3 mb-3">
              <Input
                placeholder="Tìm theo tên đăng nhập"
                prefix={<SearchOutlined />}
                onChange={(e) => onSearch(e)}
              />
            </div>
            <div className="mb-3">
              {orgs && (
                <Select
                  defaultValue="0"
                  onChange={(value) => setOrgId(parseInt(value))}
                  className="w-100"
                  style={{ minWidth: 180 }}
                  placeholder="Lớp"
                >
                  <Option value="0">Tất cả Lớp</Option>
                  {orgs.map((elm) => (
                    <Option key={elm.id} value={elm.id}>
                      {elm.name}
                    </Option>
                  ))}
                </Select>
              )}
            </div>
          </Flex> */}
          <div className="mb-3">
            <Button
              type="primary"
              onClick={() => {
                exportExcel();
              }}
              icon={<FileExcelOutlined />}
              block
            >
              Xuất báo cáo
            </Button>
          </div>
        </Flex>
        <div className="table-responsive">
          {reportingData && (
            <div className="table-responsive">
              <div className="ant-table ant-table-bordered">
                <div className="ant-table-container">
                  <div className="ant-table-content">
                    <table>
                      <thead className="ant-table-thead">
                        <tr>
                          <th
                            rowSpan={2}
                            className="ant-table-cell"
                            style={{ width: 25 }}
                          >
                            #
                          </th>
                          <th
                            rowSpan={2}
                            className="ant-table-cell"
                            style={{ width: 220 }}
                          >
                            Họ và tên
                          </th>
                          <th rowSpan={2} className="ant-table-cell">
                            Tên đăng nhập
                          </th>
                          <th rowSpan={2} className="ant-table-cell">
                            Lớp
                          </th>
                          {reportingData.exam.examItems.map((item) => (
                            <th colSpan={3}>{item.name}</th>
                          ))}
                          {/* <th
                            rowSpan={2}
                            className="ant-table-cell"
                            style={{ width: 60 }}
                          ></th> */}
                        </tr>
                        <tr>
                          {reportingData.exam.examItems.map((item) => (
                            <>
                              <th className="ant-table-cell">Điểm lớn nhất</th>
                              <th className="ant-table-cell">Số lần thi</th>
                              <th className="ant-table-cell">Trạng thái</th>
                            </>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="ant-table-tbody">
                        {reportingData.userAttemptRecords.map(
                          (userAttemptRecord, index) => {
                            return (
                              <tr
                                className="ant-table-row"
                                key={`tr-ans-content-${userAttemptRecord.id}`}
                              >
                                <td className="ant-table-cell ">{index + 1}</td>
                                <td className="ant-table-cell ">
                                  {userAttemptRecord.name}
                                </td>
                                <td className="ant-table-cell ">
                                  {userAttemptRecord.userName}
                                </td>
                                <td className="ant-table-cell ">
                                  {userAttemptRecord.organizationName}
                                </td>
                                {userAttemptRecord.examItemAttemptRecords.map(
                                  (item) => (
                                    <>
                                      <td className="ant-table-cell ">
                                        {item.totalAttempt}
                                      </td>
                                      <td className="ant-table-cell ">
                                        {item.maxScore}
                                      </td>
                                      <td className="ant-table-cell ">
                                        {item.isPassed.toString()}
                                      </td>
                                    </>
                                  )
                                )}
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default ExamReport;
