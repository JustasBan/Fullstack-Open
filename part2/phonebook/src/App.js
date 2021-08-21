import React, { useState, useEffect } from 'react'
import serverComms from './services/serverComms'

const ListItem = (props) => {
  return (
    <div>
    <p> {props.id} {props.name} {props.number}</p>
    <button onClick={() => props.deleteHandle(props.id)}>delete</button>
    </div>
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

      serverComms
        .create(personObj)
        .then(initialPerson => {

          console.log('adding promise fullfiled');
          props.setPersons(props.persons.concat(initialPerson))

          props.setNewName('')
          props.setNewNumber('')
        })

    }
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
      {props.personsToShow.map(person => <ListItem key={person.name} name={person.name} number={person.number} id={person.id} deleteHandle={props.deleteHandle}/>)}
    </div>
  )
}


const App = () => {

  //states
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    serverComms
      .getAll()
      .then(initialPerson => {
        console.log('getting promise fullfilled')
        setPersons(initialPerson)
      })
  }, [])

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

  const deleteHandle = id =>{

    let tempPerson = persons.filter(person => person.id === id)

    if(window.confirm("Dou you want to delete " + tempPerson.map(thing => thing.name) + " ?")){
      console.log('deleted ' + id);

      serverComms
        .erase(id)
        .then(response => {
          console.log('delete promise fullfilled');
          setPersons(persons.filter(person => person.id !== id))
        })
    }
    else
    {
      console.log('delete of ' + id + ' cancelled');
    }
    
  }

  return (
    <div>

    <Search newFilter={newFilter} handleFilterChange={handleFilterChange}/>
    <PersonForm setPersons={setPersons} persons={persons} setNewName={setNewName} setNewNumber={setNewNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
    <Persons personsToShow={persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))} deleteHandle={deleteHandle}/> 

    </div>
  )
}

export default App