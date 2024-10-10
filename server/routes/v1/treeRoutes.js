import express from 'express'
import { getTree, addNode, initTree } from '../../controllers/nodeController.js'
const router = express.Router()

router.get('/getTree', getTree)

router.post('/addNode', addNode)

router.post('/initTree', initTree)

export default router