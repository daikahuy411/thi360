export const studentLinks = [
  {
    icon: 'mdi:home-outline',
    title: 'Trang chủ',
    path: '/home'
  },
  {
    icon: 'mdi:trophy-outline',
    title: 'Chương trình',
    path: '/program',
    children: [
      {
        title: 'Lớp 6',
        path: '/program/6/'
      },
      {
        title: 'Lớp 7',
        path: '/program/7/'
      },
      {
        title: 'Lớp 8',
        path: '/program/8/'
      },
      {
        title: 'Lớp 9',
        path: '/program/9/'
      },
      {
        title: 'Lớp 10',
        path: '/program/10/'
      },
      {
        title: 'Lớp 11',
        path: '/program/11/'
      },
      {
        title: 'Lớp 12',
        path: '/program/12/'
      },
      {
        title: 'Thi thử THPT quốc gia',
        path: '/program/15/'
      },
      {
        title: 'Luyện thi TOEIC',
        path: '/program/35/'
      }
    ]
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
  {
    title: 'Thời khóa biểu',
    icon: 'mdi:calendar-blank-outline',
    path: '/apps/calendar'
  }
]

export const hostLinks = [
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
      }
    ]
  },
  {
    title: 'Tenants',
    icon: 'eos-icons:file-system',
    path: '/apps/tenant'
  }
]

export const teacherLinks = [
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
