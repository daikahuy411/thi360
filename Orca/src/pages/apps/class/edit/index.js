// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import DeleteIcon from '@mui/icons-material/Delete'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Divider, Button, Card, CardContent } from '@mui/material'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import axios from 'axios'

// ** Demo Imports
import EditHeader from './Header'
import EditForm from './Form'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const EditPage = ({ apiData }) => {
  // ** States
  const [data, setData] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('payment')
  useEffect(() => {
    if (searchTerm !== '') {
      axios.get('/pages/faqs', { params: { q: searchTerm } }).then(response => {
        if (response.data.faqData && Object.values(response.data.faqData).length) {
          setData(response.data)

          // @ts-ignore
          setActiveTab(Object.values(response.data.faqData)[0].id)
        } else {
          setData(null)
        }
      })
    } else {
      setData(apiData)
    }
  }, [apiData, searchTerm])

  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <>
      <div style={{ padding: 0 }}>
        <div sx={{ py: 5.375 }} style={{ padding: 0 }}>
          <Fragment>
            <EditHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Box style={{ marginTop: 2 }}>
              <div className='grid-block vertical'>
                <div className='title-bar' id='EntityHeadingTitleBar'>
                  <h3 className='title left'>
                    <span className='title__label'>
                      <span>New Customer</span>
                    </span>
                    <IconButton aria-label='delete'>
                      <HelpOutlineIcon />
                    </IconButton>
                  </h3>
                  <span className='right'>
                    <IconButton aria-label='delete'>
                      <DeleteIcon />
                    </IconButton>
                    &nbsp;
                    <Button variant='outlined'>
                      <ArrowBackIcon />
                      &nbsp; Back
                    </Button>
                    &nbsp;
                    <Button variant='contained'>Add New</Button>&nbsp;
                    <Button variant='contained'>Save &amp; Add New</Button>
                  </span>
                </div>
                <div className='grid-block' style={{ height: '100vh' }}>
                  <div className='grid-block vertical flex-none finger-tabs__tabs'>
                    <div
                      id='fingerTabs_1'
                      className='finger-tabs__tab flex-none tst_changeTabDetails is-active'
                      title='Details'
                    >
                      Chi tiết
                    </div>
                    <div
                      id='fingerTabs_2'
                      className='finger-tabs__tab flex-none tst_changeTabUsers disabled'
                      title='Users'
                    >
                      Học viên
                    </div>
                  </div>
                  <div className='grid-block' style={{padding: 50}}>
                    <EditForm />
                  </div>
                </div>
              </div>
            </Box>
          </Fragment>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
    }
  }
}

export default EditPage
