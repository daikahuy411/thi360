enum Role {
  STUDENT = 'Student',
  Parent = "Parent",
  Security = "Security",
  LibraryStaff = "LibraryStaff",
  KitchenStaff = "KitchenStaff",
  SUBJECTTEACHER = 'SubjectTeacher',
  TEACHER = 'Teacher',
  GroupLeader = "GroupLeader",
  EDITOR = 'Editor',
  MANAGER = 'Manager',
  ADMINISTRATOR = 'Administrator',
  HOST = 'Host',
}

export const Roles = [
  Role.STUDENT,
  Role.Parent,
  Role.TEACHER,
  Role.SUBJECTTEACHER,
  Role.GroupLeader,
  Role.LibraryStaff,
  Role.KitchenStaff,
  Role.Security,
  Role.EDITOR,
  Role.MANAGER,
  Role.ADMINISTRATOR,
  Role.HOST];

export default Role;

export const getRoleName = (role: Role) => {
  switch (role) {
    case Role.HOST:
      return "Quản trị Hệ thống";
    case Role.ADMINISTRATOR:
      return "Quản trị Nhà trường";
    case Role.TEACHER:
      return "Giáo viên chủ nhiệm";
    case Role.SUBJECTTEACHER:
      return "Giáo viên bộ môn";
    case Role.Parent:
      return "Phụ huynh";
    case Role.STUDENT:
      return "Học sinh";
    case Role.GroupLeader:
      return "Tổ trưởng bộ môn";
    case Role.EDITOR:
      return "Văn thư";
    case Role.MANAGER:
      return "Ban giám hiệu";
    case Role.LibraryStaff:
      return "NV thư viện";
    case Role.KitchenStaff:
      return "NV nhà bếp";
    case Role.Security:
      return "Bảo vệ";
  }
}