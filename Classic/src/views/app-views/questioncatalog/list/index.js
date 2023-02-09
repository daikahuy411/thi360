import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import {
  Button,
  Row,
  Col,
  Tooltip,
  Menu,
  Card,
  Modal,
  Pagination,
  message,
  Input,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FolderOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import QuestionCatalogEdit from "../edit";
import QuestionCatalogApi from "api/question-catalog-api";
import { useHistory, Link } from "react-router-dom";

const { confirm } = Modal;
const { Search } = Input;

const ItemAction = ({ item, onEdit, onDelete, onNavigateToQuestionBank }) => (
  <EllipsisDropdown
    menu={
      <Menu>
        <Menu.Item key="0" onClick={() => onNavigateToQuestionBank(item)}>
          <QuestionCircleOutlined />
          <span className="ml-2">Quản lý Câu hỏi</span>
        </Menu.Item>
        <Menu.Item key="1" onClick={() => onEdit(item)}>
          <EditOutlined />
          <span className="ml-2">Sửa</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" onClick={() => onDelete(item.id)} danger>
          <DeleteOutlined />
          <span className="ml-2">Xóa</span>
        </Menu.Item>
      </Menu>
    }
  />
);

const ItemHeader = ({ name, category, id }) => (
  <div style={{ minHeight: 50 }}>
    <div className="mb-0">
      <Link
        to={`/lms/modules/mystudies/exams/questioncatalogs/questions/list/${id}`}
      >
        {name}
      </Link>
    </div>
    <span className="text-muted">{category}</span>
  </div>
);

const ItemInfo = ({ item }) => (
  <Flex alignItems="center">
    <div className="mr-3">
      <Tooltip title="Ngân hàng câu hỏi">
        <QuestionCircleOutlined className="text-muted font-size-md" />
        <span className="ml-1 text-muted">{item.totalQuestion} câu hỏi</span>
      </Tooltip>
    </div>
    <div className="mr-3">
      <Tooltip title="Danh mục câu hỏi">
        <FolderOutlined className="text-muted font-size-md" />
        <span className="ml-1 text-muted">{item.totalCategory} danh mục</span>
      </Tooltip>
    </div>
  </Flex>
);

const GridItem = ({ item, onEdit, onDelete, onNavigateToQuestionBank }) => (
  <Card>
    <Flex alignItems="center" justifyContent="between">
      <ItemHeader name={item.name} id={item.id} category={item.category} />
      <ItemAction
        item={item}
        onNavigateToQuestionBank={() => onNavigateToQuestionBank(item)}
        onEdit={() => onEdit(item)}
        onDelete={() => {
          onDelete(item);
        }}
      />
    </Flex>
    <div className="mt-2">
      <ItemInfo item={item} />
    </div>
  </Card>
);

const List = () => {
  const [onEditing, setOnEditing] = useState(false);
  const [data, setData] = useState(null);
  const [item, setItem] = useState(null);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  let history = useHistory();

  const deleteItem = (item) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new QuestionCatalogApi().delete(item).then((response) => {
          message.success("Xóa thành công.");
          fetchData();
        });
      },
      onCancel() {},
    });
  };

  const goToQuestionBank = (item) => {
    history.push(
      `/lms/modules/mystudies/exams/questioncatalogs/questions/${item.id}`
    );
  };

  const editItem = (item) => {
    setOnEditing(true);
    setItem(item);
  };

  const add = () => {
    setOnEditing(true);
    setItem(null);
  };

  const onSaved = () => {
    fetchData();
    setOnEditing(false);
  };

  const fetchData = () => {
    new QuestionCatalogApi().getAll().then((response) => {
      setData(response.data);
    });
  };

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  useEffect(() => {
    fetchData();
  }, [page, keyword]);

  return (
    <>
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center">
            <h4 style={{ marginBottom: 0 }}>Bộ Câu hỏi</h4>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className={`my-4 container-fluid`}>
        <Row gutter={16}>
          <Col span={12}>
            <Search
              placeholder="Tìm kiếm"
              onSearch={(value) => {
                setPage(1);
                setKeyword(value);
              }}
              style={{ width: 300 }}
            />
          </Col>
          <Col xs={12} sm={12} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              onClick={() => {
                add();
              }}
              className="ml-2"
            >
              <PlusOutlined />
              <span>Thêm mới</span>
            </Button>
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          {data &&
            data.map((elm) => (
              <Col xs={24} sm={24} lg={8} xl={8} xxl={6} key={elm.id}>
                <GridItem
                  item={elm}
                  onNavigateToQuestionBank={(item) => goToQuestionBank(item)}
                  onEdit={(item) => editItem(item)}
                  onDelete={(item) => deleteItem(item)}
                />
              </Col>
            ))}
        </Row>
        <Row gutter={16}>
          <Col span={24} alignItems="right" flex={"flex-end"}>
            <Pagination
              showSizeChanger={false}
              className="ant-table-pagination-right ant-table-pagination"
              total={totalItem}
              defaultCurrent={page}
              onChange={pageChanged}
              pageSize={10}
            />
          </Col>
        </Row>
      </div>
      {onEditing && (
        <QuestionCatalogEdit
          item={item}
          onSaved={() => {
            onSaved();
          }}
          onClose={() => setOnEditing(false)}
        />
      )}
    </>
  );
};

export default List;
