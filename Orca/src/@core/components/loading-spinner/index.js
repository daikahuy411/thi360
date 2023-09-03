import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from 'react-spinners/ClipLoader'

const LoadingSpinner = ({ sx, children, active }) => {
  const theme = useTheme()

  return (
    <LoadingOverlay
      fadeSpeed={1500}
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
      <div style={{ minHeight: 300 }}>{children}</div>
    </LoadingOverlay>
  )
}

export default LoadingSpinner
