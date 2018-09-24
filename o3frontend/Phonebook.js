import React from 'react';
import Person from './Person';

const Phonebook = (props) => {    
    const persons = props.persons
    const handleDelete = props.handleDelete
    
    return(
    <div><table width='400'><tbody>
        {persons.map(person =>                    
        <Person key={person.name} person={person} 
            handleDelete={handleDelete}/>               
        )}
     </tbody></table></div>
    )   
}

export default Phonebook
