const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

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

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

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

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id) 
    persons = persons.filter(person => person.id !== id)
    
    res.status(204).end()
  })

  app.post('/api/persons', (req, res) => {
    console.log(req.body)
    
    if (req.body.name === '' || req.body.number === '') {
        return res.status(400).json({error: 'name or number missing'})
    } 
    const p = persons.find(person => person.name === req.body.name)
    if ( p ) {
        return res.status(400).json({error: 'name must be unique'})
    } else {
      const genId = Math.floor(Math.random() * 1000000000 + 10)

      const person = req.body
      person.id = Number(genId)
      persons.concat(person)
      console.log(person)

      res.status(201).json(person)
    }   
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })