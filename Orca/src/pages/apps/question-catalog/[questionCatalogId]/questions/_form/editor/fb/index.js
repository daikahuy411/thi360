import React, {
  useEffect,
  useState
} from 'react'

import QuestionApi from 'api/question-api'

import {
  Button,
  Drawer,
  Grid,
  MenuItem,
  Select,
  TextField
} from '@mui/material'

const FillTheBlankEditor = props => {
  const [question, setQuestion] = useState(null)
  const [setting, setSetting] = useState({
    renderAs: 1,
    caseInsensitiveMask: 0
  })

  const onChangeRadioControl = (e, name) => {
    var newValue = parseInt(e.target.value, 10)
    let newSetting = { ...setting }
    newSetting[name] = newValue
    setSetting(newSetting)
  }

  const saveSetting = () => {
    let question = props.question
    question.settingJSON = JSON.stringify(setting)
    new QuestionApi().saveSetting(question).then(response => {
      setQuestion(response.data)
    })
  }

  useEffect(() => {
    new QuestionApi().parseFillTheBlankQuestion(props.question).then(response => {
      setQuestion(response.data)
    })
  }, [])

  return (
    <Drawer
      title={'Soạn thảo câu hỏi điền vào chỗ trống'}
      width={820}
      onClose={props.onClose}
      closable={true}
      visible={true}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right'
          }}
        >
          <Button onClick={saveSetting} type='primary' color='primary' style={{ marginRight: 8 }}>
            Cập nhật
          </Button>
          &nbsp;
          <Button onClick={props.onClose} style={{ marginRight: 8 }}>
            Đóng
          </Button>
        </div>
      }
    >
      {question && (
        <>
          <Grid container>
            <Grid item>{question.previewContent}</Grid>
            <Grid item>
              <Select
                onChange={e => onChangeRadioControl(e, 'renderAs')}
                label='Cấu hình hiển thị câu hỏi'
                labelId='demo-simple-select-label'
                aria-describedby='validation-schema-group'
              >
                <MenuItem value={-1}>Chọn</MenuItem>
                <MenuItem value={1}>Textbox</MenuItem>
                <MenuItem value={2}>Dropdonwlist</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <Select
                onChange={e => onChangeRadioControl(e, 'renderAs')}
                label='Cấu hình hiển thị câu hỏi'
                labelId='demo-simple-select-label'
                aria-describedby='validation-schema-group'
              >
                <MenuItem value={-1}>Chọn</MenuItem>
                <MenuItem value={1}>Đúng chính xác</MenuItem>
                <MenuItem value={2}>Không phân biệt chữ in, thường</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid item>
            <table>
              <thead className='ant-table-thead'>
                <tr>
                  <th className='ant-table-cell' style={{ width: 120 }}>
                    Câu hỏi
                  </th>
                  <th className='ant-table-cell'>Đáp án đúng</th>
                  <th className='ant-table-cell' style={{ width: 250 }}>
                    Đáp án sai
                  </th>
                </tr>
              </thead>
              <tbody className='ant-table-tbody'>
                {question.children
                  .filter(x => x.questionTypeId != 7)
                  .map((question, index) => {
                    return (
                      <tr className='ant-table-row' key={`tr-ans-question-${question.id}`}>
                        <td className='ant-table-cell '>Câu {index + 1}</td>
                        {setting.renderAs == 1 && (
                          <td className='ant-table-cell '>
                            <TextField value={question.content} />
                          </td>
                        )}
                        {setting.renderAs == 2 && (
                          <td className='ant-table-cell '>
                            <Select className='w-100'>
                              {question.answers.map(item => (
                                <MenuItem value={item.id} key={`answer-${item.id}`}>
                                  {item.content}
                                </MenuItem>
                              ))}
                            </Select>
                          </td>
                        )}
                        <td className='ant-table-cell '>
                          {question.answers
                            .filter(x => x.isCorrect == false)
                            .map(item => (
                              <span>{item.content};&nbsp;</span>
                            ))}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </Grid>
        </>
      )}
    </Drawer>
  )
}

export default FillTheBlankEditor
