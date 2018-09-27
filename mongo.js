const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}
const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true }) //NewUrlParser to prevent DeprecationWarning

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (process.argv.length === 2) {
  console.log('')
  console.log('puhelinluettelo:')
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(person.name + ' ' + person.number)
      })
      mongoose.connection.close()
    })
} else if (process.argv.length === 4) {
  const na = process.argv[2]
  const nu = process.argv[3]
  const person = new Person({
    name: na,
    number: nu
  })
  person
    .save()
    .then(response => {
      console.log('lisätään henkilö ' +person.name+ ' numero ' +person.number+' luetteloon')
      mongoose.connection.close()
    })
} else {
  console.log('tiedot annettu väärin')
  mongoose.connection.close()
}
