import React, { useState, useEffect } from "react";
import { Card, Modal, message, Select, Input, Button, Badge, Menu } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import UserDialog from "views/app-views/shared/userdialog";
import ExamUserApi from "api/exam-user-api";
import OrganizationApi from "api/organization-api";
import moment from "moment";
import UserAttemptHistoryDialog from "../userattempthistory";

const { Option } = Select;
const { confirm } = Modal;

const UserList = (props) => {
  let history = useHistory();
  const [data, setData] = useState(null);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [orgs, setOrgs] = useState([]);
  const [orgId, setOrgId] = useState(0);
  const [userHistoryDialog, setUserHistoryDialog] = useState(false);
  const [userId, setUserId] = useState("");

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => showUserHistory(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">Xem lịch sử thi</span>
        </Flex>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => deleteExamUser(row)} danger>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">Xóa</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const getAllOrg = () => {
    var orgApi = new OrganizationApi();
    orgApi.getAll().then((response) => {
      setOrgs(response.data);
    });
  };

  const showUserHistory = (row) => {
    setUserHistoryDialog(true);
    setUserId(row.userId);
  };

  const deleteExamUser = (row) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new ExamUserApi().delete(row).then((response) => {
          message.success("Xóa thành công.");
          fetchData();
        });
      },
      onCancel() {},
    });
  };

  const onSelectedUsers = (userIds) => {
    new ExamUserApi().addUsersToExam(props.examId, userIds).then((response) => {
      message.success("Cập nhật thành công.");
      fetchData();
    });
  };

  const fetchData = () => {
    new ExamUserApi().getExamUsersByExam(props.examId).then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, [props.examId]);

  useEffect(() => {
    getAllOrg();
  }, []);

  const onSearch = (e) => {};

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <Flex className="mb-1" mobileFlex={false}>
            {/* <div className="mr-md-3 mb-3">
              <Input
                placeholder="Tìm theo tên đăng nhập"
                prefix={<SearchOutlined />}
                onChange={(e) => onSearch(e)}
              />
            </div> */}
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
          </Flex>
          <div>
            <Button
              type="primary"
              onClick={() => {
                setOpenUserDialog(true);
              }}
              icon={<PlusCircleOutlined />}
              block
            >
              Thêm thí sinh
            </Button>
          </div>
        </Flex>
        <div className="table-responsive">
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
                          <th className="ant-table-cell" style={{ width: 220 }}>
                            Họ và tên
                          </th>
                          <th className="ant-table-cell">Tên đăng nhập</th>
                          <th className="ant-table-cell">Lớp</th>
                          <th className="ant-table-cell">Email</th>
                          <th className="ant-table-cell">Ngày tham gia</th>
                          <th
                            className="ant-table-cell"
                            style={{ width: 60 }}
                          ></th>
                        </tr>
                      </thead>
                      <tbody className="ant-table-tbody">
                        {data &&
                          data.map((examUser, index) => {
                            return (
                              <tr
                                className="ant-table-row"
                                key={`tr-ans-content-${examUser.id}`}
                              >
                                <td className="ant-table-cell ">{index + 1}</td>
                                <td className="ant-table-cell ">
                                  {examUser.name}
                                </td>
                                <td className="ant-table-cell ">
                                  {examUser.userName}
                                </td>
                                <td className="ant-table-cell ">
                                  {examUser.organizationName}
                                </td>
                                <td className="ant-table-cell ">
                                  {examUser.email}
                                </td>
                                <td className="ant-table-cell ">
                                  {moment(examUser.createdTime).format(
                                    "YYYY-MM-DD"
                                  )}
                                </td>
                                <td className="ant-table-cell ">
                                  <div className="text-right">
                                    <EllipsisDropdown
                                      menu={dropdownMenu(examUser)}
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
        </div>
      </Card>
      {openUserDialog && (
        <UserDialog
          onOK={onSelectedUsers}
          onClose={() => {
            setOpenUserDialog(false);
          }}
        />
      )}
      {userHistoryDialog && (
        <UserAttemptHistoryDialog
          onClose={() => setUserHistoryDialog(false)}
          examId={props.examId}
          userId={userId}
        />
      )}
    </>
  );
};

export default UserList;
