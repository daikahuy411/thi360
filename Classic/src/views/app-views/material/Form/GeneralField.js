import React, { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  TreeSelect,
  message,
  Button,
} from "antd";
import { PostCategoryApi } from "api/catalog-api";
import CkEditor from "views/app-views/shared/ckeditor";
import FileDialog from "views/app-views/shared/fileDialog";

const rules = {
  content: [
    {
      required: true,
      message: "Nhập vào nội dung",
    },
  ],
};

const GeneralField = (props) => {
  const [item, setItem] = useState(null);
  const [categories, setCategories] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    setItem(props.item);
    if (props.item.imageUrl != "" && props.item.imageUrl != null) {
      setFileUrl(props.item.imageUrl);
    }
    getPostCategories();
  }, []);

  const getPostCategories = () => {
    PostCategoryApi.getAll().then((response) => {
      setCategories(response.data);
    });
  };

  const changeCategoryId = (value) => {
    const currentItem = Object.assign({}, item);
    currentItem.categoryId = parseInt(value);
    setItem({ ...currentItem });
    if (props.handleChange) {
      props.handleChange({ ...currentItem });
    }
  };

  const handleFieldChange = (event) => {
    event.persist();
    const currentItem = Object.assign({}, item);
    const targetValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    currentItem[event.target.name] = targetValue;
    setItem({ ...currentItem });
  };

  const openCKFinder = () => {
    window.CKFinder.modal({
      chooseFiles: true,
      width: 800,
      height: 600,
      onInit: function (finder) {
        finder.on('files:choose', function (evt) {
          var file = evt.data.files.first();
          setFileUrl(file.getUrl());
          const currentItem = Object.assign({}, item);
          currentItem.imageUrl = file.getUrl();
          setItem({ ...currentItem });
          if (props.handleChange) {
            props.handleChange({ ...currentItem });
          }
        });
      }
    });
  }

  return (
    <>
      {item && (
        <Row gutter={16}>
          <Col xs={24} sm={24} md={17}>
            <Card title="Nội dung">
              <Form.Item label="Tiêu đề" rules={rules.name}>
                <Input
                  name="name"
                  value={item.name}
                  onChange={handleFieldChange}
                />
              </Form.Item>
              <Form.Item label="Mô tả" rules={rules.name}>
                <Input.TextArea
                  name="description"
                  value={item.description}
                  rows={4}
                  onChange={handleFieldChange}
                />
              </Form.Item>
              <Form.Item label="Nội dung" rules={rules.name}>
                <CkEditor
                  data={item.content}
                  onChange={(data) => {
                    const currentItem = Object.assign({}, item);
                    currentItem.content = data;
                    setItem({ ...currentItem });
                    if (props.handleChange) {
                      props.handleChange({ ...currentItem });
                    }
                  }}
                />
              </Form.Item>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={7}>
            <Card title="File đính kèm">
              <FileDialog onClick={openCKFinder} fileUrl={fileUrl} />
            </Card>
            <Card title="Phân loại">
              <Form.Item name="category" label="Danh mục Tin bài">
                {categories && (
                  <TreeSelect
                    style={{ width: "100%" }}
                    treeData={categories}
                    className="w-100"
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    placeholder="Chọn Danh mục tin bài"
                    allowClear
                    defaultValue={[props.item.categoryName]}
                    treeDefaultExpandAll
                    onChange={(value) => changeCategoryId(value)}
                  ></TreeSelect>
                )}
              </Form.Item>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default GeneralField;
