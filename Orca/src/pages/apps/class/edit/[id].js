import { Fragment, useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import DeleteIcon from '@mui/icons-material/Delete'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Divider, Button, Card, CardContent } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
import EditHeader from './Header'
import EditForm from './Form'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import OrganizationApi from 'src/api/organization-api'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

const schema = yup.object().shape({
  name: yup.string().required()
})

const EditPage = ({ apiData }) => {
  const router = useRouter()
  const { id } = router.query

  // ** States
  const [item, setItem] = useState(null)

  useEffect(() => {
    if (!id) return
    new OrganizationApi().get(id).then(response => {
      setItem(response.data)
    })
  }, [id])

  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <>
      <div style={{ padding: 0 }}>
        <div sx={{ py: 5.375 }} style={{ padding: 0 }}>
          <Fragment>
            <EditHeader />
            <Box style={{ marginTop: 2 }}>
              <div className='grid-block vertical'>
                <div className='title-bar' id='EntityHeadingTitleBar'>
                  <h3 className='title left'>
                    <span className='title__label'>
                      {item && <span>{item.name}</span>}
                      {!item && <span>New Customer {id}</span>}
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
                  <div className='grid-block' style={{ padding: 50 }}>
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

// export async function getStaticPaths() {
//   return {
//     paths: [
//       // String variant:
//       '/apps/class/edit/0',
//       // Object variant:
//       { params: { id: '0' } },
//     ],
//     fallback: true,
//   }
// }

export default EditPage
