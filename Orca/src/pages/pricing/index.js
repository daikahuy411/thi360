import * as React from 'react'
import {
  useEffect,
  useState
} from 'react'

import V1Api from 'api/v1-api'
import themeConfig from 'configs/themeConfig'
import { useAuth } from 'hooks/useAuth'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Icon from '@core/components/icon'
import PlanDetails from '@core/components/plan-details'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'

import AddPaymentDrawer from './AddPaymentDrawer'
import PricingCTA from './PricingCTA'
import PricingFooter from './PricingFooter'
import PricingHeader from './PricingHeader'
import PricingTable from './PricingTable'

const data = {
  pricingPlans: {},
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
  const auth = useAuth()
  const router = useRouter()

  const [promotions, setPromotions] = useState([])
  const [plans, setPlans] = useState([])
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)
  const { type } = router.query
  const [tab, setTab] = useState('student')

  const handleChange = (event, newValue) => {
    router.query.type = newValue
    router.push(router)
    setTab(newValue)
  }

  useEffect(() => {
    if (type) {
      setTab(type)
    }
  }, [type])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    new V1Api().getPromotions().then(response => {
      const data = response.data.value
      setPromotions(data)
    })

    new V1Api().getPricingPlans().then(response => {
      const data = response.data.value
      setPlans(data)
    })
  }

  function addPayment(item, flag) {
    setSelectedPlan(item)
    setAddPaymentOpen(flag)
  }
  return (
    <>
      <Head>
        <title>{`Danh sách gói đăng ký, Chương trình khuyến mãi - ${themeConfig.templateName}`}</title>
      </Head>
      <Grid container spacing={8} justifyContent='center'>
        <Grid item md={12} lg={10} xl={10}>
          <Card>
            <CardContent>
              <br />
              <PricingHeader />
              {!auth.user && (
                <>
                  <Alert severity='success' icon={<Icon icon='mdi:tag-outline' />} sx={{ mb: 4 }}>
                    Bạn đăng nhập trước.
                  </Alert>
                </>
              )}

              {auth.user && !auth.user.approveBecomeTeacher && tab == 'teacher' && (
                <>
                  <Alert severity='success' icon={<Icon icon='mdi:tag-outline' />} sx={{ mb: 4 }}>
                    Gói giáo viên phải xác thực tài khoản và đăng ký hồ sơ trước được duyệt.
                  </Alert>
                </>
              )}

              <Alert severity='success' icon={<Icon icon='mdi:tag-outline' />} sx={{ mb: 4 }}>
                <AlertTitle>Khuyến mại</AlertTitle>
                <div>
                  {promotions &&
                    promotions.map(item => (
                      <Typography key={item.id} sx={{ color: 'success.main' }}>
                        - {item.name}
                      </Typography>
                    ))}
                </div>
              </Alert>
              <TabContext value={tab}>
                <TabList variant='fullWidth' onChange={handleChange}>
                  <Tab value='student' label='HỌC VIÊN' />
                  <Tab value='teacher' label='GIÁO VIÊN' />
                  <Tab value='enterprise' label='TRUNG TÂM, TỔ CHỨC' />
                </TabList>
              </TabContext>
              <br />
              <Grid container spacing={6}>
                {plans[tab]?.map(item => (
                  <Grid item xs={12} md={4} key={item.id}>
                    <PlanDetails
                      isCurrentPlan={
                        plans.userCurrentPlans &&
                        plans.userCurrentPlans.filter(x => {
                          return x.pricingPlanId == item.id
                        }).length > 0
                      }
                      currentPlanItem={plans.userCurrentPlans.filter(x => x.pricingPlanId == item.id)}
                      addPayment={() => {
                        setSelectedPlan(item)
                        setAddPaymentOpen(true)
                      }}
                      // addPayment={addPayment(item, true)}
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
      <AddPaymentDrawer
        open={addPaymentOpen}
        plan={selectedPlan}
        toggle={toggleAddPaymentDrawer}
        promotions={promotions}
      />
    </>
  )
}

export default PricingPage
