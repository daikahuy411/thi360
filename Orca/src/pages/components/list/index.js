import ListDense from 'views/components/list/ListDense'
import ListItemSelected from 'views/components/list/ListItemSelected'
import ListNested from 'views/components/list/ListNested'
import ListProgress from 'views/components/list/ListProgress'
import ListSecondary from 'views/components/list/ListSecondary'
import ListSimple from 'views/components/list/ListSimple'
// ** Source code imports
import * as source from 'views/components/list/ListSourceCode'
import ListStickySubheader from 'views/components/list/ListStickySubheader'
// ** Demo Components Imports
import ListUsers from 'views/components/list/ListUsers'
import ListWithCheckbox from 'views/components/list/ListWithCheckbox'
import ListWithSwitch from 'views/components/list/ListWithSwitch'

// ** Custom Components Imports
import CardSnippet from '@core/components/card-snippet'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const Lists = () => {
  return (
    <Grid className='match-height' container spacing={6}>
      <Grid item xs={12} md={6}>
        <CardSnippet
          id='simple-list'
          title='Simple List'
          code={{
            tsx: null,
            jsx: source.ListSimpleJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>Lists are a continuous group of text or images.</Typography>
          <ListSimple />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Nested List'
          code={{
            tsx: null,
            jsx: source.ListNestedJSXCode
          }}
        >
          <ListNested />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Dense List'
          code={{
            tsx: null,
            jsx: source.ListDenseJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Use <code>dense</code> prop with <code>&lt;List&gt;</code> component for dense list.
          </Typography>
          <ListDense />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='List with Secondary Text'
          code={{
            tsx: null,
            jsx: source.ListSecondaryJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Use <code>secondary</code> prop with <code>&lt;ListItemText&gt;</code> component for secondary text.
          </Typography>
          <ListSecondary />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Selected List Item'
          code={{
            tsx: null,
            jsx: source.ListItemSelectedJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Manage <code>selected</code> prop with the help of a state.
          </Typography>
          <ListItemSelected />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='List with Checkbox'
          code={{
            tsx: null,
            jsx: source.ListWithCheckboxJSXCode
          }}
        >
          <ListWithCheckbox />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='List with Switch'
          code={{
            tsx: null,
            jsx: source.ListWithSwitchJSXCode
          }}
        >
          <ListWithSwitch />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Sticky Subheader'
          code={{
            tsx: null,
            jsx: source.ListWithSwitchJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            <code>&lt;ListSubheader&gt;</code> is by default sticky.
          </Typography>
          <ListStickySubheader />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Users List'
          code={{
            tsx: null,
            jsx: source.ListUsersJSXCode
          }}
        >
          <ListUsers />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Progress List'
          code={{
            tsx: null,
            jsx: source.ListUsersJSXCode
          }}
        >
          <ListProgress />
        </CardSnippet>
      </Grid>
    </Grid>
  )
}

export default Lists
