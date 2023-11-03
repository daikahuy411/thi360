import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiTabList from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'
import Icon from '@core/components/icon'
import CustomAvatar from '@core/components/mui/avatar'
import V1Api from 'api/v1-api'

const TabList = styled(MuiTabList)(({ theme }) => ({
  border: 0,
  marginRight: 0,
  overflow: 'visible',
  '& .MuiTabs-flexContainer': {
    flexDirection: 'column'
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minHeight: 40,
    minWidth: 300,
    maxWidth: 300,
    textAlign: 'start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: theme.shape.borderRadius,
    '& svg': {
      marginBottom: 0,
      marginRight: theme.spacing(1)
    },
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
      maxWidth: '100%'
    }
  }
}))

const PostPage = () => {
  // ** Hooks
  const router = useRouter()

  // ** State
  const [isLoading, setIsLoading] = useState(false)
  const [tabValue, setTabValue] = useState()
  const [post, setPost] = useState({ name: '', content: '' })
  const [category, setCategory] = useState(null)
  const { postId } = router.query

  const handleChange = (event, newValue) => {
    setIsLoading(true)
    router.push({ pathname: `/post/${newValue}` }).then(() => setIsLoading(false))
  }

  useEffect(() => {
    if (!postId) return
    setIsLoading(true)
    new V1Api().getPost(postId).then(response => {
      setPost(response.data)
      setCategory(response.data.parentCategory)
      setIsLoading(false)
    })
  }, [postId])

  const renderTabs = () => {
    return (
      category &&
      category.posts &&
      category.posts.map(article => (
        <Tab
          key={article.id.toString()}
          value={article.id.toString()}
          label={article.name}
          style={{ textTransform: 'unset', fontSize: '1rem' }}
        />
      ))
    )
  }

  const renderContent = () => (
    <TabPanel value={postId} sx={{ p: 0, width: '100%' }}>
      <Card>
        <CardContent sx={{ pb: 0 }}>
          {/* {category && (
            <Button variant='outlined' startIcon={<Icon icon='mdi:chevron-left' />}>
              {category.name}
            </Button>
          )} */}
          <Box sx={{ my: 4, display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' variant='rounded' color='secondary' sx={{ mr: 3, width: 34, height: 34 }}>
              {/* <Icon icon={activeSubcategory.icon} /> */}
            </CustomAvatar>
            <Typography variant='h6'>{post.name}</Typography>
          </Box>
          <Box sx={{ '& p': { color: 'text.secondary' } }} dangerouslySetInnerHTML={{ __html: post.content }} />
        </CardContent>
        <br/>
        <Divider sx={{ m: '0 !important' }} />
        <CardContent
          sx={{
            gap: 4,
            pt: 4,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <Typography sx={{ fontWeight: 600 }}>{post.name}</Typography>
            <Typography variant='body2' sx={{ mb: 4 }}>
              55 People found this helpful
            </Typography>
            <div>
              <Button variant='outlined' sx={{ mr: 2.5, p: 1, minWidth: 28 }}>
                <Icon fontSize={18} icon='mdi:thumbs-up-outline' />
              </Button>
              <Button variant='outlined' sx={{ p: 1, minWidth: 28 }}>
                <Icon fontSize={18} icon='mdi:thumbs-down-outline' />
              </Button>
            </div>
          </div>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mr: 1, fontWeight: 600 }}>Still need help?</Typography>
            <Typography
              href='/'
              component={Link}
              onClick={e => e.preventDefault()}
              sx={{ fontWeight: 600, color: 'primary.main', textDecoration: 'none' }}
            >
              Contact us?
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </TabPanel>
  )

  return (
    <TabContext value={postId}>
      <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'] }}>
        <Box sx={{ mr: [0, 0, 9], mb: [5, 5, 0], display: 'flex', flexDirection: 'column' }}>
          {category && (
            <Typography variant='h5' sx={{ mb: 4 }}>
              {category.name}
            </Typography>
          )}
          <TabList orientation='vertical' onChange={handleChange} aria-label='vertical tabs example'>
            {renderTabs()}
          </TabList>
        </Box>
        {isLoading ? (
          <Box sx={{ mt: 11, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          renderContent()
        )}
      </Box>
    </TabContext>
  )
}

export default PostPage
