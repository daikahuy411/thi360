import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Select,
  Button,
  Drawer,
  Checkbox,
  Input,
  Pagination,
} from "antd";
import Flex from "components/shared-components/Flex";
import Role, { getRoleName } from "enum/Role";
import CatalogSelector from "views/app-views/shared/catalogSelector";
import { CatalogType } from "types/CatalogType";

const { Search } = Input;
const { Option } = Select;

const Filter = (props) => {
  const [filters, setFilters] = useState(props.filters);

  const onOK = () => {
    if (props.onOK) {
      props.onOK(filters);
    }
  };

  const changeFilter = (fieldName, value) => {
    const currentFilters = Object.assign({}, filters);
    currentFilters[fieldName] = value;
    setFilters(currentFilters);
  };

  return (
    <Drawer
      title={"Tìm kiếm nâng cao"}
      width={420}
      onClose={props.onClose}
      visible={true}
      bodyStyle={{ paddingBottom: 0 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            onClick={onOK}
            style={{ marginRight: 8 }}
            type="primary"
            color="primary"
          >
            Đồng ý
          </Button>
        </div>
      }
    >
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Tên, số hiệu">
              <Input
                placeholder="Tìm kiếm"
                value={filters.keyWord}
                onChange={(e) => changeFilter("keyWord", e.target.value)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Loại văn bản">
              <Select
                defaultValue={-1}
                onChange={(value) => {
                  changeFilter("documentType", value);
                }}
                className="w-100"
                style={{ minWidth: 180 }}
                placeholder="Loại Văn bản"
              >
                <Option value={-1}>Tất cả loại</Option>
                <Option key={"0"} value={0}>
                  Văn bản nội bộ
                </Option>
                <Option key={"1"} value={1}>
                  Văn bản đến
                </Option>
                <Option key={"2"} value={2}>
                  Văn bản đi
                </Option>                
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Cơ quan ban hành">
              <CatalogSelector
                typeName="Cơ quan"
                value={filters.organizationCatalogId}
                onChange={(value) =>
                  changeFilter("organizationCatalogId", value)
                }
                type={CatalogType.DOCUMENT_ORGANIZATION}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Chủ đề">
              <CatalogSelector
                typeName="Chủ đề"
                value={filters.topicCatalogId}
                onChange={(value) => changeFilter("topicCatalogId", value)}
                type={CatalogType.DOCUMENT_TOPIC}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Lĩnh vực văn bản">
              <CatalogSelector
                typeName="Lĩnh vực"
                value={filters.areaCatalogId}
                onChange={(value) => changeFilter("areaCatalogId", value)}
                type={CatalogType.DOCUMENT_AREA}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Chức vụ người ký">
              <CatalogSelector
                typeName="Chức vụ"
                value={filters.positionCatalogId}
                onChange={(value) => changeFilter("positionCatalogId", value)}
                type={CatalogType.DOCUMENT_POSITION}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default Filter;
