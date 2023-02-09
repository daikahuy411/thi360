import React, { useState, useEffect } from "react";
import { Descriptions, Badge, Card } from "antd";
import moment from "moment";
import CourseStatChart from "./Chart";
import CourseApi from "api/course-api";

const Overview = (props) => {
  const [item, setItem] = useState(null);
  const { param } = props;

  useEffect(() => {
    const { id } = param;
    const api = new CourseApi();
    api.getCourseDashboard(parseInt(id)).then((response) => {
      setItem(response.data);
    });
  }, [param, props]);

  return (
    <>
      <Card>
        {item && (
          <Descriptions bordered>
            <Descriptions.Item label="Tên" span={2}>
              {item.name}
            </Descriptions.Item>
            <Descriptions.Item label="Danh mục">
              {item.categoryName}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {item.status == 2 && (
                <Badge status="processing" text="Đang diễn ra" />
              )}
              {item.status != 2 && <span>{item.statusName}</span>}
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian bắt đầu">
              {item.startDate && (
                <>{moment(item.startDate).format("YYYY-MM-DD HH:mm:ss")}</>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian kết thúc">
              {item.endDate && (
                <>{moment(item.endDate).format("YYYY-MM-DD HH:mm:ss")}</>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Hình thức tham gia">
              {item.registrationTypeName}
            </Descriptions.Item>
            <Descriptions.Item label="Số học viên">
              {item.totalUser}
            </Descriptions.Item>
            <Descriptions.Item label="Số lượt học">
              {item.totalAttempt}
            </Descriptions.Item>
            <Descriptions.Item label="Lịch sử" span={3}>
              Ngày tạo: {moment(item.createdTime).format("YYYY-MM-DD HH:mm:ss")}
              <br />
              Ngày sửa gần nhất:{" "}
              {moment(item.lastModifiedTime).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>
      <br />
      <Card title="Thống kê">
        <CourseStatChart />
      </Card>
    </>
  );
};

export default Overview;
