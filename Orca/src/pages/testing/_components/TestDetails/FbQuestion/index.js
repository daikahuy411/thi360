import React, { Component } from 'react'

import JsxParser from 'react-jsx-parser'

import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

const TexctFieldQuestion = ({ onChanged }) => {
  return (
    <>
      <TextField onChange={e => onChanged(e.target.value)} />
    </>
  )
}

class InjectableComponent extends Component {
  static defaultProps = {
    eventHandler: value => {
      console.log(value)
    }
  }
  render() {
    return (
      <>
        <b>inject component</b> &nbsp;
        <TextField onChange={e => this.props.eventHandler(e.target.value)} />
      </>
    )
  }
}

const SelectQuestion = () => {
  return (
    <>
      <Select label='Trạng thái'>
        <MenuItem value={0}>Chọn trạng thái</MenuItem>
        <MenuItem value={1}>Chuẩn bị</MenuItem>
        <MenuItem value={2}>Đang diễn ra</MenuItem>
        <MenuItem value={3}>Kết thúc</MenuItem>
      </Select>
    </>
  )
}

const FbQuestion = ({ question, onChanged }) => {
  const onChange = value => {
    console.log(value)
  }

  return (
    <>
      <JsxParser
        bindings={{
          foo: 'bar',
          onChanged: value => {
            onChange(value)
          },
          myEventHandler: value => {
            onChange(value)
          }
        }}
        components={{ TexctFieldQuestion, SelectQuestion, InjectableComponent }}
        jsx={`
         <div> Điền từ vào chỗ trống
         <InjectableComponent eventHandler={myEventHandler} truthyProp />
         <SelectQuestion  /> textfield: <TexctFieldQuestion truthyProp onChanged={onChanged}/></div>
        `}
      />
    </>
  )
}

export default FbQuestion
