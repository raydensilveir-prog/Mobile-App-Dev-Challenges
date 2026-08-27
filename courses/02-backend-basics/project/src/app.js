const express = require('express')
const logger = require('./middleware/logger')
const notesRouter = require('./routes/notes')

const app = express()
app.use(express.json())
app.use(logger)
app.use('/notes',notesRouter)

app.use((req,res)=>{
  res.status(404).json({
    error:'Route unknown'
  })
})

app.use((err,req,res,next)=>{
  void req
  void next

  const statusCode = err.status || err.statusCode || 500

  res.status(statusCode).json({
    error:err.message || 'Internal server error'
  })
})

export {app}