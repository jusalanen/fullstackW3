import React from 'react';
import personService from '../services/personService';


const Person = (props) => {
    const person = props.person
    const handleDelete = props.handleDelete
    return (
        <tr><td width='200'>{person.name}: </td>
        <td width='150'>{person.number}</td>
        <td width='50'><button onClick = {function() {
                        if(window.confirm(
                            "Haluatko poistaa henkilön " + person.name)) {
                                personService.deletePerson(person.id)
                                .then( () => {
                                console.log("deleting person " + person.id)
                                handleDelete(person)
                                })
                            }
                        }}
                        >poista</button></td></tr>
    )    
}

export default Person