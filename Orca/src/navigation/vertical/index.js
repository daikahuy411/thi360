const navigation = () => {
  return [
    // {
    //   sectionTitle: 'Apps & Pages'
    // },
    {
      icon: 'mdi:home-outline',
      title: 'Trang chủ',
      path: '/dashboards/crm'
    },
    {
      title: 'Thời khóa biểu',
      icon: 'mdi:calendar-blank-outline',
      path: '/apps/calendar'
    },
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
          title: 'Bộ Đề thi',
          path: '/apps/test-group'
        },
        {
          title: 'Bộ Câu hỏi',
          path: '/apps/question-catalog'
        },
        {
          title: 'Danh mục Kỳ thi',
          path: '/apps/exam-category'
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
    }
  ]
}

export default navigation
