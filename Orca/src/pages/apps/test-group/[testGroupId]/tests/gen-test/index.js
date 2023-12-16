import React, {
  useEffect,
  useState
} from 'react'

import TestGroupApi from 'api/test-group-api'

import CustomRadioBasic from '@core/components/custom-radio/basic'
import Icon from '@core/components/icon'
import LoadingSpinner from '@core/components/loading-spinner'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const itemTypes = [
  {
    title: 'Các Đề thi không trùng câu hỏi',
    value: 0,
    isSelected: true,
    content: 'Câu hỏi đề thi không trùng nhau.'
  },
  {
    title: 'Các Đề thi trùng câu hỏi',
    value: 1,
    content: 'Câu hỏi có thể lặp lại ở các Đề thi.'
  }
]

function GenTestDialog({ testGroupId, onClose, onGenerated }) {
  const [loading, setLoading] = useState(false)
  const [itemType, setItemType] = useState(itemTypes[0].value)
  const [isValid, setIsValid] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  const [numberOfTest, setNumberOfTest] = useState(1)

  const handleChangeItemType = prop => {
    setItemType(prop)
  }

  useEffect(() => {
    if (numberOfTest <= 0 && itemType == 1) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [numberOfTest, itemType])

  const onOk = () => {
    const request = {
      name: startIndex.toString(),
      numberOfTest: numberOfTest,
      testGroupId: testGroupId,
      startNumber: startIndex,
      tollerant: itemType
    }
    new TestGroupApi().generateTest(request).then(respone => {
      if(onGenerated){
        onGenerated(respone.data)
      }
    })
  }

  return (
    <Drawer
      onClose={onClose}
      open={true}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: [460] } }}
    >
      <>
        <Box
          className='customizer-header'
          sx={{
            position: 'relative',
            p: theme => theme.spacing(3.5, 5),
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            marginBottom: 2
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600, fontSize: 18, textTransform: 'uppercase' }}>
            Sinh đề thi
          </Typography>
          <IconButton
            onClick={() => onClose()}
            sx={{
              right: 20,
              top: '50%',
              position: 'absolute',
              color: 'text.secondary',
              transform: 'translateY(-50%)'
            }}
          >
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Box>
        <Box style={{ padding: 20 }}>
          <LoadingSpinner active={loading}>
            <Grid container spacing={5}>
              {itemTypes.map((item, index) => (
                <Grid item md={12}>
                  <Grid container>
                    <CustomRadioBasic
                      key={index}
                      data={itemTypes[index]}
                      selected={itemType}
                      name='custom-radios-basic'
                      handleChange={handleChangeItemType}
                      gridProps={{ sm: 12, xs: 12, md: 12 }}
                    />
                  </Grid>
                </Grid>
              ))}
              <Grid item md={12}>
                <TextField
                  fullWidth
                  type='number'
                  value={startIndex}
                  onChange={e => setStartIndex(parseInt(e.target.value))}
                  label='Tên đề thi bắt đầu từ'
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              {itemType === 1 && (
                <Grid item md={12}>
                  <TextField
                    fullWidth
                    type='number'
                    value={numberOfTest}
                    onChange={e => setNumberOfTest(parseInt(e.target.value))}
                    label='Số đề thi được tạo'
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              )}
              <Grid item md={12} alignContent={'right'} alignItems={'right'}>
                <Button
                  color='primary'
                  startIcon={<Icon icon='mdi:send' />}
                  style={{ float: 'right' }}
                  type='submit'
                  variant='contained'
                  disabled={!isValid}
                  onClick={onOk}
                >
                  Sinh Đề
                </Button>
              </Grid>
            </Grid>
          </LoadingSpinner>
        </Box>
      </>
    </Drawer>
  )
}

export default GenTestDialog
