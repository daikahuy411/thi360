import ChipsArray from 'views/components/chips/ChipsArray'
import ChipsAvatar from 'views/components/chips/ChipsAvatar'
import ChipsClickable from 'views/components/chips/ChipsClickable'
import ChipsColors from 'views/components/chips/ChipsColors'
import ChipsDisabled from 'views/components/chips/ChipsDisabled'
// ** Demo Components Imports
import ChipsIcon from 'views/components/chips/ChipsIcon'
import ChipsLight from 'views/components/chips/ChipsLight'
import ChipsOnDelete from 'views/components/chips/ChipsOnDelete'
import ChipsRounded from 'views/components/chips/ChipsRounded'
import ChipsSizes from 'views/components/chips/ChipsSizes'
// ** Source code imports
import * as source from 'views/components/chips/ChipsSourceCode'
import ChipsVariants from 'views/components/chips/ChipsVariants'

// ** Custom Components Imports
import CardSnippet from '@core/components/card-snippet'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const Pagination = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Chip Variants'
          code={{
            tsx: null,
            jsx: source.ChipsVariantsJSXCode
          }}
        >
          <Typography>
            Use <code>variant='outlined'</code> prop with <code>Chip</code> component for outlined chip.
          </Typography>
          <ChipsVariants />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Disabled Chips'
          code={{
            tsx: null,
            jsx: source.ChipsDisabledJSXCode
          }}
        >
          <Typography>
            Use <code>disabled</code> prop for disabled chip.
          </Typography>
          <ChipsDisabled />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Colors'
          code={{
            tsx: null,
            jsx: source.ChipsColorsJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Use <code>color</code> prop for different colored chips.
          </Typography>
          <ChipsColors />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='onDelete'
          code={{
            tsx: null,
            jsx: source.ChipsOnDeleteJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Use <code>onDelete</code> prop for delete icon in a chip. Use <code>deleteIcon</code> prop to change the
            default delete icon.
          </Typography>
          <ChipsOnDelete />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Chip Sizes'
          code={{
            tsx: null,
            jsx: source.ChipsSizesJSXCode
          }}
        >
          <Typography>
            Use <code>size='small'</code> prop for small chip.
          </Typography>
          <ChipsSizes />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Clickable Chip'
          code={{
            tsx: null,
            jsx: source.ChipsClickableJSXCode
          }}
        >
          <Typography>
            You can make any chip clickable by adding <code>clickable</code> prop and use <code>component='a'</code> to
            make it a link.
          </Typography>
          <ChipsClickable />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Chip with Avatar'
          code={{
            tsx: null,
            jsx: source.ChipsAvatarJSXCode
          }}
        >
          <Typography>
            Use <code>Avatar</code> component inside <code>avatar</code> prop for a chip with avatar.
          </Typography>
          <ChipsAvatar />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Icon Chip'
          code={{
            tsx: null,
            jsx: source.ChipsIconJSXCode
          }}
        >
          <Typography>
            Use <code>icon</code> prop for an icon inside a chip.
          </Typography>
          <ChipsIcon />
        </CardSnippet>
      </Grid>
      <Grid item xs={12}>
        <CardSnippet
          title='Chips Array'
          code={{
            tsx: null,
            jsx: source.ChipsArrayJSXCode
          }}
        >
          <Typography>You can make a list of chips that can make some or all chips deletable.</Typography>
          <ChipsArray />
        </CardSnippet>
      </Grid>
      <Grid item xs={12}>
        <CardSnippet
          title='Custom Light Chips'
          code={{
            tsx: null,
            jsx: source.ChipsLightJSXCode
          }}
        >
          <Typography>
            If you want to use light variant of the chips, you need to use our custom component with{' '}
            <code>skin='light'</code> prop.
          </Typography>
          <ChipsLight />
        </CardSnippet>
      </Grid>
      <Grid item xs={12}>
        <CardSnippet
          title='Custom Rounded'
          code={{
            tsx: null,
            jsx: source.ChipsRoundedJSXCode
          }}
        >
          <Typography>
            Use prop <code>rounded</code> for a rounded chip.
          </Typography>
          <ChipsRounded />
        </CardSnippet>
      </Grid>
    </Grid>
  )
}

export default Pagination
