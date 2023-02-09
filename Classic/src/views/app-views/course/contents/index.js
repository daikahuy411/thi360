import React, { useState, useEffect } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory, Link } from "react-router-dom";
import ExamItemApi from "api/exam-item-api";
import moment from "moment";
import {
  Tree,
  Result,
  Card,
  Button,
  Modal,
  message,
  Col,
  Row,
  Radio,
  Empty,
} from "antd";
import ContentEdit from "./edit";
import InnerAppLayout from "layouts/inner-app-layout";
import CourseApi from "api/course-api";

const { confirm } = Modal;

const CourseContents = (props) => {
  const [treeData, setTreeData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [onEditing, setOnEditing] = useState(false);
  const [item, setItem] = useState(null);
  const { confirm } = Modal;

  const { param } = props;

  let history = useHistory();

  const fetchData = (param) => {
    const { id } = param;
    new CourseApi().getCourseOnlines(id).then((response) => {
      setTreeData(response.data);
    });
  };

  useEffect(() => {
    fetchData(param);
  }, [param]);

  const add = () => {
    const { id } = param;
    setOnEditing(true);
    setItem({ id: 0, parentId: 0, courseId: id, order: 0 });
  };

  const addChild = () => {
    const { id } = param;
    setOnEditing(true);
    setItem({ id: 0, parentId: selectedNode.key, courseId: id });
  };

  const deleteContent = () => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new CourseApi()
          .deleteCourseContent(parseInt(selectedNode.key))
          .then((response) => {
            if (response.data.isSuccess) {
              message.success("Xóa thành công.");
              fetchData(param);
            } else {
              message.error(response.data.message);
            }
          });
      },
      onCancel() {},
    });
  };

  const onSelect = (selectedKeys, info) => {
    if (info.selectedNodes.length > 0) {
      setSelectedNode(info.selectedNodes[0]);
      setOnEditing(true);
      setItem({ id: info.selectedNodes[0].key });
    } else {
      setSelectedNode(null);
      setOnEditing(false);
    }
  };

  const onSaved = (item) => {
    fetchData(param);
    setOnEditing(false);
    setItem(null);
  };

  return (
    <Card bodyStyle={{ padding: 0 }}>
      <Row gutter={0}>
        <Col xs={24} sm={24} md={7}>
          <div style={{ width: "100%" }}>
            {treeData && treeData.length > 0 && (
              <Tree
                showIcon
                className="draggable-tree"
                autoExpandParent={true}
                defaultExpandAll={true}
                draggable={false}
                blockNode
                onSelect={onSelect}
                treeData={treeData}
              />
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={17}>
          <div
            className="p-4"
            style={{ borderLeft: "1px solid rgb(230, 235, 241)" }}
          >
            <div className="container-fluid">
              <Row gutter={16}>
                <Col span={24} style={{ textAlign: "right" }}>
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
                  &nbsp; &nbsp; &nbsp;
                  <Button
                    type="default"
                    icon={<DeleteOutlined />}
                    danger
                    size="small"
                    onClick={() => {
                      deleteContent();
                    }}
                    disabled={selectedNode == null}
                  ></Button>
                </Col>
              </Row>
              <br />
              {onEditing && item && (
                <ContentEdit
                  key={item.id}
                  item={item}
                  onSaved={(item) => {
                    onSaved(item);
                  }}
                />
              )}
              {onEditing == false && (
                <Result
                  icon={<InfoCircleFilled />}
                  subTitle="Chọn Nội dung để chỉnh sửa hoặc chức năng Thêm mới"
                />
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CourseContents;
