<template>
  <div class="flex flex-col items-center p-4">
    <h1 class="text-3xl font-bold mb-4">Tree Manager</h1>
    <div>
      <svg ref="treeSvg" width="1000" height="500" class="border border-gray-300"></svg>
      <div class="mt-4">
        <div v-if="error" class="text-red-500 mb-2">{{ error }}</div>
        <input 
          v-model="newNodeParentId" 
          placeholder="Enter Parent Node ID" 
          type="number" 
          min="1" 
          @input="validateInput"
          class="border border-gray-300 p-2 rounded mr-2"
        />
        <button @click="addNode" class="bg-blue-600 text-white p-2 rounded mr-2 hover:bg-blue-700 transition duration-200 ease-in-out">Add Node</button>
        <button @click="initTree" class="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-200 ease-in-out">Init Tree</button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchTreeNodes, addNode, initTree } from "@/services/apiService.js"
import * as d3 from "d3"

export default {
  data() {
    return {
      nodes: [],
      error: null,
      newNodeParentId: '',
    }
  },
  async mounted() {
    this.error = null
    try {
      const response = await fetchTreeNodes()
      //console.log(esponse.data)
      this.nodes = response.data
      this.drawTree(this.nodes)
    } catch (err) {
      this.error = "Failed to load tree nodes."
    }
  },
  methods: {
    buildHierarchy(flatNodes) {
      const map = {}
      flatNodes.forEach((node) => {
        map[node.id] = { ...node, children: [] }
      })

      const hierarchy = []
      flatNodes.forEach((node) => {
        if (node.pid === null) {
          hierarchy.push(map[node.id])
        } else if (map[node.pid]) {
          map[node.pid].children.push(map[node.id])
        }
      })

      return hierarchy[0]
    },

    drawTree(nodes) {
      const rootData = this.buildHierarchy(nodes)

      const svg = d3.select(this.$refs.treeSvg)
      const width = +svg.attr("width")
      const height = +svg.attr("height")

      svg.selectAll("*").remove()

      const g = svg.append("g").attr("transform", "translate(40,40)")

      const treeLayout = d3.tree().size([width - 100, height - 100])

      const root = d3.hierarchy(rootData)
      treeLayout(root)

      // Draw links
      g.selectAll(".link")
        .data(root.links())
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y)
        .attr("stroke", "#ccc")
        .attr("stroke-width", 2)

      // Draw nodes
      const node = g
        .selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${d.x},${d.y})`)

      // Append node circles
      node
        .append("circle")
        .attr("r", 15)
        .attr("fill", "#66CCFF")

      // Append text
      node
        .append("text")
        .attr("x", 0)
        .attr("dy", 5)
        .attr("text-anchor", "middle")
        .text((d) => d.data.id)
      node
        .append("text")
        .attr("x", 15)
        .attr("dy", 25)
        .attr("text-anchor", "start")
        .style("font-size", "12px")
        .text((d) => `PID: ${d.data.pid}`)


    },

    async addNode() {
      const parentId = this.newNodeParentId
      if (!parentId) {
        this.error = "Please enter a valid Parent Node ID."
        return
      }

      try {
        const response = await addNode(parentId)
        if (response.success) {
          // Simulate adding the new node to the local nodes array
          const newNode = {
            id: response.data.newNodeId,
            pid: parentId,
          }

          // Update the nodes array and redraw the tree
          this.nodes.push(newNode)
          this.drawTree(this.nodes)
          this.newNodeParentId = ''
          this.error = ''
        } else {
          this.error = response.message
        }
      } catch (error) {
        this.error = "An error occurred while adding the node."
      }
    },

    async initTree() {
      this.error = null
      try {
        const response = await initTree()
        if (response.success) {
          this.nodes = [{ id: response.data.rootId, pid: null }]
          this.drawTree(this.nodes)
        } else {
          this.error = response.message
        }
      } catch (err) {
        this.error = "Failed to initialize the tree."
      }
    },
  },
}
</script>

<style scoped>
.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}

.node text {
  font-size: 12px;
  font-family: sans-serif;
}
</style>
