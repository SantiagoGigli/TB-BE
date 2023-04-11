
import express from 'express'
import routes from './src/routes/index.js'
import cors from 'cors'

export const app = express()
const port = 5000

app.use(cors())
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
