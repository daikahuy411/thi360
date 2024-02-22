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
    eventHandler: value => {},
    data: '',
    question: {}
  }

  render() {
    return (
      <>
        <TextField
          value={this.props.data && this.props.data[this.props.name] ? this.props.data[this.props.name] : ''}
          size='small'
          onChange={e => this.props.eventHandler(`${this.props.name}`, e.target.value)}
        />
      </>
    )
  }
}

class SelectQuestion extends Component {
  static defaultProps = {
    eventHandler: value => {},
    data: '',
    question: {}
  }

  render() {
    return (
      <>
        {this.props.question && (
          <Select
            label=''
            size='small'
            value={this.props.data && this.props.data[this.props.name] ? this.props.data[this.props.name] : ''}
            onChange={e => this.props.eventHandler(`${this.props.name}`, e.target.value)}
          >
            {this.props.question.subQuestions[this.props.name].answers.map(item => (
              <MenuItem value={item.id}>{item.content}</MenuItem>
            ))}
          </Select>
        )}
      </>
    )
  }
}

const FbQuestion = ({ question, onChanged, data }) => {
  const [answer, setAnswer] = useState(data)

  const onChange = (name, value) => {
    let newAnswer = { ...answer }
    newAnswer[name] = value
    setAnswer({ ...newAnswer })
    if (onChanged) {
      onChanged(newAnswer)
    }
  }

  return (
    <>
      <JsxParser
        autoCloseVoidElements
        bindings={{
          question: question,
          data: answer,
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
