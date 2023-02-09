import React, { lazy, Suspense } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import InnerAppLayout from "layouts/inner-app-layout";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { withRouter } from "react-router-dom";
import UserList from "./list/users";
import OrgList from "./list/orgs";

const menuList = [
  {
    name: "Người dùng",
    key: "users",
    sub: [],
  },
  {
    name: "Đơn vị",
    key: "orgs",
    sub: [],
  },
];

const prefix = "/lms/modules/myoffice/document/edit/";

const AssigneeTypeMenu = (props) => {
  const { match, location, param } = props;
  return (
    <div className="w-100">
      <Menu mode="inline" selectedKeys={[location.pathname]}>
        {menuList.map((elm) => {
          return (
            <Menu.Item key={`${prefix}${param.id}/permissions/${elm.key}`}>
              <span>{elm.name}</span>
              <Link to={`${prefix}${param.id}/permissions/${elm.key}`} />
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

const Permissions = (props) => {
  const { match, param } = props;
  return (
    <InnerAppLayout
      sideContent={<AssigneeTypeMenu {...props} />}
      mainContent={
        <div className="p-4">
          <div className="container-fluid">
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route
                  key={`users`}
                  path={`${prefix}${param.id}/permissions/users`}
                  render={(props) => <UserList documentId={param.id} />}
                />
                <Route
                  key={"orgs"}
                  path={`${prefix}${param.id}/permissions/orgs`}
                  render={(props) => <OrgList documentId={param.id} />}
                />
                <Redirect
                  exact
                  from={`${match.url}`}
                  to={`${prefix}${param.id}/permissions/users`}
                />
              </Switch>
            </Suspense>
          </div>
        </div>
      }
      sideContentWidth={300}
      sideContentGutter={false}
      border
    />
  );
};

export default withRouter(Permissions);
