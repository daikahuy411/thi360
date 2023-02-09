import React, { useState } from 'react';
import { Avatar, Button, Form, Input, Drawer, message } from 'antd';
import { Configuration } from 'configs';

const ViewOnlineDialog = (props) => {
    return (
        <Drawer
            title={`${props.file.name}`}
            width={global.window.innerWidth}
            onClose={props.onClose}
            visible={true}
            bodyStyle={{ paddingBottom: 0 }}
        >
            <iframe src={`http://docs.google.com/viewer?embedded=true&url=${Configuration.domain}${props.file.url}`}
                style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
        </Drawer>
    );
};

export default ViewOnlineDialog;