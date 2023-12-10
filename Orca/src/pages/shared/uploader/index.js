import React, { useCallback, useState, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './styles.module.css'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Icon from '@core/components/icon'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'


const LinearProgressWithLabel = props => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

export default function Uploader({ type }) {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const uploadModalRef = useRef()
  const uploadRef = useRef()
  const progressRef = useRef()

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop })

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  const fileType = fileName => {
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName
  }

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

  const closeUploadModal = () => {
    uploadModalRef.current.style.display = 'none'
  }

  const uploadFiles = () => {
    uploadModalRef.current.style.display = 'block'
    uploadRef.current.innerHTML = 'File(s) Uploading...'
    // for (let i = 0; i < validFiles.length; i++) {
    //     const formData = new FormData();
    //     formData.append('image', validFiles[i]);
    //     formData.append('key', 'add your API key here');
    //     axios.post('https://api.imgbb.com/1/upload', formData, {})
    //     .catch(() => {
    //         // If error, display a message on the upload modal
    //         uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
    //         // set progress bar background color to red
    //         progressRef.current.style.backgroundColor = 'red';
    //     });
    // }
  }



  return (
    <>
      <section className={styles.container}>
        <Grid container>
          <Grid item md={6}>
            {/* <Button type='button' variant='contained' color='primary' onClick={uploadFiles}>
              Upload
            </Button> */}
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
                    <LinearProgressWithLabel progress={100} />
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
