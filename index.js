const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// ------GET------

app.get('/info', (request, response) => {
    response.send(`<h2>Phonebook has info for ${persons.length} people</h2><h3>${new Date()}</h3>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(entry => entry.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})



// -----POST------
app.post('/api/addEntry', (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({
            error: 'No object received ya dingus'
          })
    }

    function generateId() {
        const newId = Math.floor(Math.random() * 100)
        for (let person of persons) {
            if (newId === persons.id) {
                generateId()
            }
        return newId
        }
    }

    const person = {
        id : generateId(),
        name : body.name || 'anonymous',
        number: body.number || 'none'
      }
      
    persons = persons.concat(person)
    response.json(person)
})




// ------DELETE------

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(entry => entry.id !== id)

    response.status(204).end()
})







const PORT = 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))