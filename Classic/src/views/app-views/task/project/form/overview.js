import { useState, useEffect } from "react";
import {
  Descriptions,
  Card,
  Progress,
  Tooltip,
  Avatar,
} from "antd";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
  } from "@ant-design/icons";
import ProjectApi from "api/project-api";
import moment from "moment";
import FileList from "views/app-views/shared/files";
import { COLORS } from "constants/ChartConstant";
import utils from "utils";

const dateFormat = "DD-MM-YYYY";

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
                {utils.getNameInitial(elm.name)}
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

const Overview = (props) => {
    const [item, setItem] = useState(props.item);    
  
    useEffect(() => {
        let api = new ProjectApi();
        api.get(parseInt(item.id)).then((response) => {
            console.log(response);
            setItem(props.item);
        });
    }, [item.id, props.item]);

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

  return (
    item && (
      <>
        <Card>
        {item && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Tên dự án" span={2}>
                {item.name}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả" span={2}>
                {item.description}
            </Descriptions.Item>
            <Descriptions.Item label="File đính kèm" span={2}>
                {item.fileModels && (
                    <FileList viewOnly={true} files={item.fileModels} />
                )}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày bắt đầu" >
                {moment(item.startDate).format(dateFormat)}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày kết thúc"  >
                {moment(item.endDate).format(dateFormat)}
            </Descriptions.Item>      
            <Descriptions.Item label="Trạng thái" span={2}>
                {item.statusName}
            </Descriptions.Item>
            <Descriptions.Item label="Thông tin công việc" span={2}>
                <CheckCircleOutlined className="text-muted font-size-md" />
                <span className="ml-1 text-muted">
                    {item.completedTasks}/{item.totalTasks} công việc đã hoàn thành
                </span>
                <br/>
                <ClockCircleOutlined className="text-muted font-size-md"/>
                <span className="ml-1 text-muted">Số ngày còn lại là {item.remainDays} ngày</span>
                <br/>
                <Progress
                    percent={item.progression}
                    strokeColor={getProgressStatusColor(item.progression)}
                    size="small"
                />
            </Descriptions.Item>
            <Descriptions.Item label="Thành viên tham gia" span={2}>
              <div className="ml-0">
                {/* <ItemMember member={item.member} /> */}
                {item.member && item.member.map((elm, i) =>
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
                            {utils.getNameInitial(elm.name)}
                          </span>
                        )}
                      </Avatar>
                    </Tooltip>
                  ) : null
                )}
                {item.member && item.member.length > 3 ? (
                  <Tooltip title={`${item.member.length - 3} More`}>
                    <Avatar
                      size={25}
                      className="ml-1 cursor-pointer bg-white border font-size-sm"
                    >
                      <span className="text-gray-light font-weight-semibold">
                        +{item.member.length - 3}
                      </span>
                    </Avatar>
                  </Tooltip>
                ) : null}
              </div>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>
      </>
    )
  );
};

export default Overview;
