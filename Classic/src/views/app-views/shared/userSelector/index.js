import { AutoComplete, Row, Col, Input } from "antd";
import React, { useState } from "react";
import UserApi from "api/user-api";

const UserSelector = (props) => {
  const [options, setOptions] = useState([]);
  const userApi = new UserApi();
  const { onChange, onRemove  } = props;
  const [users, setUsers] = useState([]);

  const removeUser = (value) => {    
    const newUsers = users.filter(i => i != value);
    setUsers(newUsers);
    onRemove(value);
  }

  const handleSelect = (value) => {
    const newUsers = users.slice();
    newUsers.push(value);
    setUsers(newUsers);
    onChange(value);
  };
  
  const handleSearch = async (value) => {

    if (value.length < 2) {
      return;
    }

    let response = await (await userApi.searches({ keyword: value })).data.value;    
    let autoCompleteResult = response.map((item) => ({
      value: item.email,
      label: item.email
    }));    
    setOptions(autoCompleteResult);
  };

  return (
    <>
      <Row>
        <Col span={16}>
          <div>          
          {users.map((item, index) => {
            return (             
                <div style={{ display: "inline-block" }} key={`div-user-${index}`}>
                  <span
                    className="ant-tag"
                    style={{ fontSize: 16, padding: "5px 10px" }}                    
                  >
                    {item}
                    <span
                      role="img"
                      aria-label="close"
                      tabIndex="-1"
                      className="anticon anticon-close ant-tag-close-icon"
                      onClick={() => removeUser(item)}
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="close"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                      </svg>
                    </span>
                  </span>
                </div>
              
          )})}
        </div>
        </Col>
        <Col span={8} style={{ textAlign: "right" }}>
          <AutoComplete
            size="small"
            style={{
              width: '100%',
            }}
            onSearch={handleSearch}
            options={options}
            onSelect={handleSelect}
          >
            <Input.Search size="small" placeholder="Nhập tên người dùng" enterButton />
          </AutoComplete>
        </Col>
      </Row>
    </>
  );
};

export default UserSelector;
