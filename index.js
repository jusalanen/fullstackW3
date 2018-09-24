const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

 
app.get('/api/persons', (req, res) => {
  Person
  .find({})
  .then(persons => {
    const people = persons.map(Person.format)
    res.json(people)
  })
  .catch(error => {
    console.log(error)
  })
})

app.get('/info', (req, res) => {   
  const now = new Date()
  Person
    .find({})
    .then(result => {
      const size = result.length
      const text = "Puhelinluettelossa " + size + " henkilön tiedot <br><br>" + now.toString()
      res.send(text)
    }).catch(error => {
      console.log(error)
    })
})

app.get('/api/persons/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(person => { 
      res.json(Person.format(person))
    }).catch(error => {
      console.log(error)
      res.status(404).end()
    })    
})

app.delete('/api/persons/:id', (req, res) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    }).catch(error => {
      console.log(error)
      res.status(400).json({ error: 'bad id' })
    })     
})

app.put('/api/persons/:id', (req, res) => {
    if (req.body.name === undefined || req.body.number === undefined) {
        return res.status(400).json({ error: 'content missing' })
    }
    
    const person = {
    name: req.body.name,
    number: req.body.number
    }

  Person
    .findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(Person.format(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({ error: 'bad id' })
    })
})

app.post('/api/persons', (req, res) => {
  if (req.body.name === undefined || req.body.number === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
    
  console.log(req.body)
  
  if (req.body.name === '' || req.body.number === '') {
    return res.status(400).json({ error: 'name or number missing' })
  }
  Person
    .find({})
    .then(persons => {
      const p = persons.find(person => person.name === req.body.name)
    if ( p ) {
      return res.status(400).json({ error: 'name must be unique' })
    } else {
      const person = new Person({
        name: req.body.name,
        number: req.body.number
      })
     
      person
        .save()
        .then(savedPerson => {
          res.status(201).json(Person.format(savedPerson))
          console.log(savedPerson)
        })
        .catch(error => {
          console.log(error)
        })   
    }  
  })
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})