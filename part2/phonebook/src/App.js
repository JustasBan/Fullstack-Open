import React, { useState } from 'react'

const ListItem = (props) => {
  return (
    <p>{props.name} {props.number}</p>
  )
}

const Search = (props) =>(
    <div>
    <h2>Search</h2>
    < input value={props.newFilter} onChange={props.handleFilterChange}/>
    </div>
    )

const PersonForm = (props) => {

  //adding to list
  const addPerson = (event) => {
    event.preventDefault()

    const personObj = {name: props.newName, number: props.newNumber}

    let found = false;

    if (props.persons.filter(e => e.name === personObj.name).length > 0) {
      found=true
    }

    if(found){
      window.alert(personObj.name + ' already exists');

    }
    else{
      props.setPersons(props.persons.concat(personObj))

    }

    props.setNewName('')
    props.setNewNumber('')
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>

        <div>
          name: <input value={props.newName} onChange={props.handleNameChange} />
          <br />
          number: <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>

      </form>
    </div>
  )
}

const Persons = (props) => {

  return(
    <div>
      <h2>Numbers</h2>
      {props.personsToShow.map(person => <ListItem key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )
}


const App = () => {

  //states
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  //handlers
  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)

  }

  const handleFilterChange = (event) =>{
    console.log(event.target.value)
    setNewFilter(event.target.value)

  }

  return (
    <div>

    <Search newFilter={newFilter} handleFilterChange={handleFilterChange}/>
    <PersonForm setPersons={setPersons} persons={persons} setNewName={setNewName} setNewNumber={setNewNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
    <Persons personsToShow={persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))}/> 

    </div>
  )
}

export default App