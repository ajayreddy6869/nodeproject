var nodes = new vis.DataSet(Nodes);
var edges = new vis.DataSet(Edges);
var data = {
    nodes: nodes,
    edges: edges
  };
  var network;
  function redrawAll() {
    

    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {
      nodes: {
        shape: 'dot',
        scaling: {
          min: 10,
          max: 30
        },
        font: {
          size: 12,
          face: 'Tahoma'
        }
      },
      edges: {
        width: 0.15,
        color: {inherit: 'from'},
        smooth: {
          type: 'continuous'
        }
      },
      physics: {
        stabilization: false,
        barnesHut: {
          gravitationalConstant: -80000,
          springConstant: 0.001,
          springLength: 200
        }
      },
      interaction: {
        tooltipDelay: 200       
      }
    };

    // Note: data is coming from ./datasources/WorldCup2014.js
    network = new vis.Network(container, data, options);
    network.on('click', function (properties) {
    
      var currentNode = properties.nodes;
        alert(JSON.stringify(nodes.get(currentNode)))
    });
  }

 


$(document).ready(function () {
  redrawAll()
});