import React, { useState, useEffect } from "react";
import { Card, Button, Menu, Modal, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory, Link } from "react-router-dom";
import ExamItemApi from "api/exam-item-api";
import moment from "moment";

const { confirm } = Modal;

const ExamItemList = (props) => {
  let history = useHistory();
  const [data, setData] = useState(null);
  const { param } = props;

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => editExamItem(row)} key={0}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Sửa</span>
        </Flex>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => deleteExamItem(row)} key={1} danger>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">Xóa</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const deleteExamItem = (row) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new ExamItemApi().delete({ id: row.id }).then((response) => {
          message.success("Xóa thành công.");
          fetchData();
        });
      },
      onCancel() {},
    });
  };

  const editExamItem = (row) => {
    history.push(`/lms/modules/assignment/examitems/edit/${row.id}`);
  };

  const addExamItem = () => {
    const { id } = param;
    history.push(`/lms/modules/assignment/examitems/add/${id}`);
  };

  const fetchData = () => {
    const { id } = param;
    var examItemApi = new ExamItemApi();
    examItemApi.getByExamId(id).then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3"></div>
          <div className="mb-3"></div>
        </Flex>
        <div>
          <Button
            type="primary"
            onClick={() => {
              addExamItem();
            }}
            icon={<PlusOutlined />}
            block
          >
            Tạo mới
          </Button>
        </div>
      </Flex>
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
                    <th className="ant-table-cell">Tên</th>
                    <th className="ant-table-cell" style={{ width: 140 }}>Điểm yêu cầu</th>
                    <th className="ant-table-cell" style={{ width: 200 }}>Số lần thi cho phép</th>
                    <th className="ant-table-cell" style={{ width: 120 }}>Số đề thi</th>
                    <th className="ant-table-cell" style={{ width: 120 }}>
                      Ngày tạo
                    </th>
                    <th className="ant-table-cell" style={{ width: 60 }}></th>
                  </tr>
                </thead>
                <tbody className="ant-table-tbody">
                  {data &&
                    data.map((item, index) => {
                      return (
                        <tr
                          className="ant-table-row"
                          key={`tr-ans-content-${item.id}`}
                        >
                          <td className="ant-table-cell ">{index + 1}</td>
                          <td className="ant-table-cell ">
                            <Link to={`/lms/modules/assignment/examitems/edit/${item.id}`}>
                              {item.name}
                            </Link>
                          </td>
                          <td className="ant-table-cell ">
                            {item.requiredScore}
                          </td>
                          <td className="ant-table-cell ">
                            {item.numberOfExamAttemptAllow}
                          </td>
                          <td className="ant-table-cell ">
                            {item.numberOfExamAttemptAllow}
                          </td>
                          <td className="ant-table-cell ">
                            {moment(item.createdTime).format("YYYY-MM-DD")}
                          </td>
                          <td className="ant-table-cell ">
                            <div className="text-right">
                              <EllipsisDropdown menu={dropdownMenu(item)} />
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
    </Card>
  );
};

export default ExamItemList;
