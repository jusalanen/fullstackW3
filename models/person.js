const mongoose = require('mongoose')
const Schema = mongoose.Schema

// ethän laita salasanaa Githubiin!
const url = 'mongodb://o3backend:**********@ds217092.mlab.com:17092/fullstack-phonebook'

mongoose.connect(url, { useNewUrlParser: true }) //NewUrlParser to prevent DeprecationWarning

let personSchema = new Schema({
  name: String,
  number: String
})
personSchema.statics.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const Person = mongoose.model('Person', personSchema)


module.exports = Person