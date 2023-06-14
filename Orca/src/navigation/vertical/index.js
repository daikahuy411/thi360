const navigation = () => {
  return [
    {
      icon: 'mdi:home-outline',
      title: 'Trang chủ',
      path: '/home'
    },
    {
      icon: 'mdi:home-outline',
      title: 'Ôn luyện',
      path: '/program'
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
    }
  ]
}

export default navigation
