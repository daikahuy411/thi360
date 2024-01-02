jQuery(document).ready(function () {
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

  jsPlumb.importDefaults({
    ConnectionsDetachable: true,
    ReattachConnections: true,
    maxConnections: 1,
    Container: 'page_connections'
  })

  var questionEndpoints = [] // 'source' and 'target' endpoints

  var sourceEndpoints = [] // 'source' and 'target' endpoints
  var targetEndpoints = [] // 'source' and 'target' endpoints

  // "source" click handler
  jQuery('#select_list_lebensbereiche ul > li').click(function () {
    const currentElm = jQuery(this)
    // check source is existed
    //remove existing start endpoint, if any:
    // jsPlumb.deleteEndpoint(questionEndpoints[0]);
    // add a new one on the clicked element:
    var isExisted = sourceEndpoints.find(x => x.elementId == currentElm.id)
    if (!isExisted) {
      sourceEndpoints.push(jsPlumb.addEndpoint(jQuery(this), sourceOption))
    }
    // questionEndpoints[0] = jsPlumb.addEndpoint(currentElm, sourceOption);
    connectEndpoints()
  })

  // "target" endpoint
  jQuery('#select_list_wirkdimensionen ul > li').click(function () {
    const currentElm = jQuery(this)

    var isExisted = targetEndpoints.find(x => x.elementId == currentElm.id)
    if (!isExisted) {
      targetEndpoints.push(jsPlumb.addEndpoint(jQuery(this), targetOption))
    }

    // if (!questionEndpoints[0]) return; // don't respond if a source hasn't been selected
    // remove existing endpoint if any
    // jsPlumb.deleteEndpoint(questionEndpoints[1]);
    //create a new one:
    // questionEndpoints[1] = jsPlumb.addEndpoint(jQuery(this), targetOption);
    connectEndpoints()
  })

  var connectEndpoints = function () {
    sourceEndpoints.map((source, index) => {
      if (targetEndpoints[index]) {
        jsPlumb.connect({
          source: source,
          target: targetEndpoints[index]
        })
      }
    })
    // jsPlumb.connect({
    //   source: questionEndpoints[0],
    //   target: questionEndpoints[1]
    // });
  }
})
