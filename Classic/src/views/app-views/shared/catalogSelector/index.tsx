import React, { useState, useEffect } from "react";
import CatalogApi from "api/catalog-api";
import { CatalogType } from 'types/CatalogType';
import { Select } from 'antd';

const { Option } = Select;

const CatalogSelector = (props: any) => {
  const [item, setItem] = useState({ id: 0 });
  const [editMode, setEditMode] = useState("ADD");
  const [data, setData] = useState([]);

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
  }, []);

  const handleChange = (value: any) => {
    if (props.onChange) {
      props.onChange(value);
    }
  };

  const onSaved = () => {
    fetchData();
  };

  return (
    <>
      <Select
        onChange={(value) => handleChange(value)}
        style={{ width: '100%' }}
        placeholder={`Chọn ${props.typeName ?? ''}`}
        value={props.value != null ? props.value : 0}
      >
        <Option key={`${props.type}-item-0`} value={0}>{`Chọn ${props.typeName ?? ''}`}</Option>
        {data && data.map((item: any) => (
          <Option key={`${props.type}-${item.id}`} value={item.id}>{item.name}</Option>
        ))}
      </Select>
    </>
  );
};

export default CatalogSelector;
