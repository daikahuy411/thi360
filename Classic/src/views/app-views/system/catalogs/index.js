import React, { lazy, Suspense } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import InnerAppLayout from "layouts/inner-app-layout";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import CatalogList from "./list";
import { CatalogType } from "types/CatalogType";

const myLessons = [
  {
    name: "Khối lớp",
    key: CatalogType.SCHOOL_BLOCK_CATALOG,
    sub: [],
  },
  {
    name: "Chương trình",
    key: CatalogType.PROGRAM_CATALOG,
    sub: [],
  },
  {
    name: "Môn học",
    key: CatalogType.SUBJECT_CATALOG,
    sub: [],
  },
  {
    name: "Bộ sách",
    key: CatalogType.BOOK_CATALOG,
    sub: [],
  },
];

const dms = [
  {
    name: "Chủ đề",
    key: CatalogType.DOCUMENT_TOPIC,
    sub: [],
  },
  {
    name: "Cơ quan ban hành",
    key: CatalogType.DOCUMENT_ORGANIZATION,
    sub: [],
  },
  {
    name: "Chức danh lãnh đạo",
    key: CatalogType.DOCUMENT_POSITION,
    sub: [],
  },
  {
    name: "Lĩnh vực",
    key: CatalogType.DOCUMENT_AREA,
    sub: [],
  },
  {
    name: "Người ký",
    key: CatalogType.DOCUMENT_SIGNER,
    sub: [],
  },
];

const prefix = "/lms/modules/system/catalogs/";

const SystemsMenu = (props) => {
  const { match, location } = props;
  return (
    <div className="w-100">
      <Menu mode="inline" selectedKeys={[location.pathname]}>
        <Menu.ItemGroup title="Đào tạo">
          {myLessons.map((elm) => {
            return (
              <Menu.Item key={`${prefix}${elm.key}`}>
                <span>{elm.name}</span>
                <Link to={`${prefix}${elm.key}`} />
              </Menu.Item>
            );
          })}
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Văn bản">
          {dms.map((elm) => {
            return (
              <Menu.Item key={`${prefix}${elm.key}`}>
                <span>{elm.name}</span>
                <Link to={`${prefix}${elm.key}`} />
              </Menu.Item>
            );
          })}
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
};

const Catalogs = (props) => {
  const { match } = props;
  return (
    <InnerAppLayout
      sideContent={<SystemsMenu {...props} />}
      mainContent={
        <div className="p-4">
          <div className="container-fluid">
            <Suspense fallback={<Loading />}>
              <Switch>
                {myLessons.map((elm) => (
                  <Route
                    key={elm.key}
                    path={`${prefix}${elm.key}`}
                    render={(props) => (
                      <CatalogList type={elm.key} {...props} />
                    )}
                  />
                ))}
                {dms.map((elm) => (
                  <Route
                    key={elm.key}
                    path={`${prefix}${elm.key}`}
                    render={(props) => (
                      <CatalogList type={elm.key} {...props} />
                    )}
                  />
                ))}
                <Redirect
                  exact
                  from={`${match.url}`}
                  to={`${prefix}${CatalogType.SCHOOL_BLOCK_CATALOG}`}
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

export default Catalogs;
