import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${APP_PREFIX_PATH}/modules/home`}
          component={lazy(() => import(`./home`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/mystudies/exams/examcategories`}
          component={lazy(() => import(`./examcategory`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/mystudies/courses/coursecategories`}
          component={lazy(() => import(`./coursecategory`))}
        />
         <Route
          path={`${APP_PREFIX_PATH}/modules/mystudies/exams/questioncatalogs`}
          component={lazy(() => import(`./questioncatalog`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/mystudies/courses`}
          component={lazy(() => import(`./course`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/mystudies/exams`}
          component={lazy(() => import(`./exam`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/mystudies/examitems`}
          component={lazy(() => import(`./examitem`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/system/classes`}
          component={lazy(() => import(`./class`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/system/organizations`}
          component={lazy(() => import(`./organization`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/myoffice/news/posts`}
          component={lazy(() => import(`./post`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/myoffice/news/postcategories`}
          component={lazy(() => import(`./postcategory`))}
        />
        {/* Thông báo */}
        <Route
          path={`${APP_PREFIX_PATH}/modules/myoffice/announcement`}
          component={lazy(() => import(`./announcement`))}
        />
        {/* Quan ly cong viec */}
        <Route
          path={`${APP_PREFIX_PATH}/modules/myoffice/task`}
          component={lazy(() => import(`./task`))}
        />
        {/* Thu vien so */}
        <Route
          path={`${APP_PREFIX_PATH}/modules/mylesson/librarycategory`}
          component={lazy(() => import(`./librarycategory`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/mylesson/library`}
          component={lazy(() => import(`./library`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/mylesson/material`}
          component={lazy(() => import(`./material`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/mylesson/materialcategory`}
          component={lazy(() => import(`./materialcategory`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/system`}
          component={lazy(() => import(`./system`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/mylesson/lessonplans`}
          component={lazy(() => import(`./lessonplan`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/myoffice/attendances`}
          component={lazy(() => import(`./attandance`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/myoffice/document`}
          component={lazy(() => import(`./document`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/modules/mystudies/courses`}
          component={lazy(() => import(`./course`))}
        />
        {/* Below rule must be the last */}
       
      </Switch>
    </Suspense>
  );
};

export default AppViews;
