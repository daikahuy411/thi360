import {
  DashboardOutlined,
  TrophyOutlined,
  SolutionOutlined,
  AuditOutlined,
  TagOutlined,
  SettingOutlined,
  ReadOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import Role from "enum/Role";


const modulesNavTree = [
  {
    key: "home",
    path: `${APP_PREFIX_PATH}/modules/home`,
    title: "sidenav.apps.dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
    module: "modules/home",
    roles: [],
  },
  {
    key: "myoffice",
    path: `${APP_PREFIX_PATH}/modules/myoffice/news/posts`,
    title: "sidenav.apps.modules.myOffice",
    icon: ThunderboltOutlined,
    breadcrumb: false,
    submenu: [],
    module: "myoffice",
    roles: [Role.ADMINISTRATOR, Role.TEACHER],
  },
  // {
  //   key: "attendanceModule",
  //   path: `${APP_PREFIX_PATH}/modules/attendances`,
  //   title: "sidenav.apps.modules.attendance",
  //   icon: SolutionOutlined,
  //   breadcrumb: false,
  //   submenu: [],
  //   module: "modules/attendance",
  //   roles: [Role.ADMINISTRATOR, Role.TEACHER],
  // },
  {
    key: "mylesson",
    path: `${APP_PREFIX_PATH}/modules/mylesson/lessonplans`,
    title: "sidenav.apps.modules.lessonplan",
    icon: AuditOutlined,
    breadcrumb: false,
    submenu: [],
    module: "mylesson",
    roles: [Role.ADMINISTRATOR, Role.TEACHER, Role.APPROVAL, Role.MANAGER],
  },
  {
    key: "myStudiesModule",
    path: `${APP_PREFIX_PATH}/modules/mystudies/exams`,
    title: "sidenav.apps.modules.assignment",
    icon: TrophyOutlined,
    breadcrumb: false,
    submenu: [],
    module: "mystudies",
    roles: [Role.ADMINISTRATOR],
  },
  // {
  //   key: "courseModule",
  //   title: "sidenav.apps.modules.course",
  //   breadcrumb: true,
  //   path: `${APP_PREFIX_PATH}/courses`,
  //   icon: TagOutlined,
  //   submenu: [],
  //   module: "modules/course",
  // },
  // {
  //   key: "postsModule",
  //   title: "sidenav.apps.modules.post",
  //   breadcrumb: true,
  //   path: `${APP_PREFIX_PATH}/modules/myoffice/news/posts`,
  //   icon: ReadOutlined,
  //   submenu: [],
  //   module: "modules/news",
  //   roles: [Role.ADMINISTRATOR, Role.TEACHER],
  // },  
  {
    key: "systemModule",
    path: `${APP_PREFIX_PATH}/modules/system`,
    title: "sidenav.apps.modules.system",
    icon: SettingOutlined,
    breadcrumb: false,
    submenu: [],
    module: "modules/system",
    roles: [Role.ADMINISTRATOR],
  },
];

const modulesConfig = [...modulesNavTree];

export default modulesConfig;
