const navigation = () => {
  return [
    {
      icon: 'mdi:home-outline',
      title: 'Trang chủ',
      path: '/home'
    },
    {
      icon: 'mdi:school-outline',
      title: 'Ôn luyện',
      path: '/program'
    },
    {
      icon: 'mdi:cash',
      title: 'Bảng giá',
      path: '/pricing'
    },
    {
      icon: 'mdi:help-circle-outline',
      title: 'Hướng dẫn',
      path: '/help'
    },
    // {
    //   title: 'Thời khóa biểu',
    //   icon: 'mdi:calendar-blank-outline',
    //   path: '/apps/calendar'
    // },
    {
      sectionTitle: 'LMS'
    },
    {
      title: 'Thi & Kiểm tra',
      icon: 'mdi:trophy-outline',
      children: [
        {
          title: 'Kỳ thi',
          path: '/apps/exam'
        },
        {
          title: 'Danh mục Kỳ thi',
          path: '/apps/exam-category'
        },
        {
          title: 'Bộ Đề thi',
          path: '/apps/test-group'
        },
        {
          title: 'Bộ Câu hỏi',
          path: '/apps/question-catalog'
        }
      ]
    },
    {
      title: 'Lớp & Học viên',
      icon: 'uil:users-alt',
      children: [
        {
          title: 'Lớp học',
          path: '/apps/class'
        },
        {
          title: 'Học viên',
          path: '/apps/user'
        }
      ]
    },
    {
      sectionTitle: 'Hệ thống'
    },
    {
      title: 'Quản trị hệ thống',
      icon: 'fluent-mdl2:system',
      children: [
        {
          title: 'Tổ chức, Đơn vị',
          path: '/apps/organization'
        },
      ]
    },
    {
      title: 'Tenants',
      icon: 'eos-icons:file-system',
      path: '/apps/tenant'
    },
  ]
}

export default navigation
