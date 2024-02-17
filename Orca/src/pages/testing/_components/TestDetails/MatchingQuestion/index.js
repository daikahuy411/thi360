'use client'
import React, {
  useEffect,
  useRef,
  useState
} from 'react'

import ReactHtmlParser from 'react-html-parser'

import styles from './styles.module.css'

var targetOption = {
  anchor: 'LeftMiddle',
  maxConnections: 1,
  isSource: false,
  isTarget: true,
  reattach: true,
  endpoint: 'Dot',
  connector: ['Bezier', { curviness: 50 }],
  setDragAllowedWhenFull: true
}

var sourceOption = {
  tolerance: 'touch',
  anchor: 'RightMiddle',
  maxConnections: 1,
  isSource: true,
  isTarget: false,
  reattach: true,
  endpoint: 'Dot',
  connector: ['Bezier', { curviness: 50 }],
  setDragAllowedWhenFull: true
}

/// data: trả lời của Học viên, theo format:  {anserId1:anserId2,anserId3:anserId4}
export default function MatchingQuestion({ question, onChanged, data, readOnly }) {
  const editorRef = useRef()
  const [jsPlumbLoaded, setJsPlumbLoaded] = useState(false)
  const { jsPlumb } = editorRef.current || {}
  const [sourceElm, setSourceElm] = useState(null)
  const [targetElm, setTargetElm] = useState(null)
  const [leftNodes, setLeftNodes] = useState([])
  const [rightNodes, setRightNodes] = useState([])
  const [connections, setConnections] = useState(null)

  useEffect(() => {
    editorRef.current = {
      jsPlumb: require('jsPlumb')
    }
    setJsPlumbLoaded(true)
  }, [])

  useEffect(() => {
    if (!connections) return
    if (onChanged) {
      let answers = {}

      Object.keys(connections).map(item => {
        const key = item.replace(`s-q-${question.id}-a-`, '')
        const value = connections[item].replace(`t-q-${question.id}-a-`, '')
        answers[key] = value
      })

      onChanged(answers)
    }
  }, [connections])

  const [jsPlumbInstance, setJsPlumbInstance] = useState(null)
  const container = useRef(null)

  useEffect(() => {
    if (!question) return

    setLeftNodes(
      question.subQuestions.map(x => {
        return x.answers[0]
      })
    )

    setRightNodes(
      question.subQuestions.map(x => {
        return x.answers[1]
      })
    )
  }, [question])

  useEffect(() => {
    if (targetElm && sourceElm) {
      addPoint()
    }
  }, [targetElm, sourceElm])

  //GET INSTANCE OF JS PLUMB
  useEffect(() => {
    if (!jsPlumbLoaded) return
    const Instnc = jsPlumb.jsPlumb.getInstance({
      Container: container.current
    })
    //using useEffect to set instance
    setJsPlumbInstance(Instnc)
  }, [jsPlumbLoaded])

  const addPoint = () => {
    if (sourceElm && targetElm) {
      let newConnections = { ...connections }

      Object.keys(newConnections).map(item => {
        if (newConnections[item] == targetElm) delete newConnections[item]
      })

      newConnections[sourceElm] = targetElm
      setConnections({ ...newConnections })

      jsPlumbInstance.deleteEveryEndpoint()
      jsPlumbInstance.deleteEveryConnection()

      Object.keys(newConnections).map(item => {
        const p1 = jsPlumbInstance.addEndpoint(item, sourceOption)
        const p2 = jsPlumbInstance.addEndpoint(newConnections[item], targetOption)
        jsPlumbInstance.connect({
          source: p1,
          target: p2
        })
      })

      setSourceElm(null)
      setTargetElm(null)

      jsPlumbInstance.repaintEverything()
    }
  }

  useEffect(() => {
    if (!data || !jsPlumbInstance) return

    Object.keys(data).forEach(s => {
      const p1 = jsPlumbInstance.addEndpoint(`s-q-${question.id}-a-` + s, sourceOption)
      const p2 = jsPlumbInstance.addEndpoint(`t-q-${question.id}-a-` + data[s], targetOption)
      jsPlumbInstance.connect({
        source: p1,
        target: p2
      })
    })

    jsPlumbInstance.repaintEverything()
  }, [data, jsPlumbInstance])

  return (
    <>
      <div ref={container}>
        <table style={{ width: '100%' }}>
          <tr>
            <td style={{ width: '50%' }}>
              <div>
                <ul className={styles.ul}>
                  {leftNodes.map(item => (
                    <li
                      className={
                        sourceElm == `s-q-${question.id}-a-${item.id}`
                          ? `${styles.active} ${styles.li}`
                          : `${styles.li}`
                      }
                      id={`s-q-${question.id}-a-${item.id}`}
                      key={`s-q-${question.id}-a-${item.id}`}
                      onClick={() => setSourceElm(`s-q-${question.id}-a-${item.id}`)}
                    >
                      {ReactHtmlParser(item.content)}
                    </li>
                  ))}
                </ul>
              </div>
            </td>
            <td style={{ width: '50%' }}>
              <div>
                <ul className={styles.ul}>
                  {rightNodes.map(item => (
                    <li
                      className={
                        targetElm == `t-q-${question.id}-a-${item.id}`
                          ? `${styles.active} ${styles.li}`
                          : `${styles.li}`
                      }
                      id={`t-q-${question.id}-a-${item.id}`}
                      key={`t-q-${question.id}-a-${item.id}`}
                      onClick={() => setTargetElm(`t-q-${question.id}-a-${item.id}`)}
                    >
                      {ReactHtmlParser(item.content)}
                    </li>
                  ))}
                </ul>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  )
}
