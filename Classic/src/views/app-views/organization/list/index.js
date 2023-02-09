import { Tree, Card, Button, Modal, message, Col, Row } from "antd";
import React from "react";
import { DeleteOutlined, PlusOutlined, HomeOutlined, TeamOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import OrganizationEdit from "../edit";
import OrganizationApi from "api/organization-api";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import InnerAppLayout from "layouts/inner-app-layout";

const { confirm } = Modal;

class OrganizationList extends React.Component {
  state = {
    onEditing: false,
    treeData: [],
    selectedNode: null,
    hasChanged: false,
    item: null,
    parent: null,
  };

  fetchData = () => {
    new OrganizationApi().searchesOrganizations().then((response) => {
      let treeNodes = [];
      response.data.map((item) => {
        treeNodes.push(this.populateNode(item));
      });
      this.setState({ selectedNode: null, treeData: treeNodes });
    });
  };

  populateNode = (node) => {
    var treeNode = {
      title: node.name,
      key: node.id,
      children: [],
    };
    if (node.isSite === true) {
      treeNode.icon = <HomeOutlined />;
    }
    if (node.type === 2) {
      treeNode.icon = <TeamOutlined />;
    }
    if (node.children && node.children.length > 0) {
      node.children.map((item) => {
        treeNode.children.push(this.populateNode(item));
      });
    }
    return treeNode;
  };

  componentDidMount = () => {
    this.fetchData();
  };

  onSaved = () => {
    this.fetchData();
  };

  add = () => {
    this.setState({ onEditing: true, item: { id: 0, type: 1, parentId: 0, name: '' } });
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

  closeAddOrEdit = () => {
    this.setState({ onEditing: false });
  };

  onSelect = (selectedKeys, info) => {
    if (info.selectedNodes.length > 0) {
      this.setState({
        selectedNode: info.selectedNodes[0],
        item: { id: info.selectedNodes[0].key },
        onEditing: true,
      });
    } else {
      this.setState({ onEditing: false, selectedNode: null, item: null });
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
        new OrganizationApi().delete(item).then((response) => {
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
              <h4 style={{ marginBottom: 0 }}>Đơn vị</h4>
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
                        autoExpandParent={true}
                        defaultExpandAll={false}
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
                            Thêm Đơn vị mới
                          </Button>
                          &nbsp;
                          <Button
                            type="default"
                            size="small"
                            onClick={() => this.addChild(1)}
                            icon={<PlusOutlined />}
                            disabled={this.state.selectedNode == null}
                          >
                            Thêm Đơn vị con
                          </Button>
                          &nbsp;
                          <Button
                            type="default"
                            size="small"
                            onClick={() => this.addChild(2)}
                            icon={<PlusOutlined />}
                            disabled={this.state.selectedNode == null}
                          >
                            Thêm Lớp học
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
                      {this.state.onEditing && this.state.item && (
                        <OrganizationEdit
                          key={this.state.item.id}
                          catalogId={this.props.match.params.catalogId}
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

export default OrganizationList;
