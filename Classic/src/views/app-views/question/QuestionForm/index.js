import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import ChildrenQuestions from "./ChildrenQuestions";
import QuestionApi from "api/question-api";
import { QuestionType } from "types/QuestionType";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ADD = "ADD";
const EDIT = "EDIT";

const QuestionForm = (props) => {
  const { mode = ADD, param } = props;

  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [typeCode, setTypeCode] = useState(null);
  const [item, setItem] = useState(null);
  const [editItem, setEditItem] = useState(null);

  let history = useHistory();

  useEffect(() => {
    const questionApi = new QuestionApi();
    if (mode === ADD) {
      const { typeCode, catalogId, parentId } = param;
      setTypeCode(typeCode);
      const item = questionApi.createQuestion({ id: parseInt(typeCode) });
      item.catalogId = parseInt(catalogId);
      if (parentId) {
        item.parentId = parseInt(parentId);
      }
      setItem(item);
      setEditItem(item);
    }
    if (mode === EDIT) {
      const { id } = param;
      questionApi.get(parseInt(id)).then((response) => {
        setItem(response.data);
        setEditItem(response.data);
      });
    }
  }, [form, mode, param, props]);

  const goBack = () => {
    const { typeCode, catalogId, parentId } = param;
    if (editItem.parentId == 0) {
      history.push(
        `/lms/modules/assignment/questioncatalogs/questions/list/${catalogId}/questions`
      );
    } else {
      history.push(
        `/lms/modules/assignment/questioncatalogs/questions/edit/${editItem.parentId}/${catalogId}`
      );
    }
  };

  const handleUploadChange = (info) => {
    if (info.file.status === "uploading") {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage(imageUrl);
        setUploadLoading(true);
      });
    }
  };

  const handleChange = (item) => {
    setEditItem(item);
  };

  const onFinish = () => {
    setSubmitLoading(true);
    new QuestionApi().save(editItem).then((response) => {
      setSubmitLoading(false);
      if (mode === ADD) {
        message.success(`Tạo câu hỏi thành công.`);
      }
      if (mode === EDIT) {
        message.success(`Cập nhật câu hỏi thành công.`);
      }
      goBack();
    });
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h4 className="mb-3">
                {mode === "ADD" ? "Thêm mới câu hỏi" : `Sửa câu hỏi`}
              </h4>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => {
                    goBack();
                  }}
                >
                  Hủy bỏ
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === "ADD" ? "Thêm mới" : `Cập nhật`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="Thông tin chung" key="1">
              {item && (
                <GeneralField
                  handleChange={handleChange}
                  item={item}
                  typeCode={typeCode}
                  uploadedImg={uploadedImg}
                  uploadLoading={uploadLoading}
                  handleUploadChange={handleUploadChange}
                />
              )}
            </TabPane>
            {item && item.questionTypeId === QuestionType.GQ && (
              <TabPane tab="Câu hỏi con" key="2">
                <ChildrenQuestions parent={item} />
              </TabPane>
            )}
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default QuestionForm;
