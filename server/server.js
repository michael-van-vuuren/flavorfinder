import express from 'express'
import cors from 'cors'
import routes from './api/database.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', routes)
app.use('/', (req, res) => res.send('welcome to the backend'))
app.use('*', (req, res) => res.status(404).json({error: 'not found'}))

export default app