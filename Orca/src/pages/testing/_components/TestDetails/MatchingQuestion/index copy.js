'use client' // only in App Router
import React, {
  useEffect,
  useRef,
  useState
} from 'react'

import styles from './styles.module.css'

//OptionOjb
const OptObj = {
  isSource: true,
  isTarget: true,
  connector: ['Bezier', { curviness: 50 }],
  connectorStyle: { strokeWidth: 1, stroke: 'red' },
  hoverPaintStyle: { stroke: 'red', strokeWidth: 2 },
  scope: 'blueline',
  dragAllowedWhenFull: false,
  maxConnections: 5,
  endpoint: 'Dot'
}

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

const primaryNodes = [
  {
    name: '1',
    styleProps: { top: '80px', left: '250px' },
    id: 'e1'
  },
  {
    name: '2',
    styleProps: { top: '160px', left: '150px' },
    id: 'e2',
    target: 'e1'
  }
]

function Element(item) {
  const { name, target, id, styleProps = {}, instance } = item
  const element = useRef(null)

  useEffect(() => {
    instance &&
      instance.draggable(element.current, {
        grid: [14, 22],
        drag: function () {
          instance.repaintEverything()
        }
      })
    instance &&
      // Add endpoint
      instance.addEndpoint(element.current, { anchor: 'Right' }, OptObj)
    instance &&
      instance.bind('connection', () => {
        //alert("Connected");
      })
  }, [instance])

  useEffect(() => {
    target &&
      instance &&
      instance.connect({
        source: id,
        target
      })
  }, [target, id, instance])
  return (
    <div ref={element} id={id} className={styles.box} style={styleProps}>
      <h2>{name}</h2>
    </div>
  )
}

export default function MatchingQuestion() {
  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { jsPlumb } = editorRef.current || {}
  const [sourceElm, setSourceElm] = useState(null)
  const [targetElm, setTargetElm] = useState(null)

  useEffect(() => {
    editorRef.current = {
      jsPlumb: require('jsPlumb')
    }
    setEditorLoaded(true)
  }, [])

  const [nodes, setNodes] = useState([])
  const [instance, setInstance] = useState(null)
  const container = useRef(null)

  useEffect(() => {
    // alert("Connected");
  }, [])

  //GET INSTANCE OF JS PLUMB
  useEffect(() => {
    if (!editorLoaded) return
    const Instnc = jsPlumb.jsPlumb.getInstance({
      Container: container.current
    })
    // console.log(Instnc)
    //using useEffect to set instance
    setInstance(Instnc)
  }, [editorLoaded])

  const addPoint = () => {
    const p1 = instance.addEndpoint(sourceElm, sourceOption)
    const p2 = instance.addEndpoint(targetElm, targetOption)
    instance.connect({
      source: p1,
      target: p2
    })
    // setNodes(prev => [
    //   ...prev,
    //   {
    //     name: 'New',
    //     styleProps: { top: '260px', left: '420px' },
    //     id: `New_${Math.random()}`,
    //     instance: instance
    //   }
    // ])
  }

  return (
    <>
      <div ref={container}>
        <button onClick={addPoint}> Add connection point</button>
        <hr />

        <table style={{ width: '100%' }}>
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

        <hr />
        <div>
          {nodes.map(item => {
            return (
              <Element
                name={item.name}
                styleProps={item.styleProps}
                id={item.id}
                target={item.target}
                instance={instance}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
