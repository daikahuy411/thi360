import ButtonsColors from 'views/components/buttons/ButtonsColors'
import ButtonsContained from 'views/components/buttons/ButtonsContained'
import ButtonsCustomized from 'views/components/buttons/ButtonsCustomized'
// ** Demo Components Imports
import ButtonsFab from 'views/components/buttons/ButtonsFab'
import ButtonsFabSizes from 'views/components/buttons/ButtonsFabSizes'
import ButtonsIcons from 'views/components/buttons/ButtonsIcons'
import ButtonsOutlined from 'views/components/buttons/ButtonsOutlined'
import ButtonsSizes from 'views/components/buttons/ButtonsSizes'
// ** Source code imports
import * as source from 'views/components/buttons/ButtonsSourceCode'
import ButtonsText from 'views/components/buttons/ButtonsText'
import ButtonsWithIconAndLabel from 'views/components/buttons/ButtonsWithIconAndLabel'

// ** Custom Components Imports
import CardSnippet from '@core/components/card-snippet'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const Buttons = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <CardSnippet
          title='Contained'
          code={{
            tsx: null,
            jsx: source.ButtonsContainedJSXCode
          }}
        >
          <Typography>
            Use <code>variant='contained'</code> prop with <code>&lt;Button&gt;</code> component for contained buttons.
          </Typography>
          <ButtonsContained />
        </CardSnippet>
      </Grid>
      <Grid item xs={12}>
        <CardSnippet
          title='Text'
          code={{
            tsx: null,
            jsx: source.ButtonsTextJSXCode
          }}
        >
          <Typography>
            Use <code>variant='text'</code> prop with <code>&lt;Button&gt;</code> component for buttons with text only.
          </Typography>
          <ButtonsText />
        </CardSnippet>
      </Grid>
      <Grid item xs={12}>
        <CardSnippet
          title='Outlined'
          code={{
            tsx: null,
            jsx: source.ButtonsOutlinedJSXCode
          }}
        >
          <Typography>
            Use <code>variant='outlined'</code> prop with <code>&lt;Button&gt;</code> component for outlined buttons.
          </Typography>
          <ButtonsOutlined />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Buttons With Icon and Label'
          code={{
            tsx: null,
            jsx: source.ButtonsWithIconAndLabelJSXCode
          }}
        >
          <Typography>
            Use <code>startIcon | endIcon</code> prop with <code>&lt;Button&gt;</code> component to add an icon inside a
            button.
          </Typography>
          <ButtonsWithIconAndLabel />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Icon Buttons'
          code={{
            tsx: null,
            jsx: source.ButtonsIconsJSXCode
          }}
        >
          <Typography>
            Use an icon component inside <code>&lt;IconButton&gt;</code> component. For different colors, use{' '}
            <code>color</code> prop with <code>&lt;IconButton&gt;</code> component.
          </Typography>
          <ButtonsIcons />
        </CardSnippet>
      </Grid>
      <Grid item xs={12}>
        <CardSnippet
          title='Button Sizes'
          code={{
            tsx: null,
            jsx: source.ButtonsSizesJSXCode
          }}
        >
          <Typography>
            Use <code>size={`{'small' | 'medium' | 'large'}`}</code> prop with <code>&lt;Button&gt;</code> component for
            different sized buttons. To use icon buttons, you need to use <code>size={`{small | large}`}</code> prop
            with <code>&lt;IconButton&gt;</code> component or you can also use <code>fontSize</code> prop with the
            icons.
          </Typography>
          <ButtonsSizes />
        </CardSnippet>
      </Grid>
      <Grid item xs={12}>
        <CardSnippet
          title='Button Colors'
          code={{
            tsx: null,
            jsx: source.ButtonsColorsJSXCode
          }}
        >
          <Typography>
            Use <code>color</code> prop with <code>&lt;Button&gt;</code> component for different colored buttons.
          </Typography>
          <ButtonsColors />
        </CardSnippet>
      </Grid>
      <Grid item xs={12}>
        <CardSnippet
          title='Customized Buttons'
          code={{
            tsx: null,
            jsx: source.ButtonsCustomizedJSXCode
          }}
        >
          <ButtonsCustomized />
        </CardSnippet>
      </Grid>
      <Grid item xs={12}>
        <CardSnippet
          title='Floating Action Button'
          code={{
            tsx: null,
            jsx: source.ButtonsFabJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Use <code>color</code> prop with <code>&lt;Fab&gt;</code> component for different colored Floating Action
            Button and <code>variant='extended'</code> prop for extended (not round) Floating Action Button.
          </Typography>
          <ButtonsFab />
        </CardSnippet>
      </Grid>
      <Grid item xs={12}>
        <CardSnippet
          title='Floating Action Button Sizes'
          code={{
            tsx: null,
            jsx: source.ButtonsFabSizesJSXCode
          }}
        >
          <Typography>
            Use <code>size={`{'small' | 'medium' | 'large'}`}</code> prop for different sizes of Floating Action
            Buttons.
          </Typography>
          <ButtonsFabSizes />
        </CardSnippet>
      </Grid>
    </Grid>
  )
}

export default Buttons
