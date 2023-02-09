import {
  Drawer,
  Form,
  DatePicker,
  Button,
  Col,
  Radio,
  Row,
  Input,
  message,
  Checkbox,
} from "antd";
import UserApi from "api/user-api";
import TaskApi from "api/task-api";
import React, { useState, useEffect } from "react";
import { Select } from "antd";
import moment from "moment";
import UserSelector from "views/app-views/shared/userSelector";


const dateFormat = "DD-MM-YYYY";
const { Option } = Select;

const TaskFormEdit = (props) => {
  const [isValidForm, setIsValidForm] = useState(false);
  const [isRootTask, setIsRootTask] = useState(true);
  const [item, setItem] = useState({ id: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [form] = Form.useForm();
  const [editSubtask, setEditSubTask] = useState(false);
  const [taskContainers, setTaskContainers] = useState([]);

  const taskApi = new TaskApi();
  let selectedUsers = [];

  useEffect(() => {
    if (props.id != 0) {
      // new UserApi().getUserProfile(props.id).then((response) => {
      //   setItem(response.data);
      // });
    }

    taskApi.getContainers().then((response) => {
      setTaskContainers(response.data);
    });
  }, [props.id]);

  useEffect(() => {
    validateForm();
  }, [item]);

  const handleChange = (event) => {
    validateForm();
    const currentItem = Object.assign({}, item);
    const targetValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    currentItem[event.target.name] = targetValue;
    setItem(currentItem);
  };

  const handleUserRemove = (value) => {    
    selectedUsers = selectedUsers.filter(u => u != value);    
  }

  const handleUserSelectChange = (value) => {    
    selectedUsers.push(value);    
  }

  const handleContainerChange = (value) => {
    const currentItem = Object.assign({}, item);    
    if (value == null || value == "") {
      currentItem["projectId"] = 0;
      currentItem["parentId"] = 0;
      setIsRootTask(true);
      return;
    }  

    let segments = value.split("-");
    console.log(segments);
    if(segments[1] === 'true') {
      currentItem["projectId"] = segments[0];      
      setIsRootTask(true);
    }
    else {
      currentItem["parentId"] = segments[0];
      setIsRootTask(false);
    }    
  }

  const handleDateChange = (fieldName, value) => {
    const currentItem = Object.assign({}, item);
    currentItem[fieldName] = value;
    setItem({ ...currentItem });
  };

  const handleSelectChange = (field, value) => {
    const currentItem = Object.assign({}, item);
    currentItem[field] = value;
    setItem({ ...currentItem });
    if (props.handleChange) {
      props.handleChange(currentItem);
    }
  };

  const addSub = () => {
    setEditSubTask(true);
    if (props.onAddSub) {
      props.onAddSub();
    }
  };

  const addOrRemoveRole = (checked, role) => {
    let currentItem = item;
    currentItem.roles = item.roles || [];
    if (checked && currentItem.roles.indexOf(role) < 0) {
      currentItem.roles.push(role);
    }
    if (!checked && currentItem.roles.indexOf(role) >= 0) {
      currentItem.roles.splice(currentItem.roles.indexOf(role), 1);
    }
    setItem({ ...currentItem });
  };

  const validateForm = () => {
    form
      .validateFields(["firstName", "lastName", "userName", "passwordHash"])
      .then((values) => {
        setIsValidForm(true);
      })
      .catch((errorInfo) => {
        if (
          errorInfo &&
          errorInfo.errorFields &&
          errorInfo.errorFields.length > 0
        ) {
          setIsValidForm(false);
        }
      });
  };

  const resetForm = () => {
    let cloneItem = { ...item };
    cloneItem.userName = "";
    cloneItem.firstName = "";
    cloneItem.lastName = "";
    cloneItem.email = "";
    cloneItem.mobile = "";
    cloneItem.address = "";
    setItem({ ...cloneItem });
  };

  const onAdd = (isContinue) => {
    validateForm();

    setIsLoading(isContinue ? false : true);
    setIsLoading1(isContinue ? false : true);

    const currentItem = Object.assign({}, item);    
  };

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      autoComplete="off"
      initialValues={item}
    >
      <Row gutter={8}>
        <Col span={24}>
          <Form.Item name="lastName" label="Tên công việc">
            <Input
              name="name"
              placeholder=""
              value={item.name}
              onChange={(event) => {
                handleChange(event);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="parentId"            
            label="Dự án hoặc công việc cha"
          >
            <Select
              onChange={(value) => handleContainerChange(value)}
              style={{ width: '100%' }}
              placeholder="Chọn dự án hoặc công việc cha"
              value={item.projectId != null ? item.projectId + "-true" : item.parentId + "-false"}
            >
              <Option key="task-container-item-0" value={0}>Chọn dự án hoặc công việc cha</Option>
              {taskContainers && taskContainers.map((taskContainer: any) => (
                <Option key={`task-container-${taskContainer.isProject}-${taskContainer.id}`} value={`${taskContainer.id}-${taskContainer.isProject}`}>{taskContainer.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Loại công việc">
            <Radio.Group name="type" defaultValue={1} buttonStyle="solid" 
              value={item.type} onChange={(value) => handleSelectChange("type", value)}
              key={`radion-type-${item.type}`} >
              <Radio.Button value={1} >Việc cá nhân</Radio.Button>
              <Radio.Button value={2} >Giao việc</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Trạng thái công việc">
            <Select
              onChange={(value) => handleSelectChange("status", value)}             
              name="status"
              value={item.status}
              defaultValue={1}
              placeholder=""
              key={`radion-task-status-${item.status}`}
            >              
              <Option value={1}>
                Đang diễn ra
              </Option>
              <Option value={2}>
                Hoàn thành
              </Option>
              <Option value={3}>
                Quá hạn
              </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Ngày bắt đầu">         
            <DatePicker
              className="w-100"
              placeholder="Chọn ngày"
              showTime={false}
              onChange={(value, format) => {
                handleDateChange("startDate", value);
              }}
              name="startDate"
              format={dateFormat}
              value={moment(item.startDate)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Hạn hoàn thành">
            <DatePicker
              className="w-100"
              placeholder="Chọn ngày"
              showTime={false}
              onChange={(value, format) => {
                handleDateChange("endDate", value);
              }}
              name="endDate"
              format={dateFormat}
              value={moment(item.endDate)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Độ ưu tiên">
            <Select
              onChange={(value) => handleSelectChange("priority", value)}
              name="priority"
              value={item.priority}
              defaultValue={1}
              placeholder=""
            >
              <Option key={"urgent-2"} value={1}>
                Thấp
              </Option>
              <Option key={"urgent-1"} value={2}>
                Trung bình
              </Option>
              <Option key={"urgent-3"} value={3}>
                Cao
              </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Người thực hiện">
            <UserSelector onChange={(value) => handleUserSelectChange(value)}  
                          onRemove={(value) => handleUserRemove(value)}/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Mô tả">
            <Input.TextArea
              name="phoneNumber"
              rows={6}
              value={item.phoneNumber}
              onChange={handleChange}
              placeholder=""
            />
          </Form.Item>
        </Col>
        {
          isRootTask ? <Col span={24} >
            <Form.Item label="Công việc con"></Form.Item>
            <Button onClick={addSub}>Thêm công việc con</Button>
          </Col> : ""
        }        
      </Row>
    </Form>
  );
};

export default TaskFormEdit;
