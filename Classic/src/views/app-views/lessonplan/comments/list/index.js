import React, { useState, useEffect } from "react";
import { Descriptions, Badge, Card, Divider, Avatar, Comment, Button, Row, Col, Tooltip } from "antd";
import LessonPlanApi from "api/lesson-plan-api";
import moment from "moment";
import AddCommentDialog from "../add";
import {
  PlusOutlined,
  CommentOutlined,
  TeamOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import FileList from "views/app-views/shared/files";

const renderContent = (comment) => (
  <>
    <div>
      {comment.content}
    </div>
    {comment.fileModels && (
      <FileList viewOnly={true} files={comment.fileModels} />
    )}
  </>
);

const CommentWidget = ({ comment, children, reply }) => (
  <Comment key={`comment-${comment.id}`}
    actions={reply ? [<span key="comment-nested-reply-to" onClick={reply}>Trả lời</span>] : <></>}
    author={<span style={{ fontSize: 15, fontWeight: 'normal' }}>{comment.authorName} ( {comment.userName})</span>}
    avatar={<Avatar alt={comment.authorName} />}
    content={renderContent(comment)}
    datetime={
      <Tooltip title={moment(comment.createdTime).format(
        "YYYY-MM-DD HH:mm"
      )}>
        <span style={{ fontSize: 15, fontWeight: 'normal' }}>{moment(comment.createdTime).toNow()}</span>
      </Tooltip>
    }
  >
    {children}
  </Comment>
);

const CommentList = (props) => {
  const [item, setItem] = useState(null);
  const [addComment, setAddComment] = useState(false);
  const [parentId, setParentId] = useState(0);

  const { param } = props;
  const { id } = param;

  useEffect(() => {
    fetchData();
  }, [param, props]);

  const add = (parentId = 0) => {
    setParentId(parentId);
    setAddComment(true);
  };

  const fetchData = () => {
    const api = new LessonPlanApi();
    api.get(parseInt(id)).then((response) => {
      setItem(response.data);
    });
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" className="ml-2" onClick={() => add()}>
            <PlusOutlined />
            <span>Thêm Ý kiến</span>
          </Button>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={24}>
          <Card>
            {item && item.comments.map((comment, index) => (
              <>
                {index > 0 && <Divider />}
                <CommentWidget key={`comment-widtget-${comment.id}`} comment={comment} reply={() => { add(comment.id) }}>
                  {comment.replies.map((child) => (
                    <CommentWidget key={`comment-widtget-${child.id}`} comment={child} reply={() => { add(child.id) }}>
                      {child.replies.map((last) => (
                        <CommentWidget key={`comment-widtget-${last.id}`} comment={last}>
                        </CommentWidget>
                      ))}
                    </CommentWidget>
                  ))}
                </CommentWidget>
              </>
            ))}
          </Card>
        </Col></Row>
      {addComment && <AddCommentDialog parentId={parentId} planId={id} onClose={() => { setAddComment(false); fetchData(); }} />}
    </>
  );
};

export default CommentList;