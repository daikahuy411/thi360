import React, { useState } from 'react';
import {
    CloudUploadOutlined, DeleteOutlined,
    PlusOutlined,
    LikeOutlined,
    DislikeOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Form, Input, Drawer, message } from 'antd';
import LessonPlanApi from 'api/lesson-plan-api';

const { TextArea } = Input;

const ApprovalDialog = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const [item, setItem] = useState({ PlanReviewerId: props.item.lessonPlanReviewerId, PlanId: props.item.id, Content: '', FileUrl: '' });
    const [fileName, setFileName] = useState('');

    const handleSubmit = (approve) => {
        setSubmitting(true);
        item.Status = (approve) ? 1 : 2;
        new LessonPlanApi().appprove(item).then((response) => {
            message.success(`Cập nhật thành công.`);
            setSubmitting(false);
            props.onClose();
            if (props.onSaved) {
                props.onSaved();
            }
        });
    };

    const openCKFinder = () => {
        window.CKFinder.modal({
            chooseFiles: true,
            width: 800,
            height: 600,
            onInit: function (finder) {
                finder.on('files:choose', function (evt) {
                    var file = evt.data.files.first();
                    const currentItem = Object.assign({}, item);
                    currentItem['fileUrl'] = JSON.stringify({ name: file.attributes.name, extension: file._extenstion, size: file.attributes.size, url: file.attributes.url });
                    setItem(currentItem);
                    setFileName(file.attributes.name);
                });
            }
        });
    }

    const removeFile = (fieldName) => {
        const currentItem = Object.assign({}, item);
        currentItem[fieldName] = '';
        setItem(currentItem);
        setFileName('');
    };

    const onChange = (e) => {
        const currentItem = Object.assign({}, item);
        currentItem["Content"] = e.target.value;
        setItem(currentItem);
    };

    return (
        <Drawer
            title={"Phê duyệt"}
            width={450}
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
                        onClick={() => { handleSubmit(false) }}
                        loading={submitting}
                        type="primary"
                        danger
                    >
                        <DislikeOutlined />&nbsp;
                        Từ chối Duyệt
                    </Button>
                    &nbsp;
                    <Button
                        style={{ marginRight: 8 }}
                        onClick={() => { handleSubmit(true) }}
                        loading={submitting}
                        type="primary"
                    >
                        <LikeOutlined />&nbsp;
                        Đồng ý Duyệt
                    </Button>
                </div>
            }
        >
            <Form layout="vertical" hideRequiredMark>
                <Form.Item label="Nội dung" name={"Content"}>
                    <TextArea rows={4} onChange={onChange} value={item.Content} />
                </Form.Item>
                <Form.Item label="File đính kèm">
                    <Input.Group compact style={{ width: '100%' }}>
                        <Input readOnly value={fileName} style={{ width: 'calc(100% - 200px)' }} />
                        <Button onClick={() => removeFile('FileUrl')}>
                            <DeleteOutlined color="red" />&nbsp;Xóa
                        </Button>
                        <Button onClick={() => openCKFinder('FileUrl')}>
                            <CloudUploadOutlined />&nbsp;Chọn
                        </Button>
                    </Input.Group>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default ApprovalDialog;