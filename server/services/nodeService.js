import Node from '../models/Node.js'

class NodeService {

  async getTree() {
    const nodes = await Node.getAllNodes()
    return nodes
  }

  async addNode(parentId) {
    console.log(parentId)
    const parentNode = await Node.getNodeById(parentId)
    if (!parentNode) {
      return { success: false, message: `Parent node ${parentId} not found` }
    }

    const newNodeId = await Node.addNode(parentId)
    return { success: true, newNodeId }
  }

}

export default new NodeService()