import React, {
  Component,
  useState
} from 'react'

import JsxParser from 'react-jsx-parser'

import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

class TextQuestion extends Component {
  static defaultProps = {
    eventHandler: value => { },
    value: ''
  }
  render() {
    return (
      <>
        <TextField
          value={this.props.value}
          onChange={e => this.props.eventHandler(`${this.props.name}`, e.target.value)}
        />
      </>
    )
  }
}

class SelectQuestion extends Component {
  static defaultProps = {
    eventHandler: value => { },
    value: ''
  }

  render() {
    return (
      <>
        <Select
          label=''
          value={this.props.value}
          onChange={e => this.props.eventHandler(`${this.props.name}`, e.target.value)}
        >
          <MenuItem value={'0'}>Chọn trạng thái</MenuItem>
          <MenuItem value={'1'}>Chuẩn bị</MenuItem>
          <MenuItem value={'2'}>Đang diễn ra</MenuItem>
          <MenuItem value={'3'}>Kết thúc</MenuItem>
        </Select>
      </>
    )
  }
}

const FbQuestion = ({ question, onChanged, userAnswer }) => {
  const [answer, setAnswer] = useState(userAnswer)

  const onChange = (name, value) => {
    let newAnswer = { ...answer }
    newAnswer[name] = value
    setAnswer(newAnswer)
    if (onChanged) {
      onChanged(newAnswer)
    }
  }

  return (
    <>
      <JsxParser
        autoCloseVoidElements
        bindings={{
          foo: 'bar',
          onChanged: (name, value) => {
            onChange(name, value)
          }
        }}
        components={{ TextQuestion, SelectQuestion }}
        jsx={question.htmlContent}
      />
    </>
  )
}

export default FbQuestion
