const express = require('express')
const morgan = require('morgan')

const app = express()
morgan.token('body', (req) => JSON.stringify(req.body))

app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
const PORT = 3002

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const nameExists = persons.some(
    person => person.name === body.name
  )

  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    id: Math.floor(Math.random() * 10000).toString(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)

  response.json(newPerson)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})