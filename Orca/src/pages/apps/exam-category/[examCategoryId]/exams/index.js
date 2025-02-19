import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectedExamCategory } from 'store/slices/examCategorySlice'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import TopNav from '../../_layout/_breadcrums'
import Nav from '../../_layout/_tabs'
import ExamTable from './_list'

const ExamsList = () => {
  const router = useRouter()
  const { examCategoryId } = router.query
  const currentExamCategory = useSelector(selectedExamCategory)

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
                      {currentExamCategory && currentExamCategory.id > 0 && <span>{currentExamCategory.name}</span>}
                    </span>
                    {currentExamCategory && currentExamCategory.id > 0 && (
                      <IconButton aria-label='delete'>
                        <HelpOutlineIcon />
                      </IconButton>
                    )}
                  </h3>
                  <span className='right'>
                    <Button variant='outlined' component={Link} href={`/apps/exam-category/${examCategoryId}`}>
                      <ArrowBackIcon />
                      &nbsp;Quay lại
                    </Button>
                  </span>
                </div>
                <div className='grid-block'>
                  <Nav />
                  <div className='grid-block' style={{ padding: 0, paddingLeft: 10, paddingTop: 10, width: '100%' }}>
                    <div style={{ width: '100%' }}>
                      <ExamTable />
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

export default ExamsList
