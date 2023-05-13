import {
  Fragment,
  useEffect,
  useState
} from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { QuestionCategoryApi } from 'src/api/catalog-api'
import EntityInfoModal from 'src/pages/shared/entity-info-modal'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import TopNav from '../_layout/_breadcrums'
import EditForm from './Form'

const ExamCategoryEditPage = () => {
  const router = useRouter()
  const { questionCategoryId, questionCatalogId } = router.query
  const [item, setItem] = useState(null)

  const fetchData = () => {
    QuestionCategoryApi.get(questionCategoryId).then(response => {
      setItem(response.data)
    })
  }

  useEffect(() => {
    if (!questionCategoryId || questionCategoryId == 0) return
    fetchData()
  }, [questionCategoryId])

  return (
    <>
      <div style={{ padding: 0 }}>
        <div sx={{ py: 5.375 }} style={{ padding: 0 }}>
          <Fragment>
            <TopNav />
            <Box style={{ marginTop: 2 }}>
              <div className='grid-block vertical'>
                <div className='title-bar' id='EntityHeadingTitleBar'>
                  <h3 className='title left'>
                    <span className='title__label'>
                      {item && <span>{item.name}</span>}
                      {!item && <span>Tạo mới Danh mục Câu hỏi</span>}
                    </span>
                    {item && item.id > 0 && <EntityInfoModal entity={item} />}
                  </h3>
                  <span className='right'>
                    {item && item.id > 0 && (
                      <>
                        <IconButton aria-label='delete'>
                          <DeleteIcon />
                        </IconButton>
                        &nbsp;
                      </>
                    )}
                    <Button
                      variant='outlined'
                      component={Link}
                      href={`/apps/question-catalog/${questionCatalogId}/categories`}
                    >
                      <ArrowBackIcon />
                      &nbsp;Quay lại
                    </Button>
                    &nbsp;
                    <Button variant='contained'>Cập nhật</Button>
                    {(!item || item.id == 0) && (
                      <>
                        &nbsp;
                        <Button variant='contained'>Cập nhật &amp; Thêm mới</Button>
                      </>
                    )}
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
                      Câu hỏi
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

export default ExamCategoryEditPage
