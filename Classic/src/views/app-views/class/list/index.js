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
} from "antd";
import {
  EyeOutlined,
  PlusOutlined,
  TeamOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import OrganizationApi from "api/organization-api";
import { useHistory, Link } from "react-router-dom";

const { confirm } = Modal;

const ItemAction = ({ id, edit, removeId }) => (
  <EllipsisDropdown
    menu={
      <Menu>
        <Menu.Item key="1" onClick={() => edit(id)}>
          <EyeOutlined />
          <span className="ml-2">Xem chi tiết</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" onClick={() => removeId(id)} danger>
          <DeleteOutlined />
          <span className="ml-2">Xóa</span>
        </Menu.Item>
      </Menu>
    }
  />
);

const ItemHeader = ({ name, category, id }) => (
  <div>
    <div className="mb-0">
      <Link to={`/lms/modules/system/classes/edit/${id}`}>{name}</Link>
    </div>
    <span className="text-muted">{category}</span>
  </div>
);

const ItemInfo = ({ item }) => (
  <Flex alignItems="center">
    <div className="mr-3">
      <Tooltip title="Học viên">
        <TeamOutlined className="text-muted font-size-md" />
        <span className="ml-1 text-muted">{item.totalUser} học viên</span>
      </Tooltip>
    </div>
    {/* <div>
      <Tag
        className={statusColor === "none" ? "bg-gray-lightest" : ""}
        color={statusColor !== "none" ? statusColor : ""}
      >
        <ClockCircleOutlined />
        <span className="ml-2 font-weight-semibold">4 days left</span>
      </Tag>
    </div> */}
  </Flex>
);

const GridItem = ({ data, removeId, edit }) => (
  <Card>
    <Flex alignItems="center" justifyContent="between">
      <ItemHeader id={data.id} name={data.name} category={data.category} />
      <ItemAction id={data.id} edit={edit} removeId={removeId} />
    </Flex>
    <div className="mt-2">
      <ItemInfo item={data} />
    </div>
    <div className="mt-3">
      {/* <ItemProgress progression={data.progression} /> */}
    </div>
    <div className="mt-2">{/* <ItemMember member={data.member} /> */}</div>
  </Card>
);

const ClassList = () => {
  let history = useHistory();
  const [data, setData] = useState(null);

  const deleteItem = (id) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new OrganizationApi().delete({ id: id }).then((response) => {
          message.success("Xóa thành công.");
          fetchData();
        });
      },
      onCancel() {},
    });
  };

  const fetchData = () => {
    new OrganizationApi().searchesClasses().then((response) => {
      setData(response.data);
    });
  };

  const edit = (id) => {
    history.push(`/lms/modules/system/classes/edit/${id}`);
  };

  const add = () => {
    history.push(`/lms/modules/system/classes/add`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center">
            <h4 style={{ marginBottom: 0 }}>Lớp học </h4>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className={`my-4 container-fluid`}>
        <Row gutter={16}>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" className="ml-2" onClick={() => add()}>
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
                  data={elm}
                  edit={(id) => edit(id)}
                  removeId={(id) => deleteItem(id)}
                />
              </Col>
            ))}
          {(!data || data.length === 0) && (
            <Col xs={24} sm={24} lg={24} xl={24} xxl={24}>
              <Empty style={{ marginTop: 50 }} />
            </Col>
          )}
        </Row>
      </div>
    </>
  );
};

export default ClassList;
