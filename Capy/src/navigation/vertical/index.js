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
          path: '/pages/wizard-examples/checkout'
        },
        {
          title: 'Ngân hàng Câu hỏi',
          path: '/pages/wizard-examples/property-listing'
        },
        {
          title: 'Danh mục Kỳ thi',
          path: '/pages/wizard-examples/create-deal'
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
          path: '/apps/user/list'
        }
      ]
    }
  ]
}

export default navigation
