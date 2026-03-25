import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(
      person => person.name === newName
    )

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmUpdate) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber
        }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(
              persons.map(person =>
                person.id !== existingPerson.id ? person : response.data
              )
            )
            setNewName('')
            setNewNumber('')
            setMessage(`Updated ${response.data.name}`)
            setMessageType('success')

            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(() => {
            setMessage(
              `Information of ${existingPerson.name} has already been removed from server`
            )
            setMessageType('error')

            setTimeout(() => {
              setMessage(null)
            }, 3000)

            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }

      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${response.data.name}`)
        setMessageType('success')

        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(() => {
          setMessage(
            `Information of ${name} has already been removed from server`
          )
          setMessageType('error')

          setTimeout(() => {
            setMessage(null)
          }, 3000)

          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <Notification message={message} type={messageType} />
      <h2>Phonebook</h2>

      <div>
        filter shown with:
        <input value={filter} onChange={handleFilterChange} />
      </div>

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        persons={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App