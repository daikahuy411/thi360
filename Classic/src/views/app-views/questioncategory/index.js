import { Tree, Card, Button, Modal, message, Col, Row } from "antd";
import React from "react";
import { DeleteOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import CategoryEdit from "./edit";
import { QuestionCategoryApi } from "api/catalog-api";
import InnerAppLayout from "layouts/inner-app-layout";

const { confirm } = Modal;

class QuestionCategory extends React.Component {
  state = {
    treeData: [],
    selectedNode: null,
    hasChanged: false,
    onEditing: false,
    item: null,
    parent: null,
  };

  fetchData = () => {
    QuestionCategoryApi.getCategoriesByCatalogId(
      this.props.match.params.catalogId
    ).then((response) => {
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
    this.setState({
      parent: null,
      onEditing: true,
    });
  };

  addChild = () => {
    this.setState({
      onEditing: true,
      parent: {
        id: this.state.selectedNode.key,
        name: this.state.selectedNode.title,
      },
      item: null,
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
      this.setState({ onEditing: true, selectedNode: info.selectedNodes[0] });
    } else {
      this.setState({ selectedNode: null, item: null });
    }
  };

  delete = (fetchData) => {
    var item = { id: this.state.selectedNode.key };
    // var refresh = this.fetchData();
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        QuestionCategoryApi.delete(item).then((response) => {
          message.success("Xóa thành công.");
          fetchData();
        });
      },
      onCancel() {},
    });
  };

  render() {
    return (
      <>
        <div className="my-4 container-fluid">
          <Row gutter={16}>
            <Col span={24} alignItems="right" flex={"flex-end"}>
              <InnerAppLayout
                sideContent={
                  <div className="w-100">
                    {this.state.treeData && this.state.treeData.length > 0 && (
                      <Tree
                        showIcon
                        autoExpandParent={true}
                        defaultExpandAll={true}
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

export default QuestionCategory;
