import { Tree, Button, Modal, message, Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import { DeleteOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import CategoryEdit from "../edit";
import { CourseCategoryApi } from "api/catalog-api";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import InnerAppLayout from "layouts/inner-app-layout";

const { confirm } = Modal;

const CategoryList = (props) => {
  const [onEditing, setOnEditing] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hasChanged, setHasChanged] = useState(null);
  const [item, setItem] = useState(null);
  const [parent, setParent] = useState(null);

  const fetchData = () => {
    CourseCategoryApi.getAll().then((response) => {
      setSelectedNode(null);
      setTreeData(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSaved = () => {
    setHasChanged(true);
  };

  const add = () => {
    setOnEditing(true);
    setItem({ id: 0, parentId: 0, name: "" });
  };

  const addChild = (type) => {
    setOnEditing(true);
    setParent({
      id: selectedNode.key,
      name: selectedNode.title,
    });
    setItem({
      id: 0,
      type: 1,
      parentId: selectedNode.key,
      type: type,
    });
  };

  const edit = () => {
    setItem({ id: selectedNode.key });
    setOnEditing(true);
  };

  const closeAddOrEdit = () => {
    setOnEditing(false);
    if (hasChanged) {
      fetchData();
    }
  };

  const onSelect = (selectedKeys, info) => {
    if (info.selectedNodes.length > 0) {
      setItem({ id: info.selectedNodes[0].key });
      setSelectedNode(info.selectedNodes[0]);
      setOnEditing(true);
    } else {
      setSelectedNode(null);
      setOnEditing(false);
      setItem(null);
    }
  };

  const remove = (fetchData) => {
    var item = { id: selectedNode.key };
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        CourseCategoryApi.delete(item).then((response) => {
          message.success("Xóa thành công.");
          fetchData();
        });
      },
      onCancel() {},
    });
  };

  return (
    <>
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center">
            <h4 style={{ marginBottom: 0 }}>Danh mục Khóa học </h4>
            <div></div>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className="my-4 container-fluid">
        <Row gutter={16}>
          <Col span={24} alignItems="right" flex={"flex-end"}>
            <InnerAppLayout
              sideContent={
                <div className="w-100">
                  {treeData && treeData.length > 0 && (
                    <Tree
                      showIcon
                      // autoExpandParent={true}
                      // defaultExpandAll={true}
                      className="draggable-tree"
                      draggable={false}
                      blockNode
                      onSelect={onSelect}
                      treeData={treeData}
                    />
                  )}
                </div>
              }
              mainContent={
                <div className="p-4">
                  <div className="container-fluid">
                    <Row gutter={16}>
                      <Col span={24}>
                        <Button
                          type="default"
                          size="small"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Thêm mới
                        </Button>
                        &nbsp;
                        <Button
                          type="default"
                          size="small"
                          onClick={() => addChild()}
                          icon={<PlusOutlined />}
                          disabled={selectedNode == null}
                        >
                          Thêm mới con
                        </Button>
                        &nbsp;
                        <Button
                          type="default"
                          onClick={edit}
                          size="small"
                          icon={<EditOutlined />}
                          disabled={selectedNode == null}
                        >
                          Sửa
                        </Button>
                        &nbsp;
                        <Button
                          type="default"
                          icon={<DeleteOutlined />}
                          danger
                          size="small"
                          onClick={() => {
                            remove();
                          }}
                          disabled={selectedNode == null}
                        >
                          Xóa
                        </Button>
                      </Col>
                    </Row>
                    <br />
                    {onEditing && (
                      <CategoryEdit
                        catalogId={props.match.params.catalogId}
                        key={item.id}
                        parent={parent}
                        item={item}
                        onSaved={onSaved}
                        onClose={closeAddOrEdit}
                      />
                    )}
                  </div>
                </div>
              }
              sideContentWidth={500}
              sideContentGutter={false}
              border
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CategoryList;
