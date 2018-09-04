import React from 'react';
import Phonebook from './components/Phonebook';
import personService from './services/personService';
import Notification from './components/Notification'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        persons: [],
        newName: '',
        newNumber: '',
        filter: '',
        message: null
        }
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(delPerson) {
        const p = this.state.persons.filter(person => person.name !== delPerson.name)
        this.setState({persons: p})
        this.setState({ 
            message: '' + delPerson.name + ' poistettu luettelosta.' })
        setTimeout( () => {
            this.setState({ message: null })
        }, 5000)
    }

    componentDidMount() {
        personService.getAll()
        .then( response => {
            this.setState({persons: response.data})
        })
    }

    getPersons() {
        personService.getAll()
        .then( response => {
            this.setState({persons: response.data})
        })
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }

    addPerson = (event) => {
        event.preventDefault()
        const names = []
        this.state.persons.map(person => names.push(person.name))
        if(names.includes(this.state.newName)) {
            if (window.confirm(this.state.newName + 
                " on jo luettelossa. Korvataanko numero uudella?")) {
                    this.state.persons.forEach((person) => {
                        if(person.name === this.state.newName) {
                            const changedPerson = {
                                name: person.name,
                                number: this.state.newNumber,
                            }
                            personService.update(person.id, changedPerson)
                            .then( response => {
                                console.log(response.data)
                                this.getPersons()
                                this.setState({ newName: '', newNumber: '' })
                                this.setState({ 
                                    message: 'Henkilön ' + person.name + ' numero muutettu.'})
                                setTimeout( () => {
                                    this.setState({ message: null })
                                }, 5000)
                            }).catch( error => {
                                console.log(error)
                                if (window.confirm(this.state.newName +
                                ' on jo poistettu palvelimelta. Lisätäänkö uudelleen?')) {
                                    const personObj = {
                                        name: this.state.newName,
                                        number: this.state.newNumber
                                    }
                                    personService.create(personObj)
                                    .then( response => {
                                        this.getPersons()
                                        console.log(response.data)
                                    })
                                    this.setState({ newName: '', newNumber: '' })
                                    this.setState({ 
                                        message: personObj.name + ' lisätty luetteloon.'})
                                    setTimeout( () => {
                                        this.setState({ message: null })
                                    }, 5000)
                                }
                            })
                        }
                    })               
                } else {
                    this.setState({ newName: '', newNumber: '' })
                }    
        } else {
            if(this.state.newName === '' || this.state.newNumber === '') {
                window.alert('Nimi ja/tai numero puuttuu.')
            } else {
                const personObj = {
                    name: this.state.newName,
                    number: this.state.newNumber
                }
                personService.create(personObj)
                .then( response => {
                    if (response.data) {
                        const p = [].concat(response.data)//ota responsesta, kun Post mLabiin toimii
                        this.setState({ persons: this.state.persons.concat(p)})
                        this.setState({ 
                            message: personObj.name + ' lisätty luetteloon.'})
                        setTimeout( () => {
                            this.setState({ message: null })
                        }, 5000)
                    }      
                }).catch( error => {
                    console.log(error)
                })
                const emptyFields = () => {
                    this.setState({ newName: '' })
                    this.setState({ newNumber: '' })
                }
                setTimeout(emptyFields, 1200)     
            }                 
        }        
    }

    render() {
        const filtered = this.state.persons.filter(person => {
            return person.name.toLowerCase()
            .includes(this.state.filter.toLowerCase())
        })
        return (
        <div>
            <h2>Puhelinluettelo</h2>

            <Notification message={this.state.message}/>

            <div>
                rajaa näytettäviä: <input value={this.state.filter} 
                onChange={this.handleFilterChange}/>
            </div>
            <h3>Lisää uusi</h3>
            <form onSubmit={this.addPerson}>
                <div>
                    nimi: <input value={this.state.newName} 
                    onChange={this.handleNameChange}/>
                </div>
                <div>
                    numero: <input value={this.state.newNumber} 
                    onChange={this.handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
            <h3>Numerot</h3>
            <div>
                <Phonebook persons={filtered} handleDelete={this.handleDelete} />
            </div>
        </div>
        );
    } 
}

export default App;
