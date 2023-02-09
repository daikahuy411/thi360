import React, { useState, useEffect } from "react";
import { Form, Row, Col, Select, Input, Button, Drawer } from "antd";
import { TreeSelect } from "antd";
import OrganizationApi from "api/organization-api";

const { Option } = Select;

const OrganizationTree = (props) => {
    const [data, setData] = useState(null);
    const [selectedNodeId, setSelectedNodeId] = useState(0);

    const fetchData = () => {
        new OrganizationApi().getOrganizationTree().then((response) => {
            setData(response.data);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (value) => {
        setSelectedNodeId(value);
        if (props.onChange) {
            props.onChange(value);
        }
    };

    return (
        <>
            {data && (
                <TreeSelect
                    style={{ width: "100%" }}
                    treeData={data}
                    className="w-100"
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    placeholder="Chọn Đơn vị"
                    allowClear
                    value={props.value ? props.value : ""}
                    treeDefaultExpandAll
                    onChange={(value) => handleChange(value)}
                ></TreeSelect>
            )}
        </>
    );
};

export default OrganizationTree;
