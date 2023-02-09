import React, { useState, useEffect } from "react";
import { Input, Row, Col, Card, Form, Checkbox, message, Button, Menu, Modal, DatePicker, Descriptions } from "antd";
import {
    DeleteOutlined,
    PlusOutlined
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import UserDialog from "views/app-views/shared/userdialog";
import Role from "enum/Role";

const UserRoles = (props) => {
    const [items, setItems] = useState(props.items);
    const [openUserDialog, setOpenUserDialog] = useState(false);

    const onSelectedUsers = (selectedUsers) => {
        if (!selectedUsers || selectedUsers.length == 0) return;

        let newItems = items || [];
        selectedUsers.map((u) => {
            newItems.push(u);
        });
        setItems(newItems);
        setOpenUserDialog(false);
        props.onChanged(newItems);
    };

    const removeUser = (user) => {
        let newItems = items || [];
        newItems = newItems.filter(x => x.id != user.id);
        setItems(newItems);
        props.onChanged(newItems);
    };

    useEffect(() => {
        setItems(props.items);
    }, [props.items]);

    return (
        <>
            <Row>
                <Col span={24}>
                    <Form.Item>
                        <Card title={props.typeName}
                            extra={<Button size="sm" type="default"
                                onClick={() => { setOpenUserDialog(true) }}
                                icon={<PlusOutlined />}>Chọn {props.typeName}</Button>}
                        >
                            {items.length > 0 && (
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
                                                                        style={{ width: 240 }}
                                                                    >
                                                                        Tên đăng nhập
                                                                    </th>
                                                                    <th
                                                                        className="ant-table-cell"
                                                                        style={{ width: 120 }}
                                                                    >
                                                                        Đơn vị
                                                                    </th>
                                                                    <th
                                                                        className="ant-table-cell"
                                                                        style={{ width: 80 }}
                                                                    >
                                                                        Thao tác
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="ant-table-tbody">
                                                                {items.map((user, index) => {
                                                                    return (
                                                                        <tr
                                                                            key={`tr-administrator-${user.id}`}
                                                                            className="ant-table-row ant-table-row-level-0"
                                                                        >
                                                                            <td className="ant-table-cell "
                                                                                style={{ width: 25 }}
                                                                            >
                                                                                {index + 1}
                                                                            </td>
                                                                            <td className="ant-table-cell ">
                                                                                {user.userName}
                                                                                <br />
                                                                                {user.fullName}
                                                                                <br />
                                                                                {user.email}
                                                                            </td>
                                                                            <td className="ant-table-cell ">
                                                                                {user.organizationName}
                                                                            </td>
                                                                            <td className="ant-table-cell ">
                                                                                <div className="text-right">
                                                                                    <Button size="small" onClick={() => { removeUser(user) }}>
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
                        </Card>
                    </Form.Item>
                    {openUserDialog && (
                        <UserDialog
                            onOK={onSelectedUsers}
                            role={props.role}
                            onClose={() => {
                                setOpenUserDialog(false);
                            }}
                        />
                    )}
                </Col>
            </Row>
        </>
    );
};

export default UserRoles;
