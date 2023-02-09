import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import {
  Radio,
  Button,
  Row,
  Col,
  Modal,
  message,
  Tooltip,
  Tag,
  Progress,
  Avatar,
  Menu,
  Card,
  Input,
  Select,
  Empty,
  Spin
} from "antd";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  PaperClipOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import utils from "utils";
import { COLORS } from "constants/ChartConstant";
import Flex from "components/shared-components/Flex";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { useHistory } from "react-router-dom";
import ProjectApi from "api/project-api";
import ProjectListData from './data';

const { confirm } = Modal;
const { Search } = Input;
const { Option } = Select;

const VIEW_LIST = "LIST";
const VIEW_GRID = "GRID";

const ItemAction = ({ id, overviewId, editId, removeId }) => (
  <EllipsisDropdown
    menu={
      <Menu>
        <Menu.Item key="0" onClick={() => overviewId(id)}>
          <EyeOutlined />
          <span className="ml-2">View</span>
        </Menu.Item>
        <Menu.Item key="1" onClick={() => editId(id)}>
          <EditOutlined />
          <span className="ml-2">Edit</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" onClick={() => removeId(id)}>
          <DeleteOutlined />
          <span className="ml-2">Delete Project</span>
        </Menu.Item>
      </Menu>
    }
  />
);

const ItemHeader = ({ name, category }) => (
  <div>
    <h4 className="mb-0">{name}</h4>
    <span className="text-muted">{category}</span>
  </div>
);

const ItemInfo = ({
  attachmentCount,
  completedTasks,
  totalTasks,
  statusColor,
  dayleft,
}) => (
  <Flex alignItems="center">
    <div className="mr-3">
      <Tooltip title="Attachment">
        <PaperClipOutlined className="text-muted font-size-md" />
        <span className="ml-1 text-muted">{attachmentCount}</span>
      </Tooltip>
    </div>
    <div className="mr-3">
      <Tooltip title="Task Completed">
        <CheckCircleOutlined className="text-muted font-size-md" />
        <span className="ml-1 text-muted">
          {completedTasks}/{totalTasks}
        </span>
      </Tooltip>
    </div>
    <div>
      <Tag
        className={statusColor === "none" ? "bg-gray-lightest" : ""}
        color={statusColor !== "none" ? statusColor : ""}
      >
        <ClockCircleOutlined />
        <span className="ml-2 font-weight-semibold">{dayleft} days left</span>
      </Tag>
    </div>
  </Flex>
);

const ItemProgress = ({ progression }) => (
  <Progress
    percent={progression}
    strokeColor={getProgressStatusColor(progression)}
    size="small"
  />
);

const ItemMember = ({ member }) => (
  <>
    {member.map((elm, i) =>
      i <= 2 ? (
        <Tooltip title={elm.name} key={`avatar-${i}`}>
          <Avatar
            size="small"
            className={`ml-1 cursor-pointer ant-avatar-${elm.avatarColor}`}
            src={elm.img}
          >
            {elm.img ? (
              ""
            ) : (
              <span className="font-weight-semibold font-size-sm">
                {elm.name != null ? utils.getNameInitial(elm.name) : ''}
              </span>
            )}
          </Avatar>
        </Tooltip>
      ) : null
    )}
    {member.length > 3 ? (
      <Tooltip title={`${member.length - 3} More`}>
        <Avatar
          size={25}
          className="ml-1 cursor-pointer bg-white border font-size-sm"
        >
          <span className="text-gray-light font-weight-semibold">
            +{member.length - 3}
          </span>
        </Avatar>
      </Tooltip>
    ) : null}
  </>
);

const ListItem = ({ data, overviewId, editId, removeId }) => (
  <div className="bg-white rounded p-3 mb-3 border">
    <Row align="middle">
      <Col xs={24} sm={24} md={8}>
        <ItemHeader name={data.name} category={data.category} />
      </Col>
      <Col xs={24} sm={24} md={6}>
        <ItemInfo
          attachmentCount={data.attachmentCount}
          completedTasks={data.completedTasks}
          totalTasks={data.totalTasks}
          statusColor={data.statusColor}
          dayleft={data.remainDays}
        />
      </Col>
      <Col xs={24} sm={24} md={5}>
        <ItemProgress progression={data.progression} />
      </Col>
      <Col xs={24} sm={24} md={3}>
        <div className="ml-0 ml-md-3">
          <ItemMember member={data.member} />
        </div>
      </Col>
      <Col xs={24} sm={24} md={2}>
        <div className="text-right">
          <ItemAction id={data.id} overviewId={overviewId} editId={editId} removeId={removeId} />
        </div>
      </Col>
    </Row>
  </div>
);

const GridItem = ({ data, overviewId, editId, removeId }) => (
  <Card>
    <Flex alignItems="center" justifyContent="between">
      <ItemHeader name={data.name} category={data.category} />
      <ItemAction id={data.id} overviewId={overviewId} editId={editId} removeId={removeId} />
    </Flex>
    <div className="mt-2">
      <ItemInfo
        attachmentCount={data.attachmentCount}
        completedTasks={data.completedTasks}
        totalTasks={data.totalTasks}
        statusColor={data.statusColor}
        dayleft={data.remainDays}
      />
    </div>
    <div className="mt-3">
      <ItemProgress progression={data.progression} />
    </div>
    <div className="mt-2">
      <ItemMember member={data.member} />
    </div>
  </Card>
);

const getProgressStatusColor = (progress) => {
  if (progress >= 80) {
    return COLORS[1];
  }
  if (progress < 60 && progress > 30) {
    return COLORS[3];
  }
  if (progress < 30) {
    return COLORS[2];
  }
  return COLORS[0];
};




const ProjectList = () => {
  let history = useHistory();
  const [view, setView] = useState(VIEW_GRID);
  const [list, setList] = useState();
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState(0);
  const [filters, setFilters] = useState({
    keyword: "",
    status: 0
  });

  const onChangeProjectView = (e) => {
    setView(e.target.value);
  };

  const randomArr = (list) => {
    return list[Math.floor((Math.random()*list.length))];
  }
  const fetchData = () => {
    setLoading(true);
    new ProjectApi()
      .getProject(keyword, status)
      .then((response) => {
        const res = response.data.value;
        setList(res);
        setLoading(false);

        // var avataRdm = ["cyan", "blue", "gold", "purple"];
        // res.forEach(el => {
        //   if(el.member !== undefined ){
        //     el.member.forEach(element => {              
        //       element.img = "/img/avatars/thumb-13.jpg";
        //       element.avatarColor = randomArr(avataRdm);
        //     });
        //   }
        // });
      });
  };

  useEffect(() => {
    fetchData();
  }, [keyword, status]);

  const deleteItem = (id) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        new ProjectApi().delete({ id: id }).then((response) => {
          message.success("Xóa thành công.");
          fetchData();
        });
      },
      onCancel() {},
    });
  };

  const add = () => {
    history.push(`/lms/modules/myoffice/task/projects/add`);
  };
  
  const overview = (id) => {
    history.push(`/lms/modules/myoffice/task/projects/edit/${id}/overview`);
  };

  const edit = (id) => {
    history.push(`/lms/modules/myoffice/task/projects/edit/${id}/info`);
  };

  const changeKeyword = (value) => {
    setKeyword(value);
    const currentFilters = Object.assign({}, filters);
    currentFilters["keyword"] = value;
    setFilters({ ...currentFilters });
  };

  const handleStatusChange = (field, value) => {
    setStatus(value);
  };

  return (
    <>
      <Spin spinning={loading} delay={500} tip="Loading...">       
      
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center">
            <h4 style={{ marginBottom: 0 }}>Dự án</h4>
          </Flex>
        </div>
      </PageHeaderAlt>

      <div
        className={`my-4 ${
          view === VIEW_LIST ? "container" : "container-fluid"
        }`}
      >
        <Row>
          <Col span={8}>
          <div>
            <Row gutter={16}>
              <Col span={8}>
                <Select
                  placeholder="Chọn Trạng thái"
                  defaultValue={0}
                  value={status}
                  name="status"
                  onChange={(value) => handleStatusChange("status", value) }
                  style={{ width: "100%" }}
                >
                  <Option value={0}>Chọn trạng thái</Option>
                  <Option value={1}>Đang diễn ra</Option>
                  <Option value={2}>Kết thúc</Option>
                </Select>
                </Col>
                <Col span={16}>
                <Search
                  placeholder="Tìm kiếm"
                  onSearch={(value) => changeKeyword(value)}
                  style={{ width: "100%" }}
                />
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={8}></Col>
          <Col span={8} style={{ textAlign: "right" }}>
            <div>
              <Radio.Group
                defaultValue={VIEW_GRID}
                onChange={(e) => onChangeProjectView(e)}
              >
                <Radio.Button value={VIEW_GRID}>
                  <AppstoreOutlined />
                </Radio.Button>
                <Radio.Button value={VIEW_LIST}>
                  <UnorderedListOutlined />
                </Radio.Button>
              </Radio.Group>
              <Button type="primary" className="ml-2" onClick={() => add()}>
                <PlusOutlined />
                <span>Thêm mới</span>
              </Button>
            </div>
          </Col>
        </Row>
        <br />
        {view === VIEW_LIST ? (
          list && list.map((elm) => (
            <ListItem
              data={elm}
              overviewId={(id) => overview(id)}
              editId={(id) => edit(id)}
              removeId={(id) => deleteItem(id)}
              key={elm.id}
            />
          ))
        ) : (
          <Row gutter={16}>
            {list && list.map((elm) => (
              <Col xs={24} sm={24} lg={8} xl={8} xxl={6} key={elm.id}>
                <GridItem data={elm} overviewId={(id) => overview(id)} editId={(id) => edit(id)} removeId={(id) => deleteItem(id)} />
              </Col>
            ))}
          </Row>
        )}

        {(!list || list.length === 0) && (
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
      </Spin>
    </>
  );
};

export default ProjectList;
