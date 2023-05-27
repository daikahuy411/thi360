import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import EntityInfoModal from 'src/pages/shared/entity-info-modal'
import { selectedTestGroup } from 'src/store/slices/testGroupSlice'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'

import TopNav from '../../_layout/_breadcrums'
import Nav from '../../_layout/_tabs'
import TestsTable from './_list'

const TestsList = () => {
  const router = useRouter()
  const { testGroupId } = router.query
  const currentTestGroup = useSelector(selectedTestGroup)

  return (
    <>
      <div style={{ padding: 0 }}>
        <div sx={{ py: 5.375 }} style={{ padding: 0 }}>
          <>
            <TopNav />
            <Box style={{ marginTop: 2 }}>
              <div className='grid-block vertical'>
                <div className='title-bar' id='EntityHeadingTitleBar'>
                  <h3 className='title left'>
                    <span className='title__label'>
                      {currentTestGroup && currentTestGroup.id > 0 && <span>{currentTestGroup.name}</span>}
                    </span>
                    {currentTestGroup && currentTestGroup.id > 0 && <EntityInfoModal entity={currentTestGroup} />}
                  </h3>
                  <span className='right'>
                    <Button variant='outlined' component={Link} href={`/apps/test-group/${testGroupId}`}>
                      <ArrowBackIcon />
                      &nbsp;Quay lại
                    </Button>
                  </span>
                </div>
                <div className='grid-block'>
                  <Nav />
                  <div className='grid-block' style={{ padding: 0, paddingLeft: 10, paddingTop: 10, width: '100%' }}>
                    <div style={{ width: '100%' }}>
                      <TestsTable />
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </>
        </div>
      </div>
    </>
  )
}

export default TestsList
