import { useState, useEffect } from "react";
import {
  Descriptions,
  Card,
} from "antd";
import DocumentApi from "api/document-api";
import moment from "moment";
import FileList from "views/app-views/shared/files";

const dateFormat = "DD-MM-YYYY";

const Overview = (props) => {
    const [item, setItem] = useState(props.item);    
  
    useEffect(() => {
        let api = new DocumentApi();
        api.get(parseInt(item.id)).then((response) => {
            console.log(response);
            setItem(props.item);
        });
    }, [item.id, props.item]);  

  return (
    item && (
      <>
        <Card>
        {item && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Số hiệu VB" span={2}>
                {item.documentCode}
            </Descriptions.Item>
            <Descriptions.Item label="Trích yếu" span={2}>
                {item.summary}
            </Descriptions.Item>
            <Descriptions.Item label="File đính kèm" span={2}>
                {item.fileModels && (
                    <FileList viewOnly={true} files={item.fileModels} />
                )}
            </Descriptions.Item>
            <Descriptions.Item label="Loại VB" span={2}>
                {item.documentTypeName}
            </Descriptions.Item>
            <Descriptions.Item label="Chủ đề" >
                {item.topicName}
            </Descriptions.Item>
            <Descriptions.Item label="Lĩnh vực"  >
                {item.areaName}
            </Descriptions.Item>
            <Descriptions.Item label="Cơ quan ban hành"  >
                {item.organizationName} - ngày {moment(item.issuedDate).format(dateFormat)}
            </Descriptions.Item>
            <Descriptions.Item label="Người ký"  >
                {item.signer} - {item.positionName}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày đăng công báo"  >
                {moment(item.annoucementDate).format(dateFormat)}- trong {item.annouceNumber} ngày
            </Descriptions.Item>
            <Descriptions.Item label="Ngày hết hiệu lực" >
                {moment(item.expirationDate).format(dateFormat)}- trong {item.expireNumber} ngày
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái"  >
                {item.documentStatusName}
            </Descriptions.Item>            
          </Descriptions>
        )}
      </Card>
      </>
    )
  );
};

export default Overview;
