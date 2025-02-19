import RatingsBasic from 'views/components/ratings/RatingsBasic'
import RatingsCustomized from 'views/components/ratings/RatingsCustomized'
// ** Demo Components Imports
import RatingsHalf from 'views/components/ratings/RatingsHalf'
import RatingsHoverFeedback from 'views/components/ratings/RatingsHoverFeedback'
import RatingsSizes from 'views/components/ratings/RatingsSizes'
// ** Source code imports
import * as source from 'views/components/ratings/RatingsSourceCode'

// ** Custom Components Imports
import CardSnippet from '@core/components/card-snippet'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const Ratings = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Basic Ratings'
          code={{
            tsx: null,
            jsx: source.RatingsBasicJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Use <code>name</code> prop to name the rating and use <code>value</code> or <code>defaultValue</code> prop
            to set any initial value to a rating.
          </Typography>
          <RatingsBasic />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Customized Ratings'
          code={{
            tsx: null,
            jsx: source.RatingsCustomizedJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Use <code>icon</code> or <code>emptyIcon</code> prop to change default icon or empty icon respectively,{' '}
            <code>max</code> prop to set number of ratings and <code>IconContainerComponent</code> prop to change every
            icons in the ratings.
          </Typography>
          <RatingsCustomized />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Half Ratings'
          code={{
            tsx: null,
            jsx: source.RatingsHalfJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Use <code>precision</code> prop to define the minimum increment value change allowed.
          </Typography>
          <RatingsHalf />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Sizes'
          code={{
            tsx: null,
            jsx: source.RatingsSizesJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Use <code>size={`{'small' | 'large'}`}</code> prop for different sizes of ratings.
          </Typography>
          <RatingsSizes />
        </CardSnippet>
      </Grid>
      <Grid item xs={12}>
        <CardSnippet
          title='Hover Feedback'
          code={{
            tsx: null,
            jsx: source.RatingsHoverFeedbackJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            You can display a label on hover to help users pick the correct rating value. The demo uses the{' '}
            <code>onChangeActive</code> prop.
          </Typography>
          <RatingsHoverFeedback />
        </CardSnippet>
      </Grid>
    </Grid>
  )
}

export default Ratings
