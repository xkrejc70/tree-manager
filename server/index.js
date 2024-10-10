import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import treeRoutes from './routes/v1/treeRoutes.js'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/v1', treeRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong on the server')
})

const PORT = process.env.PORT || 5005
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})