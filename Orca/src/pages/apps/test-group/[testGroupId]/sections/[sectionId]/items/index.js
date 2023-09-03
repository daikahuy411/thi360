import Link from 'next/link'
import { useRouter } from 'next/router'
import EntityInfoModal from 'pages/shared/entity-info-modal'
import { useSelector } from 'react-redux'
import { selectedTestGroupSection } from 'store/slices/testGroupSectionSlice'
import { selectedTestGroup } from 'store/slices/testGroupSlice'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'

import TopNav from '../../_layout/_breadcrums'
import Nav from '../../_layout/_tabs'
import ItemsTable from './_list'

const TestsList = () => {
  const router = useRouter()
  const { testGroupId, sectionId } = router.query
  const currentTestGroup = useSelector(selectedTestGroup)
  const currentTestGroupSection = useSelector(selectedTestGroupSection)

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
                      {currentTestGroupSection && currentTestGroupSection.id > 0 && (
                        <span>{currentTestGroupSection.name}</span>
                      )}
                    </span>
                    {currentTestGroupSection && currentTestGroupSection.id > 0 && (
                      <EntityInfoModal entity={currentTestGroupSection} />
                    )}
                  </h3>
                  <span className='right'>
                    <Button
                      variant='outlined'
                      component={Link}
                      href={`/apps/test-group/${testGroupId}/sections/${sectionId}`}
                    >
                      <ArrowBackIcon />
                      &nbsp;Quay lại
                    </Button>
                  </span>
                </div>
                <div className='grid-block'>
                  <Nav />
                  <div className='grid-block' style={{ padding: 0, paddingLeft: 10, paddingTop: 10, width: '100%' }}>
                    <div style={{ width: '100%' }}>
                      {currentTestGroupSection && (
                        <ItemsTable data={currentTestGroupSection.items} />
                      )}
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
