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
export default function MatchingQuestion({ question, onChanged, data }) {
  const editorRef = useRef()
  const [jsPlumbLoaded, setJsPlumbLoaded] = useState(false)
  const { jsPlumb } = editorRef.current || {}
  const [sourceElm, setSourceElm] = useState(null)
  const [targetElm, setTargetElm] = useState(null)
  const [leftNodes, setLeftNodes] = useState([])
  const [rightNodes, setRightNodes] = useState([])
  const [connections, setConnections] = useState(null)
  const [endpoints, setEndpoints] = useState([])

  useEffect(() => {
    editorRef.current = {
      jsPlumb: require('jsPlumb')
    }
    setJsPlumbLoaded(true)
  }, [])

  useEffect(() => {
    if (!connections) return
    if (onChanged) {
      onChanged(connections)
    }
  }, [connections])

  const [jsPlumbInstance, setJsPlumbInstance] = useState(null)
  const container = useRef(null)

  useEffect(() => {
    if (!question) return
    setLeftNodes(question.answers.filter(x => x.order % 2 == 0))
    setRightNodes(question.answers.filter(x => x.order % 2 != 0))
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
      // Delete existed endpoint
      const sourceEndpoint = endpoints.find(x => x.elementId == sourceElm)
      if (sourceEndpoint) {
        jsPlumbInstance.deleteEndpoint(sourceEndpoint)
      }

      const targetEndpoint = endpoints.find(x => x.elementId == targetElm)
      if (targetEndpoint) {
        jsPlumbInstance.deleteEndpoint(targetEndpoint)
      }

      const p1 = jsPlumbInstance.addEndpoint(sourceElm, sourceOption)
      const p2 = jsPlumbInstance.addEndpoint(targetElm, targetOption)
      jsPlumbInstance.connect({
        source: p1,
        target: p2
      })

      setSourceElm(null)
      setTargetElm(null)

      setEndpoints(prev => [...prev, p1, p2])

      let newConnections = connections || {}
      newConnections[sourceElm.toString()] = targetElm
      setConnections({ ...newConnections })

      jsPlumbInstance.repaintEverything()
    }
  }

  useEffect(() => {
    if (!data || !jsPlumbInstance) return

    let endpoints = []
    Object.keys(data).forEach(s => {
      const p1 = jsPlumbInstance.addEndpoint(s, sourceOption)
      const p2 = jsPlumbInstance.addEndpoint(data[s], targetOption)

      jsPlumbInstance.connect({
        source: p1,
        target: p2
      })

      endpoints.push(p1)
      endpoints.push(p2)
    })

    setEndpoints(endpoints)
    jsPlumbInstance.repaintEverything()
  }, [data, jsPlumbInstance])

  return (
    <>
      <div ref={container}>
        <table style={{ width: '100%' }}>
          <tr>
            <td style={{ width: '50%' }}>
              <div id='select_list_lebensbereiche'>
                <ul className={styles.ul}>
                  {leftNodes.map(item => (
                    <li
                      className={styles.li}
                      id={`${item.id}`}
                      key={`${item.id}`}
                      onClick={() => setSourceElm(`${item.id}`)}
                    >
                      {ReactHtmlParser(item.content)}
                    </li>
                  ))}
                </ul>
              </div>
            </td>
            <td style={{ width: '50%' }}>
              <div id='select_list_wirkdimensionen'>
                <ul className={styles.ul}>
                  {rightNodes.map(item => (
                    <li
                      className={styles.li}
                      id={`${item.id}`}
                      key={`${item.id}`}
                      onClick={() => setTargetElm(`${item.id}`)}
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
