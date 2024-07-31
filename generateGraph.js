// Import the required module
const Graph = require('graphology');

// Function to generate random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to create a graph with nodes and edges
const createGraph = (numNodes) => {
  const graph = new Graph({ multi: true });

  // Add nodes with random colors
//   for (let i = 0; i < numNodes; i++) {
//     graph.addNode(`n${i}`, { label: `Node ${i}`, size: 10, color: getRandomColor() });
//   }

    for (let i = 0; i < numNodes; i++) {
        graph.addNode(`n${i}`, { label: `Node ${i}`, 
        x: Math.random(), 
        y: Math.random(), 
        size: Math.floor(Math.random() * 15), 
        color: getRandomColor()  
    });
        //
        if (i> 2) {
        let source = `n${i}`;
        let target = `n${i-1}`;
        graph.addEdgeWithKey(`e${i}-1`, source, target, { label: `Edge ${i}-1`, size: Math.random() * 10 });
        
        target = `n${i-2}`;
        graph.addEdgeWithKey(`e${i}-2`, source, target, { label: `Edge ${i}-1`, size: Math.random() * 10 });
        }
    }

  return graph;
};

// Function to convert graph to a JSON-like structure
const graphToJSON = (graph) => {
  const nodes = [];
  const edges = [];

  graph.forEachNode((node, attributes) => {
    nodes.push({ key: node, attributes: {...attributes} });
  });

  graph.forEachEdge((edge, attributes, source, target) => {
    edges.push({ key: edge, source, target, attributes: {...attributes} });
  });

  return { nodes, edges };
};

// Main function
const main = () => {
  const numNodes = process.argv[2] ? process.argv[2] : 250;

  const graph = createGraph(numNodes);
  const graphData = graphToJSON(graph);

  console.log(JSON.stringify(graphData, null, 2));
};

// Run the main function
main();
