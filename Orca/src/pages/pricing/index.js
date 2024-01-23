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
            <br />
            {type != 'student' && <PricingCTA />}
            <CardContent>
              <br />
              <PricingTable type={tab} />
            </CardContent>
            <CardContent sx={{ backgroundColor: 'action.hover' }}>
              <PricingFooter />
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
