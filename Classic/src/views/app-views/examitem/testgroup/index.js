import React, { useState, useEffect } from "react";
import { Dropdown, Row, Col, Modal, message, Card, Button, Menu, Tooltip } from "antd";
import {
  PlusOutlined,
  SwapOutlined,
  EditOutlined,
  DownOutlined,
  DeleteOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import SectionEdit from "./section/edit";
import TestGroupSectionApi from "api/test-group-section-api";
import Flex from "components/shared-components/Flex";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import SectionItemEdit from "./sectionitem/edit";
import TestGroupApi from "api/test-group-api";
import TestGroupSectionItemApi from "api/test-group-section-item-api";
import { InfoCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const TestGroupField = (props) => {
  const [editingSection, setEditingSection] = useState(null);
  const [editingSectionItem, setEditingSectionItem] = useState(null);
  const [onEditingSection, setOnEditingSection] = useState(false);
  const [onEditingSectionItem, setOnEditingSectionItem] = useState(false);
  const [testGroup, setTestGroup] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    new TestGroupApi().get(props.testGroupId).then((response) => {
      setTestGroup(response.data);
    });
  };

  const deleteItem = (row) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new TestGroupSectionItemApi().delete(row).then((response) => {
          message.success("Xóa thành công.");
          fetchData();
        });
      },
      onCancel() {},
    });
  };

  const editItem = (row) => {
    setEditingSectionItem(row);
    setOnEditingSectionItem(true);
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item
        onClick={() => editItem(row)}
        key={`sectionItemMenu-${row.id}-edit`}
      >
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Sửa</span>
        </Flex>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key={`sectionItemMenu-${row.id}-delete`}
        onClick={() => deleteItem(row)}
        danger
      >
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">Xóa</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const sectionItemMenu = (section) => (
    <Menu>
      <Menu.Item
        key={`sectionMenu-${section.id}-random`}
        icon={<SwapOutlined />}
        onClick={() => {
          setEditingSectionItem({
            id: 0,
            type: 4,
            testGroupSectionId: section.id,
            testGroupId: props.testGroupId,
          });
          setOnEditingSectionItem(true);
        }}
      >
        Bốc câu hỏi ngẫu nhiên
      </Menu.Item>
      <Menu.Item
        key={`sectionMenu-${section.id}-specific`}
        icon={<RetweetOutlined />}
        onClick={() => {
          setEditingSectionItem({
            id: 0,
            type: 2,
            testGroupSectionId: section.id,
            testGroupId: props.testGroupId,
          });
          setOnEditingSectionItem(true);
        }}
      >
        Bốc câu hỏi chỉ định
      </Menu.Item>
    </Menu>
  );

  const sectionMenu = (item) => {
    return (
      <Menu>
        <Menu.Item
          key={`sectionMenu-${item.id}-edit`}
          onClick={() => {
            editSection(item);
          }}
        >
          <Flex alignItems="center">
            <EditOutlined />
            <span className="ml-2">Sửa</span>
          </Flex>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          danger
          key={`sectionMenu-${item.id}-delete`}
          onClick={() => {
            deleteSection(item.id);
          }}
        >
          <Flex alignItems="center">
            <DeleteOutlined />
            <span className="ml-2">Xóa</span>
          </Flex>
        </Menu.Item>
      </Menu>
    );
  };

  const editSection = (item) => {
    setEditingSection(item);
    setOnEditingSection(true);
  };

  const deleteSection = (id) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new TestGroupSectionApi().delete({ id: id }).then((response) => {
          message.success("Xóa thành công.");
          fetchData();
        });
      },
      onCancel() {},
    });
  };

  return (
    <>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3"></div>
          <div className="mb-3"></div>
        </Flex>
        <div>
          <Button
            type="primary"
            onClick={() => {
              const item = { id: 0, name: "", testGroupId: props.testGroupId };
              setEditingSection(item);
              setOnEditingSection(true);
            }}
          >
            <PlusOutlined /> Thêm Phần
          </Button>
        </div>
      </Flex>
      <br />
      {testGroup &&
        testGroup.sections.map((section, index) => (
          <Card
            key={`card-section-${section.id}`}
            title={section.name}
            extra={<EllipsisDropdown menu={sectionMenu(section)} />}
            actions={[
              <Dropdown overlay={sectionItemMenu(section)}>
                <Button>
                  <PlusOutlined /> Thêm cấu hình bốc câu hỏi
                  <DownOutlined />
                </Button>
              </Dropdown>,
            ]}
          >
            {section.items.length > 0 && (
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
                              style={{ width: 220 }}
                            >
                              Loại
                            </th>
                            <th
                              className="ant-table-cell"
                              style={{ width: 180 }}
                            >
                              Hệ số điểm &nbsp;&nbsp;&nbsp;&nbsp;
                              <Tooltip title="Hệ số điểm để xác định phần chiếm bao nhiêu điểm so với Điểm tổng của Môn thi.">
                                <InfoCircleOutlined
                                  style={{ color: "rgba(0,0,0,.45)" }}
                                />
                              </Tooltip>
                            </th>
                            <th
                              className="ant-table-cell"
                              style={{ width: 180 }}
                            >
                              Số lượng Câu hỏi
                            </th>
                            <th
                              className="ant-table-cell"
                              style={{ width: 60 }}
                            ></th>
                          </tr>
                        </thead>
                        <tbody className="ant-table-tbody">
                          {section.items.map((item, index) => {
                            return (
                              <tr
                                className="ant-table-row"
                                key={`tr-section-item-${item.id}`}
                              >
                                <td className="ant-table-cell ">{index + 1}</td>
                                <td className="ant-table-cell ">
                                  <a onClick={() => editItem(item)}>
                                    {item.name}
                                  </a>
                                </td>
                                <td className="ant-table-cell ">
                                  {item.typeName}
                                </td>
                                <td className="ant-table-cell ">
                                  <b>{item.scoreRatio}</b>
                                  &nbsp;
                                  <br />
                                  (={item.score} điểm)
                                </td>
                                <td className="ant-table-cell ">
                                  <b>{item.numberOfQuestion}</b> &nbsp;
                                  <br />
                                  (={item.scorePerQuestion} điểm/1 câu)
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
          </Card>
        ))}
      {onEditingSection && editingSection && (
        <SectionEdit
          item={editingSection}
          onSaved={() => {
            fetchData();
          }}
          onClose={() => {
            setOnEditingSection(false);
          }}
        />
      )}
      {onEditingSectionItem && (
        <SectionItemEdit
          item={editingSectionItem}
          onSaved={() => {
            fetchData();
          }}
          onClose={() => {
            setOnEditingSectionItem(false);
          }}
        />
      )}
    </>
  );
};

export default TestGroupField;
