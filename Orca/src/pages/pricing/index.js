import * as React from 'react'
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import PricingCTA from './PricingCTA'
import PricingTable from './PricingTable'
import PricingHeader from './PricingHeader'
import PricingFooter from './PricingFooter'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import Tab from '@mui/material/Tab'
import AddPaymentDrawer from './AddPaymentDrawer'
import Grid from '@mui/material/Grid'
import PlanDetails from '@core/components/plan-details'
import V1Api from 'api/v1-api'
import Alert from '@mui/material/Alert'
import Icon from '@core/components/icon'
import AlertTitle from '@mui/material/AlertTitle'
import Typography from '@mui/material/Typography'

const data = {
  pricingPlans: {
    student: [
      {
        title: 'Miễn phí',
        monthlyPrice: 0,
        currentPlan: true,
        popularPlan: false,
        subtitle: 'A simple start for everyone',
        imgSrc: '/images/pages/pricing-tree-1.png',
        yearlyPlan: {
          perMonth: 0,
          totalAnnual: 0
        },
        planBenefits: ['5 luyện tập mỗi ngày', 'Truy cập chương trình THPT, THCS']
      },
      {
        monthlyPrice: 60,
        title: 'Standard',
        popularPlan: true,
        currentPlan: false,
        subtitle: 'For small to medium businesses',
        imgSrc: '/images/pages/pricing-tree-2.png',
        yearlyPlan: {
          perMonth: 40,
          totalAnnual: 480
        },
        planBenefits: ['30 luyện tập mỗi ngày', 'Truy cập chương trình THPT, THCS, TOEIC']
      }
      // {
      //   monthlyPrice: 99,
      //   popularPlan: false,
      //   currentPlan: false,
      //   title: 'Enterprise',
      //   subtitle: 'Solution for big organizations',
      //   imgSrc: '/images/pages/pricing-tree-3.png',
      //   yearlyPlan: {
      //     perMonth: 80,
      //     totalAnnual: 960
      //   },
      //   planBenefits: [
      //     'PayPal payments',
      //     'Logic Jumps',
      //     'File upload with 5GB storage',
      //     'Custom domain support',
      //     'Stripe integration'
      //   ]
      // }
    ],
    teacher: [
      {
        title: 'Nhỏ',
        monthlyPrice: 80,
        currentPlan: true,
        popularPlan: false,
        subtitle: 'A simple start for everyone',
        imgSrc: '/images/pages/pricing-tree-1.png',
        yearlyPlan: {
          perMonth: 80,
          totalAnnual: 0
        },
        planBenefits: ['30 học viên', '1 tài khoản giáo viên', '1000 câu hỏi', 'Sử dụng ngân hàng câu hỏi Thi360']
      },
      {
        monthlyPrice: 180,
        title: 'Cơ bản',
        popularPlan: true,
        currentPlan: false,
        subtitle: 'For small to medium businesses',
        imgSrc: '/images/pages/pricing-tree-2.png',
        yearlyPlan: {
          perMonth: 180,
          totalAnnual: 480
        },
        planBenefits: ['90 học viên', '3 tài khoản giáo viên', '3000 câu hỏi', 'Sử dụng ngân hàng câu hỏi Thi360']
      }
    ],
    enterprise: [
      {
        title: 'Liên hệ',
        monthlyPrice: 80,
        currentPlan: true,
        popularPlan: false,
        subtitle: 'Giải pháp dành cho Tổ chức, Trung tâm',
        imgSrc: '/images/pages/pricing-tree-3.png',
        yearlyPlan: {
          perMonth: 0,
          totalAnnual: 0
        },
        planBenefits: ['Không giới hạn học viên', 'Không giới hạn tài khoản giáo viên', 'Hệ thống độc lập']
      }
    ]
  },
  faq: [
    {
      id: 'responses-limit',
      question: 'What counts towards the 100 responses limit?',
      answer:
        'We count all responses submitted through all your forms in a month. If you already received 100 responses this month, you won’t be able to receive any more of them until next month when the counter resets.'
    },
    {
      id: 'process-payments',
      question: 'How do you process payments?',
      answer:
        'We accept Visa®, MasterCard®, American Express®, and PayPal®. So you can be confident that your credit card information will be kept safe and secure.'
    },
    {
      id: 'payment-methods',
      question: 'What payment methods do you accept?',
      answer: '2Checkout accepts all types of credit and debit cards.'
    },
    {
      id: 'money-back-guarantee',
      question: 'Do you have a money-back guarantee?',
      answer: 'Yes. You may request a refund within 30 days of your purchase without any additional explanations.'
    },
    {
      id: 'more-questions',
      question: 'I have more questions. Where can I get help?',
      answer: 'Please contact us if you have any other questions or concerns. We’re here to help!'
    }
  ],
  pricingTable: {
    header: [
      {
        title: 'TÍNH NĂNG',
        subtitle: 'Native Front Features'
      },
      {
        title: 'Starter',
        subtitle: 'Free'
      },
      {
        isPro: true,
        title: 'Pro',
        subtitle: '$7.5/month'
      },
      {
        title: 'Enterprise',
        subtitle: '$16/month'
      }
    ],
    rows: [
      {
        pro: true,
        starter: true,
        enterprise: true,
        feature: 'Quản lý ngân hàng câu hỏi với 7 loại định dạng'
      },
      {
        pro: false,
        starter: false,
        enterprise: true,
        feature: 'Quản lý Lớp học, Học viên'
      },
      {
        pro: true,
        starter: false,
        enterprise: true,
        feature: 'Import Ngân hàng câu hỏi bằng Excel'
      },
      {
        starter: false,
        enterprise: true,
        pro: 'Add-On Available',
        feature: 'Export đề thi với định dạng word'
      },
      {
        pro: true,
        starter: false,
        enterprise: true,
        feature: 'Thống kê, báo cáo kết quả Thi của Học viên trong lớp'
      },
      {
        starter: false,
        enterprise: true,
        pro: 'Add-On Available',
        feature: 'Removal of Front branding'
      },
      {
        pro: false,
        starter: false,
        enterprise: true,
        feature: 'Active maintenance & support'
      },
      {
        pro: false,
        starter: false,
        enterprise: true,
        feature: 'Data storage for 365 days'
      }
    ]
  }
}

const PricingPage = () => {
  const [value, setValue] = useState('student')
  const [plans, setPlans] = useState([])
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    new V1Api().getPricingPlans().then(response => {
      setPlans(response.data.value)
    })
  }

  return (
    <>
      <Grid container spacing={8}>
        <Grid item md={2}></Grid>
        <Grid item md={8}>
          <Card>
            <CardContent>
              <br />
              <PricingHeader />
              <Alert severity='success' icon={<Icon icon='mdi:tag-outline' />} sx={{ mb: 4 }}>
                <AlertTitle>Khuyến mại</AlertTitle>
                <div>
                  <Typography sx={{ color: 'success.main' }}>
                    - Giảm 10% khi mua 12 tháng với tất cả các gói.
                  </Typography>
                  <Typography sx={{ color: 'success.main' }}>
                    - Giảm 10% khi sử dụng mã giảm giá: "BACKTOSCHOOL"
                  </Typography>
                </div>
              </Alert>
              <TabContext value={value}>
                <TabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
                  <Tab value='student' label='HỌC VIÊN' />
                  <Tab value='teacher' label='GIÁO VIÊN' />
                  <Tab value='enterprise' label='TRUNG TÂM, TỔ CHỨC' />
                </TabList>
              </TabContext>
              <br />
              <Grid container spacing={6}>
                {plans[value]?.map(item => (
                  <Grid item xs={12} md={4} key={item.id}>
                    <PlanDetails
                      isCurrentPlan={
                        plans.userCurrentPlans &&
                        plans.userCurrentPlans.filter(x => {
                          return x.pricingPlanId == item.id
                        }).length > 0
                      }
                      addPayment={() => {
                        setSelectedPlan(item)
                        setAddPaymentOpen(true)
                      }}
                      data={item}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            <PricingCTA />
            <CardContent>
              <PricingTable data={data} />
            </CardContent>
            <CardContent sx={{ backgroundColor: 'action.hover' }}>
              <PricingFooter data={data} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <AddPaymentDrawer open={addPaymentOpen} plan={selectedPlan} toggle={toggleAddPaymentDrawer} />
    </>
  )
}

export default PricingPage
