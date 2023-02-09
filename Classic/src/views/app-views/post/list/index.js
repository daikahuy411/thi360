import React, { useState, useEffect } from "react";
import {
  Card,
  Pagination,
  Form,
  Tabs,
  Col,
  Row,
  Input,
  Modal,
  message,
  Button,
  Menu,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory, Link } from "react-router-dom";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import PostApi from "api/post-api";
import { PostCategoryApi } from "api/catalog-api";
import moment from "moment";
import { TreeSelect } from "antd";
import Item from "antd/lib/list/Item";

const { confirm } = Modal;
const { Search } = Input;

const PostList = (props) => {
  let history = useHistory();
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const pageChanged = (page, pageSize) => {
    setPage(page);
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => editPost(row)} key={1}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Sửa</span>
        </Flex>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => deletePost(row)} danger key={2}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">Xóa</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const deletePost = (row) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new PostApi().delete(row).then((response) => {
          message.success("Xóa thành công.");
          searchPost();
        });
      },
      onCancel() {},
    });
  };

  const addPost = () => {
    history.push(`/lms/modules/myoffice/news/posts/add`);
  };

  const editPost = (row) => {
    history.push(`/lms/modules/myoffice/news/posts/edit/${row.id}/`);
  };

  const getPostCategories = () => {
    PostCategoryApi.getAll().then((response) => {
      setCategories(response.data);
    });
  };

  const searchPost = () => {
    var postApi = new PostApi();
    postApi.searches().then((response) => {
      setData(response.data);
      setTotalItem(response.data.totalItems);
    });
  };

  useEffect(() => {
    searchPost();
  }, [page, keyword]);

  useEffect(() => {
    getPostCategories();
  }, []);

  return (
    <>
      <Form
        layout="vertical"
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <PageHeaderAlt className="border-bottom">
          <div className="container-fluid">
            <Flex justifyContent="between" alignItems="center">
              <h4 style={{ marginBottom: 0 }}>Tin bài </h4>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="my-4 container-fluid">
          <Row>
            <Col span={8}>
              <Search
                placeholder="Tìm kiếm"
                onSearch={(value) => {
                  setPage(1);
                  setKeyword(value);
                }}
                style={{ width: 300 }}
              />
            </Col>
            <Col span={8}>
              {categories && (
                <TreeSelect
                  style={{ width: 300 }}
                  treeData={categories}
                  // value={value}
                  dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  placeholder="Chọn Danh mục tin bài"
                  allowClear
                  treeDefaultExpandAll
                  // onChange={onChange}
                ></TreeSelect>
              )}
            </Col>
            <Col span={8} style={{ textAlign: "right" }}>
              <Button onClick={() => addPost()} type="primary">
                <PlusOutlined />
                <span>Tạo mới</span>
              </Button>
            </Col>
          </Row>
          <br />
          <Card bodyStyle={{ padding: 0 }}>
            <Row gutter={16}>
              <Col span={24}>
                <div className="table-responsive">
                  <div className="ant-table">
                    <div className="ant-table-container">
                      <div className="ant-table-content">
                        <table>
                          <thead className="ant-table-thead">
                            <tr>
                              <th
                                className="ant-table-cell"
                                style={{ width: 50 }}
                              >
                                #
                              </th>
                              <th className="ant-table-cell">Tên</th>
                              <th
                                className="ant-table-cell"
                                style={{ width: 220 }}
                              >
                                Danh mục
                              </th>
                              <th
                                className="ant-table-cell"
                                style={{ width: 120 }}
                              >
                                Nổi bật
                              </th>
                              <th
                                className="ant-table-cell"
                                style={{ width: 190 }}
                              >
                                Ngày tạo
                              </th>
                              <th
                                className="ant-table-cell"
                                style={{ width: 60 }}
                              ></th>
                            </tr>
                          </thead>
                          <tbody className="ant-table-tbody">
                            {data &&
                              data.map((post, index) => {
                                return (
                                  <tr
                                    className="ant-table-row"
                                    key={`tr-ans-question-${post.id}`}
                                  >
                                    <td className="ant-table-cell ">
                                      {index + 1}
                                    </td>
                                    <td className="ant-table-cell ">
                                      <Link
                                        to={`/lms/modules/myoffice/news/posts/edit/${post.id}/`}
                                      >
                                        {post.name}
                                      </Link>
                                    </td>
                                    <td className="ant-table-cell ">
                                      <Link>{post.categoryName}</Link>
                                    </td>
                                    <td className="ant-table-cell ">
                                      {post.isFeature && (
                                        <span className="text-muted">
                                          Nổi bật
                                        </span>
                                      )}
                                      {!post.isFeature && (
                                        <span className="text-muted">
                                          Không
                                        </span>
                                      )}
                                    </td>
                                    <td className="ant-table-cell ">
                                      {moment(post.createdTime).format(
                                        "YYYY-MM-DD HH:mm"
                                      )}
                                    </td>
                                    <td className="ant-table-cell ">
                                      <div className="text-right">
                                        <EllipsisDropdown
                                          menu={dropdownMenu(post)}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24} alignItems="right" flex={"flex-end"}>
                <Pagination
                  showSizeChanger={false}
                  className="ant-table-pagination-right ant-table-pagination"
                  total={totalItem}
                  pageSize={1}
                />
              </Col>
            </Row>
          </Card>
        </div>
      </Form>
    </>
  );
};

export default PostList;
