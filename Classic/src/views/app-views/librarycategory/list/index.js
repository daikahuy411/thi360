import { Tree, Card, Button, Modal, message, Col, Row } from "antd";
import React from "react";
import {
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import CategoryEdit from "../edit";
import { LibraryCategoryApi } from "api/catalog-api";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import InnerAppLayout from "layouts/inner-app-layout";

const { confirm } = Modal;

class CategoryList extends React.Component {
  state = {
    onEditing: false,
    treeData: [],
    selectedNode: null,
    hasChanged: false,
    item: null,
    parent: null,
  };

  fetchData = () => {
    LibraryCategoryApi.getAll().then((response) => {
      this.setState({ selectedNode: null, treeData: response.data });
    });
  };

  componentDidMount = () => {
    this.fetchData();
  };

  onSaved = () => {
    this.setState({ hasChanged: true });
  };

  add = () => {
    this.setState({ onEditing: true, item: { id: 0, parentId: 0, name: '' } });
  };

  addChild = (type) => {
    this.setState({
      onEditing: true,
      parent: {
        id: this.state.selectedNode.key,
        name: this.state.selectedNode.title,
      },
      item: { id: 0, type: 1, parentId: this.state.selectedNode.key, type: type },
    });
  };

  edit = () => {
    this.setState({
      item: { id: this.state.selectedNode.key },
      onEditing: true,
    });
  };

  closeAddOrEdit = () => {
    this.setState({ onEditing: false });
    if (this.state.hasChanged) {
      this.fetchData();
    }
  };

  onSelect = (selectedKeys, info) => {
    if (info.selectedNodes.length > 0) {
      this.setState({
        selectedNode: info.selectedNodes[0],
        item: { id: info.selectedNodes[0].key },
        onEditing: true,
      });
    } else {
      this.setState({ selectedNode: null, onEditing: false, item: null });
    }
  };

  delete = (fetchData) => {
    var item = { id: this.state.selectedNode.key };
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        LibraryCategoryApi.delete(item).then((response) => {
          message.success("Xóa thành công.");
          fetchData();
        });
      },
      onCancel() { },
    });
  };

  render() {
    return (
      <>
        <PageHeaderAlt className="border-bottom">
          <div className="container-fluid">
            <Flex justifyContent="between" alignItems="center">
              <h4 style={{ marginBottom: 0 }}>Danh mục Thư viện số </h4>
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
                    {this.state.treeData && this.state.treeData.length > 0 && (
                      <Tree
                        showIcon
                        // autoExpandParent={true}
                        // defaultExpandAll={true}
                        className="draggable-tree"
                        draggable={false}
                        blockNode
                        onSelect={this.onSelect}
                        treeData={this.state.treeData}
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
                            onClick={() => this.add()}
                            icon={<PlusOutlined />}
                          >
                            Thêm mới
                          </Button>
                          &nbsp;
                          <Button
                            type="default"
                            size="small"
                            onClick={() => this.addChild()}
                            icon={<PlusOutlined />}
                            disabled={this.state.selectedNode == null}
                          >
                            Thêm mới con
                          </Button>
                          &nbsp;
                          <Button
                            type="default"
                            onClick={this.edit}
                            size="small"
                            icon={<EditOutlined />}
                            disabled={this.state.selectedNode == null}
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
                              this.delete(() => this.fetchData());
                            }}
                            disabled={this.state.selectedNode == null}
                          >
                            Xóa
                          </Button>
                        </Col>
                      </Row>
                      <br />
                      {this.state.onEditing && (
                        <CategoryEdit
                          catalogId={this.props.match.params.catalogId}
                          key={this.state.item.id}
                          parent={this.state.parent}
                          item={this.state.item}
                          onSaved={this.onSaved}
                          onClose={this.closeAddOrEdit}
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
  }
}

export default CategoryList;
