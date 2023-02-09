import React, { useState } from 'react';
import {
    CloudUploadOutlined, DeleteOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Form, Input, Drawer, message } from 'antd';
import LessonPlanApi from 'api/lesson-plan-api';
import FileList from "views/app-views/shared/files";

const { TextArea } = Input;

const AddCommentDialog = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const [item, setItem] = useState({ fileUrl: '', files: '', content: '', fileModels: [], parentId: props.parentId, lessonPlanId: props.planId });

    const handleSubmit = () => {
        setSubmitting(true);
        new LessonPlanApi().saveComment(item).then((response) => {
            message.success(`Cập nhật thành công.`);
            setSubmitting(false);
            props.onClose();
        });
    };

    const selectFiles = () => {
        window.CKFinder.modal({
            chooseFiles: true,
            width: 800,
            height: 600,
            onInit: function (finder) {
                finder.on('files:choose', function (evt) {
                    const currentItem = Object.assign({}, item);

                    evt.data.files.map((file) => {
                        const fileModel = { name: file.attributes.name, extension: file._extenstion, size: file.attributes.size, url: file.attributes.url };
                        currentItem.fileModels.push(fileModel);
                    });

                    currentItem["files"] = JSON.stringify(currentItem.fileModels);
                    setItem({ ...currentItem });
                });
            }
        });
    }

    const removeFile = (file) => {
        item.fileModels = item.fileModels.filter(x => x.url != file.url);
        item["files"] = JSON.stringify(item.fileModels);
        setItem({ ...item });
    };

    const onChange = (e) => {
        const currentItem = Object.assign({}, item);
        currentItem["content"] = e.target.value;
        setItem(currentItem);
    };

    return (
        <Drawer
            title={"Thêm Ý kiến"}
            width={550}
            onClose={props.onClose}
            visible={true}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div
                    style={{
                        textAlign: "right",
                    }}
                >
                    <Button
                        style={{ marginRight: 8 }}
                        onClick={handleSubmit}
                        loading={submitting}
                        type="primary"
                    >
                        Cập nhật
                    </Button>
                </div>
            }
        >
            <Form layout="vertical" hideRequiredMark>
                <Form.Item label="Nội dung">
                    <TextArea rows={6} onChange={onChange} value={item.content} />
                </Form.Item>
                <Form.Item label="File đính kèm">
                    <Button onClick={() => selectFiles()} icon={<CloudUploadOutlined />}>Chọn file</Button>
                    {item.fileModels && (
                        <FileList removeFile={removeFile} viewOnly={false} files={item.fileModels} />
                    )}
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default AddCommentDialog;