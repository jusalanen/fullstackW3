const mongoose = require('mongoose')

// ethän laita salasanaa Githubiin!
const url = 'mongodb://**********:puhluettO3@ds217092.mlab.com:17092/fullstack-phonebook'

mongoose.connect(url, { useNewUrlParser: true }) //NewUrlParser to prevent DeprecationWarning

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person