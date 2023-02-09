import React, { useState, useEffect } from "react";
import { Form, Row, Col, Select, Input, Button, Drawer } from "antd";
import { TreeSelect } from "antd";

const { Option } = Select;

const ContentTree = (props) => {
  const [data, setData] = useState(props.data);
  const [selectedNodeId, setSelectedNodeId] = useState(0);

  const handleChange = (value) => {
    setSelectedNodeId(value);
    if (props.onChange) {
      props.onChange(parseInt(value));
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
          placeholder="Chọn Nội dung cha"
          allowClear
          value={props.value ? props.value : ""}
          treeDefaultExpandAll
          onChange={(value) => handleChange(value)}
        ></TreeSelect>
      )}
    </>
  );
};

export default ContentTree;
