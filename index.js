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

const Info = () => {
    const now = new Date()
    const size = persons.length
    const text = "Puhelinluettelossa " + size + " henkilön tiedot <br><br>" + now.toString()
    return(       
        text 
    )
}

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info', (req, res) => {   
    res.send(Info())
  })

  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
  
    if ( person ) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })