import React, { useState } from "react";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Form, Input, Drawer, message } from "antd";
import FileList from "views/app-views/shared/files";
import CourseApi from "api/course-api";

const { TextArea } = Input;

const EdiAnnouncementDialog = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [item, setItem] = useState(props.item);

  const handleSubmit = () => {
    setSubmitting(true);
    new CourseApi().saveCourseAnnouncement(item).then((response) => {
      message.success(`Cập nhật thành công.`);
      setSubmitting(false);
      props.onSaved();
    });
  };

  const selectFiles = () => {
    window.CKFinder.modal({
      chooseFiles: true,
      width: 800,
      height: 600,
      onInit: function (finder) {
        finder.on("files:choose", function (evt) {
          const currentItem = Object.assign({}, item);

          evt.data.files.map((file) => {
            const fileModel = {
              name: file.attributes.name,
              extension: file._extenstion,
              size: file.attributes.size,
              url: file.attributes.url,
            };
            currentItem.fileModels.push(fileModel);
          });

          currentItem["files"] = JSON.stringify(currentItem.fileModels);
          setItem({ ...currentItem });
        });
      },
    });
  };

  const removeFile = (file) => {
    item.fileModels = item.fileModels.filter((x) => x.url != file.url);
    item["files"] = JSON.stringify(item.fileModels);
    setItem({ ...item });
  };

  const handleChange = (event) => {
    const currentItem = Object.assign({}, item);
    const targetValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    currentItem[event.target.name] = targetValue;
    setItem({ ...currentItem });
  };

  return (
    <Drawer
      title={"Thêm/sửa Thông báo"}
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
        <Form.Item label="Tiêu đề">
          <Input name="name" onChange={handleChange} value={item.name} />
        </Form.Item>
        <Form.Item label="Nội dung">
          <TextArea
            name="content"
            rows={6}
            onChange={handleChange}
            value={item.content}
          />
        </Form.Item>
        <Form.Item label="File đính kèm">
          <Button onClick={() => selectFiles()} icon={<CloudUploadOutlined />}>
            Chọn file
          </Button>
          {item.fileModels && (
            <FileList
              removeFile={removeFile}
              viewOnly={false}
              files={item.fileModels}
            />
          )}
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EdiAnnouncementDialog;
