import React, { useState, useEffect } from "react";
import { Card, Modal, message, Button, Menu } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ThunderboltOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import TestApi from "api/test-api";
import moment from "moment";
import GenerateTestDialog from "./gen";
import TestEdit from "./edit";

const { confirm } = Modal;

const TestList = (props) => {
  const [data, setData] = useState(null);
  const [openGenTest, setOpenGenTest] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [onEditingTest, setOnEditingTest] = useState(false);

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => editTest(row)} key={1}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Sửa</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => previewTest(row)} key={1}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">Xem</span>
        </Flex>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => deleteTest(row)} danger key={2}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">Xóa</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const deleteTest = (row) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new TestApi().delete(row).then((response) => {
          message.success("Xóa thành công.");
          getTests();
        });
      },
      onCancel() {},
    });
  };

  const previewTest = (row) => {
    window.open(`/testing/testreview/${row.id}`, '_testreview');
  };

  const editTest = (row) => {
    setEditingTest(row);
    setOnEditingTest(true);
  };

  const getTests = () => {
    new TestApi().getTests(props.testGroupId).then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    getTests();
  }, []);

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <Flex className="mb-1" mobileFlex={false}>
            <div className="mr-md-3 mb-3"></div>
            <div className="mb-3"></div>
          </Flex>
          <div>
            <Button
              type="primary"
              onClick={() => setOpenGenTest(true)}
              icon={<ThunderboltOutlined />}
              block
            >
              Sinh đề
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
                      <th className="ant-table-cell" style={{ width: 150 }}>
                        Số câu hỏi
                      </th>
                      <th className="ant-table-cell" style={{ width: 150 }}>
                        Số câu trả lời
                      </th>
                      <th className="ant-table-cell" style={{ width: 180 }}>
                        Ngày tạo
                      </th>
                      <th className="ant-table-cell" style={{ width: 60 }}></th>
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                    {data &&
                      data.map((test, index) => {
                        return (
                          <tr
                            className="ant-table-row"
                            key={`tr-ans-content-${test.id}`}
                          >
                            <td className="ant-table-cell ">{index + 1}</td>
                            <td className="ant-table-cell ">{test.name}</td>
                            <td className="ant-table-cell ">
                              {test.totalQuestion}
                            </td>
                            <td className="ant-table-cell ">
                              {test.totalAnswer}
                            </td>
                            <td className="ant-table-cell ">
                              {moment(test.createdTime).format(
                                "YYYY-MM-DD HH:mm"
                              )}
                            </td>
                            <td className="ant-table-cell ">
                              <div className="text-right">
                                <EllipsisDropdown menu={dropdownMenu(test)} />
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
      {openGenTest && (
        <GenerateTestDialog
          onGenerated={() => {
            getTests();
            setOpenGenTest(false);
          }}
          testGroupId={props.testGroupId}
          onClose={() => setOpenGenTest(false)}
        />
      )}
      {onEditingTest && editingTest && (
        <TestEdit
          item={editingTest}
          onSaved={() => {
            getTests();
          }}
          onClose={() => {
            setOnEditingTest(false);
          }}
        />
      )}
    </>
  );
};

export default TestList;
