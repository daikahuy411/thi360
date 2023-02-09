import React, { useState, useEffect } from "react";
import { Descriptions, Badge, Card, Row, Col, Button } from "antd";
import {
    FileTextOutlined,
    DeleteOutlined,
    DownloadOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import ViewOnlineDialog from "../viewonlinedialog";

const FileList = ({ files, removeFile = null, viewOnly = false }) => {
    const [openViewOnline, setOpenViewOnline] = useState(false);
    const [file, setFile] = useState(null);

    const downloadFile = (file) => {
        window.open(file.url, '_blank');
    };

    const viewOnline = () => {
        setOpenViewOnline(true);
    };

    return (
        <>
            {files && files.map((file, index) =>
                <div className="ant-upload-list ant-upload-list-picture" key={index}>
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
                                        {index+1}.&nbsp;{file.name}
                                    </a>
                                    <span className="ant-upload-list-item-card-actions picture">
                                        {viewOnly == false && removeFile && (
                                            <>
                                                <Button onClick={() => { removeFile(file) }} icon={<DeleteOutlined />}></Button>
                                                &nbsp;
                                            </>
                                        )}
                                        <Button onClick={() => { setFile(file); viewOnline(); }} icon={<EyeOutlined />}></Button>
                                        &nbsp;
                                        <Button onClick={() => downloadFile(file)} icon={<DownloadOutlined />}></Button>
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

export default FileList;