import express from 'express';
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong on the server')
})

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})