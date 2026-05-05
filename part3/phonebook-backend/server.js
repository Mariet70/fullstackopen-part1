const express = require('express')
const cors = require('cors')

console.log("SERVER.JS IS RUNNING")

const app = express()

app.use(cors())          
app.use(express.json()) 

const PORT = process.env.PORT || 3002

let persons = []

app.get('/api/persons', (req, res) => {
  res.json(persons)
})
app.get('/test', (req, res) => {
  res.send('TEST WORKS')
})
app.post('/api/persons', (req, res) => {
  const body = req.body

  console.log("POST RECEIVED:", body)

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const newPerson = {
    id: Math.floor(Math.random() * 10000).toString(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)

  res.json(newPerson)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})