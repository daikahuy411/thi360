import React, { useState, useEffect } from "react";
import { Descriptions, Badge, Card, Row, Col, Button } from "antd";
import {
    FileTextOutlined,
    DownloadOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import ViewOnlineDialog from "../viewonlinedialog";

const FileInfo = ({ file }) => {
    const [openViewOnline, setOpenViewOnline] = useState(false);

    const downloadFile = () => {
        window.open(file.url, '_blank');
    };

    const viewOnline = () => {
        setOpenViewOnline(true);
    };

    return (
        <>
            {file && (
                <div className="ant-upload-list ant-upload-list-picture">
                    <div className="ant-upload-list-picture-container">
                        <div className="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture">
                            <div className="ant-upload-list-item-info">
                                <span className="ant-upload-span">
                                    <FileTextOutlined size={64} />
                                    <a target="_blank"
                                        rel="noopener noreferrer"
                                        className="ant-upload-list-item-name"
                                        title={file.name}
                                        href={file.url}>
                                        {file.name}
                                    </a>
                                    <span className="ant-upload-list-item-card-actions picture">
                                        <Button onClick={() => viewOnline()} icon={<EyeOutlined />}></Button>
                                        &nbsp;
                                        <Button onClick={() => downloadFile()} icon={<DownloadOutlined />}></Button>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {openViewOnline && (
                <ViewOnlineDialog file={file} onClose={() => setOpenViewOnline(false)} />
            )}
        </>
    )
};

export default FileInfo;