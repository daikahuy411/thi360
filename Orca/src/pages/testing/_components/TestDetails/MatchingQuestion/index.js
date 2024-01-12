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

export default function MatchingQuestion({ question, onChanged }) {
  const editorRef = useRef()
  const [jsPlumbLoaded, setJsPlumbLoaded] = useState(false)
  const { jsPlumb } = editorRef.current || {}
  const [sourceElm, setSourceElm] = useState(null)
  const [targetElm, setTargetElm] = useState(null)
  const [leftNodes, setLeftNodes] = useState([])
  const [rightNodes, setRightNodes] = useState([])
  const [connections, setConnections] = useState([])
  const [endpoints, setEndpoints] = useState([])

  useEffect(() => {
    editorRef.current = {
      jsPlumb: require('jsPlumb')
    }
    setJsPlumbLoaded(true)
  }, [])

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

      setConnections(prev => [
        ...prev,
        {
          s: sourceElm,
          t: targetElm
        }
      ])

      jsPlumbInstance.repaintEverything()
    }
  }

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
                      id={`s-${item.id}`}
                      key={`s-${item.id}`}
                      onClick={() => setSourceElm(`s-${item.id}`)}
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
                      id={`t-${item.id}`}
                      key={`t-${item.id}`}
                      onClick={() => setSourceElm(`t-${item.id}`)}
                    >
                      {ReactHtmlParser(item.content)}
                    </li>
                  ))}
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ width: '50%' }}>
              <div id='select_list_lebensbereiche'>
                <ul className={styles.ul}>
                  <li className={styles.li} id='match1' onClick={() => setSourceElm('match1')}>
                    Source 1
                  </li>
                  <li className={styles.li} id='match2' onClick={() => setSourceElm('match2')}>
                    Source 2
                  </li>
                  <li className={styles.li} id='match3' onClick={() => setSourceElm('match3')}>
                    Source 3
                  </li>
                  <li className={styles.li} id='match4' onClick={() => setSourceElm('match4')}>
                    Source 4
                  </li>
                </ul>
              </div>
            </td>
            <td style={{ width: '50%' }}>
              <div id='select_list_wirkdimensionen'>
                <ul className={styles.ul}>
                  <li className={styles.li} id='answer1' onClick={() => setTargetElm('answer1')}>
                    Target 1
                  </li>
                  <li className={styles.li} id='answer2' onClick={() => setTargetElm('answer2')}>
                    Target 2
                  </li>
                  <li className={styles.li} id='answer3' onClick={() => setTargetElm('answer3')}>
                    Target 3
                  </li>
                  <li className={styles.li} id='answer4' onClick={() => setTargetElm('answer4')}>
                    Target 4
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  )
}
