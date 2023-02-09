import React, { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Radio,
  Upload,
  TreeSelect,
  message,
  Button,
} from "antd";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import {
  LoadingOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Answers from "./Answers";
import { QuestionType } from "types/QuestionType";
import QuestionApi from "api/question-api";
import { QuestionCategoryApi } from "api/catalog-api";
import CkEditor from "views/app-views/shared/ckeditor";
import FillTheBlankEditor from "./Editor/FillTheBlank";

const { Dragger } = Upload;
const { TextArea } = Input;

const rules = {
  content: [
    {
      required: true,
      message: "Nhập vào nội dung câu hỏi",
    },
  ],
};

const GeneralField = (props) => {
  const [item, setItem] = useState(null);
  const [categories, setCategories] = useState(null);
  const [openFBEditor, setOpenFBEditor] = useState(false);

  useEffect(() => {
    setItem(props.item);
    getQuestionCategories();
  }, [props.item]);

  const getQuestionCategories = () => {
    QuestionCategoryApi.getCategoriesByCatalogId(props.item.catalogId).then(
      (response) => {
        setCategories(response.data);
      }
    );
  };

  const changeCategoryId = (value) => {
    const currentItem = Object.assign({}, item);
    currentItem.categoryId = parseInt(value);
    setItem({ ...currentItem });
    if (props.handleChange) {
      props.handleChange({ ...currentItem });
    }
  };

  const addAnswer = () => {
    var newAnswer = new QuestionApi().createAnswer(
      -(item.answers.length + 1),
      item.answers.length + 1,
      "",
      false
    );
    item.answers.push(newAnswer);
    setItem({ ...item });
  };

  return (
    <>
      {item && (
        <Row gutter={16}>
          <Col xs={24} sm={24} md={17}>
            <Card title="Câu hỏi">
              <Form.Item label="Loại câu hỏi" rules={rules.name}>
                <Radio.Group defaultValue="a" size="medium">
                  <Radio.Button value="a">
                    {props.item.questionTypeName}
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
              {item && item.questionTypeId !== QuestionType.FB && (
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
              )}
              {item && item.questionTypeId === QuestionType.FB && (
                <>
                  <Form.Item label="Nội dung">
                    <TextArea
                      name="content"
                      onChange={(event) => {
                        const currentItem = Object.assign({}, item);
                        currentItem.content = event.target.value;
                        setItem({ ...currentItem });
                        if (props.handleChange) {
                          props.handleChange({ ...currentItem });
                        }
                      }}
                      rows={6}
                      value={item.content}
                    />
                  </Form.Item>
                  <Form.Item>
                    <p className="text-muted">
                      Định dạng [Trả lời 1; Trả lời 2;~Trả lời 3], sử dụng ~
                      trước đáp án để đánh dấu là đáp án sai.
                    </p>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      onClick={() => {
                        setOpenFBEditor(true);
                      }}
                      className="w-100"
                    >
                      <SettingOutlined /> Cấu hình nâng cao
                    </Button>
                  </Form.Item>
                </>
              )}
            </Card>
            {item &&
              item.questionTypeId !== QuestionType.SA &&
              item.questionTypeId !== QuestionType.FB &&
              item.questionTypeId !== QuestionType.GQ && (
                <Card title="Đáp án">
                  <Answers
                    handleChange={props.handleChange}
                    key={"question-child-anws"}
                    item={item}
                  />
                  {item.questionTypeId !== QuestionType.TF && (
                    <>
                      <br />
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => {
                            addAnswer();
                          }}
                          className="w-100"
                        >
                          <PlusOutlined /> Thêm Đáp án
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Card>
              )}
          </Col>
          <Col xs={24} sm={24} md={7}>
            <Card title="File đính kèm">
              <Dragger onChange={(e) => props.handleUploadChange(e)}>
                {props.uploadedImg ? (
                  <img
                    src={props.uploadedImg}
                    alt="avatar"
                    className="img-fluid"
                  />
                ) : (
                  <div>
                    {props.uploadLoading ? (
                      <div>
                        <LoadingOutlined className="font-size-xxl text-primary" />
                        <div className="mt-3">Uploading</div>
                      </div>
                    ) : (
                      <div>
                        <CustomIcon className="display-3" svg={ImageSvg} />
                        <p>Click or drag file to upload</p>
                      </div>
                    )}
                  </div>
                )}
              </Dragger>
            </Card>
            {props.item.parentId == 0 && (
              <Card title="Phân loại">
                <Form.Item name="category" label="Danh mục câu hỏi">
                  {categories && (
                    <TreeSelect
                      style={{ width: "100%" }}
                      treeData={categories}
                      className="w-100"
                      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                      placeholder="Chọn Danh mục câu hỏi"
                      allowClear
                      defaultValue={[props.item.categoryName]}
                      treeDefaultExpandAll
                      onChange={(value) => changeCategoryId(value)}
                    ></TreeSelect>
                  )}
                </Form.Item>
              </Card>
            )}
          </Col>
        </Row>
      )}
      {openFBEditor && (
        <FillTheBlankEditor
          question={item}
          // onOK={this.onQuestionSelected}
          onClose={() => {
            setOpenFBEditor(false);
          }}
        />
      )}
    </>
  );
};

export default GeneralField;
