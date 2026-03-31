console.log(" THIS IS THE REAL FILE RUNNING ")

const express = require('express')
const app = express()

app.use(express.json())

const PORT = 3002

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]

app.get('/', (request, response) => {
  response.send('Phonebook backend is running')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  const count = persons.length
  const date = new Date()

  response.send(`
    <p>Phonebook has ${count} people</p>
    <p>${date}</p>
  `)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  console.log(" POST ROUTE HIT")

  const body = request.body

  const newPerson = {
    id: Math.floor(Math.random() * 10000).toString(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)

  response.json(newPerson)
})
app.post('/test-post', (req, res) => {
  console.log("🔥 TEST POST WORKED")
  res.send("POST OK")
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})