import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Tooltip,
  message,
  Result,
  Checkbox,
  Card,
} from "antd";
import UserApi from "api/user-api";
import React, { useState, useEffect } from "react";
import { DownloadOutlined, SendOutlined, FileTextOutlined, CloudUploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Configuration } from "configs";

const UserImportDialog = (props) => {
  const [fileInfo, setFileInfo] = useState(null);
  // Hard code for testing
  // const [fileInfo, setFileInfo] = useState({ name: 'File Teamplate.xls', url: '/ckfinder/userfiles/files/ImportNguoiDung.xlsx' });
  const [resultFileInfo, setResultFileInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  }, []);

  const openCKFinder = () => {
    window.CKFinder.modal({
      chooseFiles: true,
      width: 800,
      height: 600,
      onInit: function (finder) {
        finder.on('files:choose', function (evt) {
          var file = evt.data.files.first();
          const fileInfo = { name: file.attributes.name, extension: file._extenstion, size: file.attributes.size, url: file.attributes.url };
          setFileInfo(fileInfo);
        });
      }
    });
  }

  const importFile = () => {
    setResultFileInfo(null);
    setIsLoading(true);
    new UserApi().importFile(fileInfo.url).then((response) => {
      setIsLoading(false);
      if (response.data.isSuccess) {
        message.success("Cập nhật thành công.");
        setResultFileInfo(response.data.value);
      } else {
        message.error(`Lỗi trong quá trình import. ${response.data.message}`);
      }
    });
  };

  const removeFile = () => {
    setFileInfo(null);
  }

  const downloadTemplate = () => {
    window.open(`${Configuration.domain}/Data/Templates/ImportNguoiDung.xlsx`, "_blank");
  }

  return (
    <Drawer
      title="Import người dùng"
      width={520}
      onClose={props.onClose}
      visible={true}
      bodyStyle={{ paddingBottom: 0 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button style={{ marginRight: 8 }} type="primary" onClick={downloadTemplate}>
            <DownloadOutlined />&nbsp;
            Tải file mẫu
          </Button>
          &nbsp;
          <Button
            disabled={fileInfo == null}
            loading={isLoading}
            onClick={() => {
              importFile();
            }}
            type="primary"
            style={{ marginRight: 8 }}
          >
            <SendOutlined />&nbsp;
            Thực hiện Import
          </Button>
        </div>
      }
    >
      <Row gutter={16}>
        <Col span={24}>
          <Button onClick={() => openCKFinder()} icon={<CloudUploadOutlined />}>Upload file</Button>
          {fileInfo && (
            <div className="ant-upload-list ant-upload-list-picture">
              <div className="ant-upload-list-picture-container">
                <div className="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture">
                  <div className="ant-upload-list-item-info">
                    <span className="ant-upload-span">
                      <FileTextOutlined size={64} />
                      <a target="_blank"
                        rel="noopener noreferrer"
                        className="ant-upload-list-item-name"
                        title={fileInfo.name}
                        href={fileInfo.url}>
                        {fileInfo.name}
                      </a>
                      <span className="ant-upload-list-item-card-actions picture">
                        <Button onClick={() => removeFile()} icon={<DeleteOutlined />}></Button>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>)}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {resultFileInfo && (
            <Result
              status="success"
              title="Import file thành công"
              subTitle="Bạn có thể donwload file kết quả để kiểm tra."
              extra={[
                <>
                  <div className="ant-upload-list ant-upload-list-picture">
                    <div className="ant-upload-list-picture-container">
                      <div className="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture">
                        <div className="ant-upload-list-item-info">
                          <span className="ant-upload-span">
                            <FileTextOutlined size={64} />
                            <a target="_blank"
                              rel="noopener noreferrer"
                              className="ant-upload-list-item-name"
                              title={resultFileInfo.name}
                              href={resultFileInfo.url}>
                              {resultFileInfo.name}
                            </a>
                            <span className="ant-upload-list-item-card-actions picture">
                              <Button onClick={() => window.open(resultFileInfo.url, '_blank')} icon={<DownloadOutlined />}></Button>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ]}
            />)}
        </Col>
      </Row>
    </Drawer>
  );
};

export default UserImportDialog;
