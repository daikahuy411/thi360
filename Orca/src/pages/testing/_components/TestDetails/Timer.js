import React from 'react'

import { useStopwatch } from 'react-timer-hook'

const Timer = ({ offsetTimestamp }) => {
  const { seconds, minutes, hours } = useStopwatch({
    autoStart: true,
    offsetTimestamp: offsetTimestamp
  })

  return (
    <>
      <>0{hours}:</>
      {minutes < 10 ? '0' : ''}
      {minutes}:{seconds < 10 ? '0' : ''}
      {seconds}
    </>
  )
}

export default Timer
