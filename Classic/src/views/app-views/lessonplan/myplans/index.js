import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import {
  Button,
  Row,
  Col,
  Tooltip,
  Modal,
  message,
  Menu,
  Card,
  Empty,
  Select,
  Input,
  Badge,
} from "antd";
import {
  EyeOutlined,
  PlusOutlined,
  CommentOutlined,
  TeamOutlined,
  DeleteOutlined,
  SendOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import LessonPlanApi from "api/lesson-plan-api";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import FileList from "views/app-views/shared/files";
import CatalogSelector from "views/app-views/shared/catalogSelector";
import { CatalogType } from "types/CatalogType";

const { confirm } = Modal;
const { Search } = Input;
const { Option } = Select;

const MyLessonPlanList = () => {
  let history = useHistory();
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [keyWord, setKeyword] = useState("");
  const [schoolBlockCatalogId, setSchoolBlockCatalogId] = useState(0);
  const [subjectCatalogId, setSubjectCatalogId] = useState(0);
  const [bookCatalogId, setBookCatalogId] = useState(0);

  const toggle = (key) => {
    const currentExpaned = Object.assign({}, expanded);
    const isExpanded = currentExpaned[key] || false;
    currentExpaned[key] = !isExpanded;
    setExpanded({ ...currentExpaned });
  };

  const dropdownMenu = (item) => (
    <Menu>
      <Menu.Item key="1" onClick={() => edit(item.id)}>
        <EyeOutlined />
        <span className="ml-2">Xem chi tiết</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={() => deleteItem(item.id)} danger>
        <DeleteOutlined />
        <span className="ml-2">Xóa</span>
      </Menu.Item>
    </Menu>
  );

  const deleteItem = (id) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new LessonPlanApi().delete({ id: id }).then((response) => {
          message.success("Xóa thành công.");
          fetchData();
        });
      },
      onCancel() {},
    });
  };

  const fetchData = () => {
    new LessonPlanApi()
      .getMyLessonPlans(
        keyWord,
        schoolBlockCatalogId,
        subjectCatalogId,
        bookCatalogId
      )
      .then((response) => {
        setData(response.data.value);
      });
  };

  const edit = (id) => {
    history.push(`/lms/modules/mylesson/lessonplans/edit/${id}/overview`);
  };

  const add = () => {
    history.push(`/lms/modules/mylesson/lessonplans/add`);
  };

  useEffect(() => {
    fetchData();
  }, [keyWord, schoolBlockCatalogId, bookCatalogId, subjectCatalogId]);

  return (
    <>
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center">
            <h4 style={{ marginBottom: 0 }}>Giáo án của tôi </h4>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className={`my-2 container-fluid`}>
        <Row gutter={16}>
          <Col span={6}>
            <Search
              placeholder="Tìm kiếm"
              onSearch={(value) => setKeyword(value)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={4}>
            <CatalogSelector
              typeName="Khối lớp"
              value={schoolBlockCatalogId}
              onChange={(value) => setSchoolBlockCatalogId(value)}
              type={CatalogType.SCHOOL_BLOCK_CATALOG}
            />
          </Col>
          <Col span={4}>
            <CatalogSelector
              typeName="Môn học"
              value={subjectCatalogId}
              onChange={(value) => setSubjectCatalogId(value)}
              type={CatalogType.SUBJECT_CATALOG}
            />
          </Col>
          <Col span={4}>
            <CatalogSelector
              typeName="Bộ sách"
              value={bookCatalogId}
              onChange={(value) => setBookCatalogId(value)}
              type={CatalogType.BOOK_CATALOG}
            />
          </Col>
          <Col span={6} style={{ textAlign: "right" }}>
            <Button type="primary" className="ml-2" onClick={() => add()}>
              <PlusOutlined />
              <span>Thêm mới</span>
            </Button>
          </Col>
        </Row>
        <Card className={`my-2`} bodyStyle={{ padding: 0 }}>
          {data && (
            <div className="table-responsive">
              <div className="ant-table">
                <div className="ant-table-container">
                  <div className="ant-table-content">
                    <table>
                      <thead className="ant-table-thead">
                        <tr>
                          <th className="ant-table-cell" style={{ width: 25 }}>
                            #
                          </th>
                          <th
                            style={{ width: 30 }}
                            className="ant-table-cell ant-table-row-expand-icon-cell"
                          ></th>
                          <th className="ant-table-cell">Giáo án</th>
                          {/* <th className="ant-table-cell" style={{ width: 290 }}>
                            Thời gian
                          </th> */}
                          <th className="ant-table-cell" style={{ width: 120 }}>
                            Số Ý kiến
                          </th>
                          <th className="ant-table-cell" style={{ width: 210 }}>
                            Trạng thái
                          </th>
                          <th className="ant-table-cell" style={{ width: 90 }}>
                            {" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="ant-table-tbody">
                        {data.map((item, index) => {
                          return (
                            <>
                              <tr
                                className="ant-table-row ant-table-row-level-0"
                                key={`tr-plan-lesson-row-${item.id}`}
                              >
                                <td className="ant-table-cell ">{index + 1}</td>
                                <td className="ant-table-cell ant-table-row-expand-icon-cell">
                                  <button
                                    type="button"
                                    onClick={() => toggle(item.id)}
                                    className={`ant-table-row-expand-icon ${
                                      expanded[item.id]
                                        ? "ant-table-row-expand-icon-expanded"
                                        : "ant-table-row-expand-icon-collapsed"
                                    }`}
                                    aria-label="Expand row"
                                    aria-expanded="false"
                                  ></button>
                                </td>
                                <td className="ant-table-cell ">
                                  <a onClick={() => edit(item.id)}>
                                    {item.name}
                                  </a>
                                  <div>
                                    <span className="text-muted">
                                      Bài dạy:{" "}
                                    </span>
                                    {item.lessonName}
                                  </div>
                                  <div>
                                    <span className="text-muted">
                                      Ngày tạo:
                                    </span>
                                    &nbsp;
                                    {moment(item.createdTime).format(
                                      "DD-MM-YYYY HH:mm"
                                    )}
                                  </div>
                                </td>
                                {/* <td className="ant-table-cell ">
                                  <div>
                                    <span className="text-muted">Ngày tạo:</span>&nbsp;{moment(item.createdTime).format(
                                      "DD-MM-YYYY HH:mm"
                                    )}
                                  </div>
                                  {item.requestedDateTime && (
                                    <div>
                                      <span className="text-muted">Gửi duyệt:</span>&nbsp;{moment(item.requestedDateTime).format(
                                        "DD-MM-YYYY HH:mm"
                                      )}
                                    </div>)}
                                  {item.approvedDateTime && (
                                    <span style={{ display: 'block' }}>
                                      <span className="text-muted">Ngày duyệt:</span>&nbsp;{moment(item.approvedDateTime).format(
                                        "DD-MM-YYYY HH:mm"
                                      )}
                                    </span>
                                  )}
                                </td> */}
                                <td className="ant-table-cell ">
                                  {item.totalComment}
                                </td>
                                <td className="ant-table-cell ">
                                  {(item.status === 1 || item.status === 0) && (
                                    <Badge
                                      color={"green"}
                                      text={item.statusName}
                                    />
                                  )}
                                  {item.status === 2 && (
                                    <Badge
                                      color={"blue"}
                                      text={item.statusName}
                                    />
                                  )}
                                  {item.status === 3 && (
                                    <Badge
                                      color={"red"}
                                      text={item.statusName}
                                    />
                                  )}
                                  <div className="text-muted">
                                    &nbsp;
                                    {item.totalApproved}/{item.totalReviewer}{" "}
                                    &nbsp;
                                    <Tooltip
                                      placement="topLeft"
                                      title={
                                        "Số người đã duyệt/ Tổng số người kiểm tra"
                                      }
                                    >
                                      <InfoCircleOutlined
                                        style={{ color: "rgba(0,0,0,.45)" }}
                                      />
                                    </Tooltip>
                                  </div>
                                </td>
                                <td className="ant-table-cell ">
                                  <div className="text-right">
                                    <EllipsisDropdown
                                      menu={dropdownMenu(item)}
                                    />
                                  </div>
                                </td>
                              </tr>
                              {expanded[item.id] && expanded[item.id] === true && (
                                <tr
                                  key={`tr-plan-data-lesson-row-${item.id}`}
                                  className="ant-table-expanded-row ant-table-expanded-row-level-1"
                                >
                                  <td colSpan={7} className="ant-table-cell">
                                    {item.fileModels && (
                                      <FileList
                                        key={`file-${item.id}`}
                                        files={item.fileModels}
                                        viewOnly={true}
                                      />
                                    )}
                                    {item.fileModels.length == 0 && (
                                      <span className="text-muted">
                                        Không có file đính kèm...
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              )}
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
        {(!data || data.length === 0) && (
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={24} xl={24} xxl={24}>
              <Empty
                description={"Hiện tại chưa có dữ liệu..."}
                style={{ marginTop: 50 }}
              />
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default MyLessonPlanList;
