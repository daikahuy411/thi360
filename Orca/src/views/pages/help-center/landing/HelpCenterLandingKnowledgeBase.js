import Link from 'next/link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Icon from '@core/components/icon'
import CustomAvatar from '@core/components/mui/avatar'

const HelpCenterLandingKnowledgeBase = ({ categories }) => {
  const renderCategories = () => {
    if (categories && categories.length) {
      return categories.map(category => {
        return (
          <Grid item xs={12} sm={6} md={4} key={category.slug}>
            <Box
              sx={{
                p: 5,
                boxShadow: 6,
                height: '100%',
                display: 'flex',
                borderRadius: 1,
                flexDirection: 'column',
                alignItems: 'flex-start',
                backgroundColor: 'background.paper'
              }}
            >
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={category.avatarColor}
                  sx={{ mr: 3, height: 34, width: 34 }}
                >
                  <Icon icon={category.icon} />
                </CustomAvatar>
                <Typography
                  variant='h6'
                  // component={Link}
                  // href={`/pages/help-center/${category.id}/`}
                  sx={{ fontWeight: 600, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                >
                  {category.name}
                </Typography>
              </Box>
              <Box component='ul' sx={{ mt: 0, mb: 5, pl: 6.75, '& li': { mb: 2, color: 'primary.main' } }}>
                {category.posts.map(post => (
                  <li key={post.name}>
                    <Typography
                      component={Link}
                      sx={{ color: 'inherit', textDecoration: 'none' }}
                      href={`/post/${post.id}`}
                    >
                      {post.name}
                    </Typography>
                  </li>
                ))}
              </Box>
              <Typography
                variant='body2'
                // href={`/pages/help-center/${category.id}`}
                sx={{ mt: 'auto', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                {`${category.totalPost} bài viết`}
              </Typography>
            </Box>
          </Grid>
        )
      })
    } else {
      return null
    }
  }

  return (
    <Grid container spacing={6}>
      {renderCategories()}
    </Grid>
  )
}

export default HelpCenterLandingKnowledgeBase
