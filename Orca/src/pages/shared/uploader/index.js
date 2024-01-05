import React, {
  useCallback,
  useState
} from 'react'

import authConfig from 'configs/auth'
import { useDropzone } from 'react-dropzone'

import Icon from '@core/components/icon'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

import styles from './styles.module.css'

const LinearProgressWithLabel = props => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>{`${Math.round(props.progress)}%`}</Typography>
      </Box>
    </Box>
  )
}

export default function Uploader({ type, onUploaded }) {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [progress, setProgress] = useState(0)
  const [response, setResponse] = useState(null)

  const onDrop = useCallback(acceptedFiles => {
    uploadFiles(acceptedFiles)
  }, [])

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop })

  const fileSize = size => {
    if (size === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(size) / Math.log(k))
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const removeFile = name => {
    // find the index of the item
    // remove the item from array

    const validFileIndex = validFiles.findIndex(e => e.name === name)
    validFiles.splice(validFileIndex, 1)
    // update validFiles array
    setValidFiles([...validFiles])
    const selectedFileIndex = selectedFiles.findIndex(e => e.name === name)
    selectedFiles.splice(selectedFileIndex, 1)
    // update selectedFiles array
    setSelectedFiles([...selectedFiles])
  }

  const uploadFiles = acceptedFiles => {
    if (!acceptedFiles || acceptedFiles.length == 0) return

    const token = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const formData = new FormData()
    const xhr = new XMLHttpRequest()

    formData.append('formFile', acceptedFiles[0])
    formData.append('name', acceptedFiles[0].name)

    xhr.upload.onprogress = event => {
      const percentage = parseInt((event.loaded / event.total) * 100)
      setProgress(percentage)
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return
      if (xhr.status !== 200) {
        setErrorMessage('error')
      }

      if (xhr.status === 200) {
        const response = JSON.parse(xhr.response)
        setResponse(response)
        if (onUploaded) {
          onUploaded(response)
        }
      }
    }

    xhr.open('POST', `${authConfig.baseApiUrl}files/upload`, true)
    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
    xhr.send(formData)
  }

  return (
    <>
      <section className={styles.container}>
        <Grid container>
          <Grid item md={6}>
            <h5>Chọn file</h5>
          </Grid>
          <Grid item md={6} alignContent={'right'} alignItems={'end'}>
            <Button type='button' variant='outlined' style={{ float: 'right' }}>
              <Icon icon='mdi:download' />
              &nbsp; Tải file mẫu
            </Button>
          </Grid>
          <Grid item md={12}>
            <br />
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            {errorMessage && <div>Error: {errorMessage}</div>}
            <b>Files</b>
            {acceptedFiles.map((data, i) => (
              <>
                <Grid container>
                  <Grid item md={4}>
                    <span>{data.name}</span>
                  </Grid>
                  <Grid item md={4}>
                    <span>({fileSize(data.size)})</span>
                  </Grid>
                  <Grid item md={4}>
                    <LinearProgressWithLabel progress={progress} />
                  </Grid>
                </Grid>
              </>
            ))}
          </Grid>
        </Grid>
      </section>
    </>
  )
}
