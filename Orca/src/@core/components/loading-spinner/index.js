import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from 'react-spinners/ClipLoader'

import { useTheme } from '@mui/material/styles'

const LoadingSpinner = ({ children, active, minHeight = 300 }) => {
  const theme = useTheme()

  return (
    <LoadingOverlay
      fadeSpeed={100}
      active={active}
      styles={{
        overlay: base => ({
          ...base,
          zIndex: 999999,
          background: 'rgba(255, 255, 255, 0.75)'
        })
      }}
      spinner={
        <ClipLoader
          cssOverride={{
            border: '3px solid'
          }}
          size={60}
          color='rgb(34, 139, 230'
        />
      }
    >
      <div>{children}</div>
      {/* <div style={{ minHeight: active ? 100 : minHeight }}>{children}</div> */}
    </LoadingOverlay>
  )
}

export default LoadingSpinner
