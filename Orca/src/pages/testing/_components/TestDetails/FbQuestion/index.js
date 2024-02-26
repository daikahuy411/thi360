import React, {
  Component,
  useRef
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

  state = {
    value: this.props.data && this.props.data[this.props.name] ? this.props.data[this.props.name] : ''
  }

  onChange = value => {
    this.setState({ value: value })
    this.props.eventHandler(`${this.props.name}`, value)
  }

  render() {
    return (
      <>
        <TextField value={this.state.value} size='small' onChange={e => this.onChange(e.target.value)} />
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

  state = {
    value: this.props.data && this.props.data[this.props.name] ? this.props.data[this.props.name] : ''
  }

  onChange = value => {
    this.setState({ value: value })
    this.props.eventHandler(`${this.props.name}`, value)
  }

  render() {
    return (
      <>
        {this.props.question && (
          <Select label='' value={this.state.value} size='small' onChange={e => this.onChange(e.target.value)}>
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
  let answer = useRef({})

  const onChange = (name, value) => {
    answer.current[name] = value
    if (onChanged) {
      onChanged({ ...answer.current })
    }
  }

  return (
    <>
      <JsxParser
        autoCloseVoidElements
        bindings={{
          question: question,
          data: data[question.id],
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
