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

const prefix = "/lms/modules/mystudies/courses/edit/";

const AssigneeTypeMenu = (props) => {
  const { match, location, param } = props;
  return (
    <div className="w-100">
      <Menu mode="inline" selectedKeys={[location.pathname]}>
        {menuList.map((elm) => {
          return (
            <Menu.Item key={`${prefix}${param.id}/assignees/${elm.key}`}>
              <span>{elm.name}</span>
              <Link to={`${prefix}${param.id}/assignees/${elm.key}`} />
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

const Assignees = (props) => {
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
                  path={`${prefix}${param.id}/assignees/users`}
                  render={(props) => <UserList courseId={param.id} />}
                />
                <Route
                  key={"orgs"}
                  path={`${prefix}${param.id}/assignees/orgs`}
                  render={(props) => <OrgList courseId={param.id} />}
                />
                {/* {menuList.map((elm) => (
                  <Route
                    key={elm.key}
                    path={`${prefix}${param.id}/assignees/${elm.key}`}
                    component={lazy(() => import(`./list/${elm.key}`))}
                  />
                ))} */}
                <Redirect
                  exact
                  from={`${match.url}`}
                  to={`${prefix}${param.id}/assignees/users`}
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

export default withRouter(Assignees);
