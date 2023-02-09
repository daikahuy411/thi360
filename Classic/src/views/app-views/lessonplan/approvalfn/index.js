import React, { useState, useEffect } from "react";
import { Descriptions, Badge, Card, Divider, Avatar, Comment, Button, Row, Col, Tooltip } from "antd";
import LessonPlanApi from "api/lesson-plan-api";
import moment from "moment";
import ApprovalDialog from "./dialog";
import {
    PlusOutlined,
    CommentOutlined,
    AuditOutlined,
    TeamOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

const ApprovalFn = (props) => {
    const [item, setItem] = useState(props.item);
    const [approve, setApprove] = useState(false);

    const onClose = () => {
        setApprove(false);
    }

    return (
        <>
            <Button type="primary" onClick={() => setApprove(true)}>
                <AuditOutlined />Phê duyệt
            </Button>
            {approve && <ApprovalDialog
                onSaved={props.onSaved}
                item={props.item}
                onClose={onClose} />}
        </>
    );
};

export default ApprovalFn;