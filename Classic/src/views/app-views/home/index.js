import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Table, Tag, Select, Badge, List } from "antd";
import Flex from "components/shared-components/Flex";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import {
  CloudDownloadOutlined,
  ArrowUpOutlined,
  UserSwitchOutlined,
  FileDoneOutlined,
  SyncOutlined,
  BarChartOutlined,
  TrophyOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import ChartWidget from "components/shared-components/ChartWidget";
import { COLORS } from "constants/ChartConstant";
import { useSelector } from "react-redux";
import DashboardApi from "api/dashboard-api";
import NumberFormat from "react-number-format";
import { APP_PREFIX_PATH } from "configs/AppConfig";

export const weeklyRevenueData = {
  series: [
    {
      name: "Earning",
      data: [45, 52, 38, 24, 33, 26, 21],
    },
  ],
  categories: [
    "08 Jul",
    "09 Jul",
    "10 Jul",
    "11 Jul",
    "12 Jul",
    "13 Jul",
    "14 Jul",
  ],
};

const WeeklyRevenue = ({ dashboard }) => {
  const { direction } = useSelector((state) => state.theme);
  const [categories, setCategories] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    let cates = dashboard.examAttemptByDays.map((item) => {
      return item.title;
    });
    let data = dashboard.examAttemptByDays.map((item) => {
      return item.count;
    });
    setSeries([
      {
        name: "Earning",
        data: [...data],
      },
    ]);
    setCategories([...cates]);
  }, []);

  return (
    <Card>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={8}>
          <Flex
            className="h-100"
            flexDirection="column"
            justifyContent="between"
          >
            <div>
              <h4 className="mb-0">Số lượt thi</h4>
              <span className="text-muted">8 - 15 Jul, 2020</span>
            </div>
            <div className="mb-4">
              <h1 className="font-weight-bold">$27,188.00</h1>
              <p className="text-success">
                <span>
                  <ArrowUpOutlined />
                  <span> 17% </span>
                </span>
                <span>growth from last week</span>
              </p>
              <p>
                Total gross income figure based from the date range given above.
              </p>
            </div>
          </Flex>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16}>
          {categories && series && (
            <ChartWidget
              card={false}
              series={series}
              xAxis={categories}
              title="Lượt thi 7 ngày gần đây"
              height={250}
              type="bar"
              customOptions={{ colors: COLORS }}
              direction={direction}
            />
          )}
        </Col>
      </Row>
    </Card>
  );
};

const DisplayDataSet = ({ dashboard }) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
      <DataDisplayWidget
        icon={<FileDoneOutlined />}
        value={dashboard.totalExamAttempt}
        title="Tổng số lượt thi"
        color="cyan"
        vertical={true}
        avatarSize={55}
      />
      <DataDisplayWidget
        icon={<TrophyOutlined />}
        value={dashboard.totalExam}
        title="Tổng số Kỳ thi"
        color="gold"
        vertical={true}
        avatarSize={55}
      />
    </Col>
    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
      <DataDisplayWidget
        icon={<QuestionOutlined />}
        value={dashboard.totalQuestion}
        title="Tổng số câu hỏi"
        color="blue"
        vertical={true}
        avatarSize={55}
      />
      <DataDisplayWidget
        icon={<UserSwitchOutlined />}
        value={dashboard.totalUser}
        title="Tổng số tài khoản"
        color="volcano"
        vertical={true}
        avatarSize={55}
      />
    </Col>
  </Row>
);

const SalesDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    new DashboardApi().getDashboard().then((response) => {
      setOptions([
        {
          title: "Số tài khoản",
          amount: response.data.licenseOptions.userLimit,
        },
        {
          title: "Số kỳ thi",
          amount: response.data.licenseOptions.examLimit,
        },
        {
          title: "Số câu hỏi",
          amount: response.data.licenseOptions.questionLimit,
        },
        {
          title: "Dung lượng lưu trữ file (G)",
          amount: response.data.licenseOptions.storageLimit,
        },
      ]);
      setDashboard(response.data);
    });
  }, []);

  return (
    <>
      {dashboard && (
        <>
          <Card title="Thống kê">
            <Row gutter={16}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <DataDisplayWidget
                  icon={<FileDoneOutlined />}
                  value={dashboard.totalLessonPlan}
                  title="Tổng số Giáo án  "
                  color="cyan"
                  url={`${APP_PREFIX_PATH}/modules/lessonplans`}
                  vertical={true}
                  avatarSize={55}
                />
                <DataDisplayWidget
                  icon={<TrophyOutlined />}
                  value={dashboard.totalPost}
                  title="Tổng số Tin tức"
                  color="gold"
                  url={`${APP_PREFIX_PATH}/modules/myoffice/news/posts/list`}
                  vertical={true}
                  avatarSize={55}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <DataDisplayWidget
                  icon={<QuestionOutlined />}
                  value={dashboard.totalClass}
                  title="Tổng số Lớp học"
                  url={`${APP_PREFIX_PATH}/modules/system/classes/list`}
                  color="blue"
                  vertical={true}
                  avatarSize={55}
                />
                <DataDisplayWidget
                  icon={<UserSwitchOutlined />}
                  value={dashboard.totalUser}
                  url={`${APP_PREFIX_PATH}/modules/system/users`}
                  title="Tổng số tài khoản"
                  color="volcano"
                  vertical={true}
                  avatarSize={55}
                />
              </Col>
            </Row>
          </Card>
          {/* <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <WeeklyRevenue dashboard={dashboard} />
            </Col>
          </Row>
          <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <DisplayDataSet dashboard={dashboard} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Card title="Gói dịch vụ đang sử dụng">
                <List
                  itemLayout="horizontal"
                  dataSource={options}
                  renderItem={(item) => (
                    <List.Item>
                      <div className="d-flex align-items-center justify-content-between w-100">
                        <div>
                          <span className="text-muted">{item.title}</span>
                        </div>
                        <div>
                          <span className="font-weight-bold">
                            <NumberFormat
                              value={item.amount}
                              thousandSeparator={true}
                              displayType="text"
                            ></NumberFormat>
                          </span>
                        </div>
                      </div>
                    </List.Item>
                  )}
                ></List>
              </Card>
            </Col>
          </Row> */}
        </>
      )}
    </>
  );
};

export default SalesDashboard;
