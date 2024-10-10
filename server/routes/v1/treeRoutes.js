import express from 'express'
import { getTree, addNode } from '../../controllers/nodeController.js'
const router = express.Router()

router.get('/tree', getTree)

router.post('/addNode', addNode)

export default router