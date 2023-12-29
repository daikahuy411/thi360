import LoadingSpinner from '@core/components/loading-spinner'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

export default function ExportDialog({ loading, open, title, onClose, response }) {
  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title ? title : 'Export'}</DialogTitle>
      <DialogContent>
        <LoadingSpinner active={loading} minHeight={0}>
          <div
            style={{
              width: 360,
              height: 60,
              backgroundColor: '#f5f8ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px dashed #4267b2',
              borderRadius: 20,
              boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
            }}
          >
            {response && (
              <>
                <div key={index} className='drop-file-preview__item'>
                  {/* <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" /> */}
                  <div className='drop-file-preview__item__info'>
                    <p>
                      <a style={{}} href={response.data.value.downloadLink} rel='noreferrer' target='_blank'>
                        <CloudDownloadIcon />
                        &nbsp; {response.data.value.name} &nbsp;
                      </a>
                    </p>
                    <p>{response.data.value.size}B</p>
                  </div>
                  <span className='drop-file-preview__item__del' onClick={() => fileRemove(item)}>
                    x
                  </span>
                </div>
              </>
            )}
          </div>
        </LoadingSpinner>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  )
}
