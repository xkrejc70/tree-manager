import NodeService from '../services/nodeService.js'

export const getTree = async (req, res, next) => {
  try {
    const tree = await NodeService.getTree()
    res.status(200).json({ success: true, data: tree })
  } catch (error) {
    next(error)
  }
}

export const addNode = async (req, res, next) => {
  try {
    const { parentId } = req.body
    const result = await NodeService.addNode(parentId)
    if (!result.success) {
      return res.status(201).json({ success: false, message: result.message })
    }
    res.status(201).json({ success: true, data: { newNodeId: result.newNodeId } })
  } catch (error) {
    next(error)
  }

}