import React, { useState, useEffect } from "react";
import { Card, Button, Menu, Modal, message, Row, Col } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import CatalogEdit from "../edit";
import CatalogApi from "api/catalog-api";
import { CatalogType } from 'types/CatalogType';

const { confirm } = Modal;

const CatalogList = (props: any) => {
  const [onEditing, setOnEditing] = useState(false);
  const [item, setItem] = useState({ id: 0 });
  const [data, setData] = useState([]);
  const [hasChanged, setHasChanged] = useState(false);
  const [editMode, setEditMode] = useState("ADD");

  const fetchData = () => {
    const { type } = props;
    new CatalogApi(type as CatalogType)
      .getAll()
      .then((response) => {
        setData(response.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, [props]);

  const dropdownMenu = (row: any) => (
    <Menu>
      <Menu.Item onClick={() => editItem(row)} key={2}>
        <EditOutlined />
        <span className="ml-2">Sửa</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => deleteRow(row)} key={3} danger>
        <DeleteOutlined />
        <span className="ml-2">Xóa</span>
      </Menu.Item>
    </Menu>
  );

  const deleteRow = (row: any) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        const { type } = props;
        new CatalogApi(type as CatalogType)
          .delete(row).then((response) => {
            message.success("Xóa thành công.");
            fetchData();
          });
      },
      onCancel() { },
    });
  };

  const editItem = (item: any) => {
    setEditMode("EDIT");
    setOnEditing(true);
    setItem(item);
  };

  const add = () => {
    setEditMode("ADD");
    setItem({ id: 0 });
    setOnEditing(true);
  };

  const onEditClosed = () => {
    if (hasChanged) {
      fetchData();
      setHasChanged(false);
    }
    setOnEditing(false);
  };

  const onSaved = () => {
    fetchData();
  };

  return (
    <>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={() => add()}
            icon={<PlusOutlined />}
          >
            Thêm mới
          </Button>
        </Col>
      </Row>
      <br />
      <Card>
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
                        <th className="ant-table-cell">
                          Tên
                        </th>
                        <th className="ant-table-cell" style={{ width: 120 }}>
                          Thứ tự
                        </th>
                        <th className="ant-table-cell" style={{ width: 120 }}>
                          Kích hoạt
                        </th>
                        <th
                          className="ant-table-cell"
                          style={{ width: 60 }}
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                      {data.map((item: any, index: number) => {
                        return (
                          <tr
                            className="ant-table-row ant-table-row-level-0"
                            key={`tr-user-row-${item.id}`}
                          >
                            <td className="ant-table-cell ">{index + 1}</td>
                            <td className="ant-table-cell ">
                              {item.name}
                            </td>
                            <td className="ant-table-cell ">
                              {item.order}
                            </td>
                            <td className="ant-table-cell ">
                              {item.enabled && (
                                <span className="text-muted">Có</span>
                              )}
                              {!item.enabled && (
                                <span className="text-muted">Không</span>
                              )}
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
        )}
      </Card>
      {onEditing && (
        <CatalogEdit
          type={props.type}
          item={item}
          mode={editMode}
          onSaved={() => {
            onSaved();
          }}
          onClose={onEditClosed}
        />
      )}
    </>
  );
};

export default CatalogList;
