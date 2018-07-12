const express = require('express')
const app = express()

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Valtteri Vihavainen",
      "number": "0400-4561145",
      "id": 2
    },
    {
      "name": "Laura Virtanen-Tukiainen",
      "number": "044-789654",
      "id": 3
    },
    {
      "name": "Charlie Brown",
      "number": "555-321456",
      "id": 4
    }
  ]

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })