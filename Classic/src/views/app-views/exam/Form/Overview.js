import React, { useState, useEffect } from "react";
import { Descriptions, Badge, Card } from "antd";
import ExamApi from "api/exam-api";
import moment from "moment";
import ExamStatChart from "./Chart";

const Overview = (props) => {
  const [item, setItem] = useState(null);
  const { param } = props;

  useEffect(() => {
    const { id } = param;
    const api = new ExamApi();
    api.getExamDashboard(parseInt(id)).then((response) => {
      setItem(response.data);
    });
  }, [param, props]);

  return (
    <>
      <Card>
        {item && (
          <Descriptions bordered>
            <Descriptions.Item label="Tên kỳ thi">
              {item.name}
            </Descriptions.Item>
            <Descriptions.Item label="Hình thức">
              {item.examTypeName}
            </Descriptions.Item>
            <Descriptions.Item label="Tham gia">
              {item.registrationTypeName}
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian bắt đầu">
              {moment(item.startDate).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian kết thúc" span={2}>
              {moment(item.endDate).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái" span={3}>
              {item.status == 2 && <Badge status="processing" text="Đang diễn ra" />}
              {item.status != 2 && <span>{item.statusName}</span>}
            </Descriptions.Item>
            <Descriptions.Item label="Số môn thi">
              {item.totalExamItem}
            </Descriptions.Item>
            <Descriptions.Item label="Số học viên">
              {item.totalUser}
            </Descriptions.Item>
            <Descriptions.Item label="Số lượt làm bài">
              {item.totalAttempt}
            </Descriptions.Item>
            <Descriptions.Item label="Lịch sử">
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
        <ExamStatChart />
      </Card>
    </>
  );
};

export default Overview;
