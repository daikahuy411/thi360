// ** Demo Components Imports
import MenuBasic from 'views/components/menu/MenuBasic'
import MenuComposition from 'views/components/menu/MenuComposition'
import MenuContext from 'views/components/menu/MenuContext'
import MenuCustomized from 'views/components/menu/MenuCustomized'
import MenuMaxHeight from 'views/components/menu/MenuMaxHeight'
import MenuSelected from 'views/components/menu/MenuSelected'
// ** Source code imports
import * as source from 'views/components/menu/MenuSourceCode'
import MenuTransition from 'views/components/menu/MenuTransition'

// ** Custom Components Imports
import CardSnippet from '@core/components/card-snippet'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const Menus = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Simple Menu'
          code={{
            tsx: null,
            jsx: source.MenuBasicJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Manage <code>anchorEl</code> and <code>open</code> props with the help of a state and <code>onClose</code>{' '}
            prop with the help of a function in <code>Menu</code> component.
          </Typography>
          <MenuBasic />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Selected Menu'
          code={{
            tsx: null,
            jsx: source.MenuSelectedJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Manage <code>selected</code> prop with the help of a state in <code>MenuItem</code> component to select an
            item.
          </Typography>
          <MenuSelected />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='MenuList Composition'
          code={{
            tsx: null,
            jsx: source.MenuCompositionJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Use a different positioning strategy and not blocking the page scroll by using <code>MenuList</code> and{' '}
            <code>Popper</code> components.
          </Typography>
          <MenuComposition />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Customized Menu'
          code={{
            tsx: null,
            jsx: source.MenuCustomizedJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Use <code>styled</code> hook to customize your menu.
          </Typography>
          <MenuCustomized />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Max Height Menu'
          code={{
            tsx: null,
            jsx: source.MenuMaxHeightJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Use <code>PaperProps</code> prop and use <code>style</code> property to set the height of the menu.
          </Typography>
          <MenuMaxHeight />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardSnippet
          title='Change Transition'
          code={{
            tsx: null,
            jsx: source.MenuTransitionJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Use <code>TransitionComponent</code> prop to change the transition of the menu.
          </Typography>
          <MenuTransition />
        </CardSnippet>
      </Grid>
      <Grid item xs={12}>
        <CardSnippet
          title='Context Menu'
          code={{
            tsx: null,
            jsx: source.MenuContextJSXCode
          }}
        >
          <Typography sx={{ mb: 4 }}>
            Use <code>onContextMenu</code> prop in the parent element to manage the context menu.
          </Typography>
          <MenuContext />
        </CardSnippet>
      </Grid>
    </Grid>
  )
}

export default Menus
