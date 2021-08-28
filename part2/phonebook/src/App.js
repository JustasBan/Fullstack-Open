import React, { useState, useEffect } from 'react'
import serverComms from './services/serverComms'

const Notification = ({ message, classString }) => {

  if (message === null) {
    return null
  }

  return (
    <div className={classString}>
      {message}
    </div>
  )
}

const ListItem = (props) => {
  return (
    <div>
    <p> {props.id} {props.name} {props.number}</p>
    <button onClick={() => props.deleteHandle(props.id, props.setNotificationMessage, props.setNotificationMode)}>delete</button>
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

    let id = props.persons.filter(person => person.name === personObj.name).map(thing => thing.id)[0]
    let tempPerson = props.persons.filter(person => person.id === id)

    if(found){

      if(window.confirm(tempPerson.map(thing => thing.name) + ' is already added to phonebook, replace number?')){
      
        const changedPerson =  { ...tempPerson[0], number: props.newNumber}

        serverComms
          .change(changedPerson)
          .then(response =>{

            console.log('change promise fullfiled');

            props.setNotificationMode('change')

            props.setNotificationMessage(
              `Person '${tempPerson.map(thing => thing.name)}' number changed`
            )

            setTimeout(()=> {
              props.setNotificationMessage(null)
            }, 5000)

            props.setPersons(props.persons.map(person => person.id !== id ? person : response.data))
          })
          .catch(error => {
            
            props.setNotificationMode('error')

            props.setNotificationMessage(
              `Person '${tempPerson.map(thing => thing.name)}' already removed`
            )

            setTimeout(()=> {
              props.setNotificationMessage(null)
            }, 5000)

            props.setPersons(props.persons.filter(n => n.id !== id))
          })
      }
    }
    else{

      serverComms
        .create(personObj)
        .then(initialPerson => {

          console.log('adding promise fullfiled');
          props.setPersons(props.persons.concat(initialPerson))

          props.setNotificationMode('change')

          props.setNotificationMessage(
            `'${initialPerson.name}' added`
          )

          setTimeout(()=> {
            props.setNotificationMessage(null)
          }, 5000)

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
      {props.personsToShow.map(person => <ListItem key={person.name} name={person.name} number={person.number} id={person.id} deleteHandle={props.deleteHandle} setNotificationMessage={props.setNotificationMessage} setNotificationMode={props.setNotificationMode}/>)}
    </div>
  )
}


const App = () => {

  //states
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ notificationMode, setNotificationMode ] = useState('')

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

  const deleteHandle = (id, setNotificationMessage, setNotificationMode) =>{

    let tempPerson = persons.filter(person => person.id === id)

    if(window.confirm("Dou you want to delete " + tempPerson.map(thing => thing.name) + " ?")){
      console.log('deleted ' + id);

      serverComms
        .erase(id)
        .then(response => {
          console.log('delete promise fullfilled');

          setNotificationMode('change')

          setNotificationMessage(
            `${tempPerson.map(thing => thing.name)} deleted`
          )

          setTimeout(()=> {
            setNotificationMessage(null)
          }, 5000)

          setPersons(persons.filter(person => person.id !== id))
        })
    }
    else
    {
      console.log('delete of ' + id + ' cancelled');
    }
    
  }

  const replaceNum = ({id, newNum}) =>{
    let tempPerson = persons.filter(person => person.id === id)
    console.log(id);

    if(window.confirm(tempPerson.map(thing => thing.name) + 'is already added to phonebook, replace number?')){
      const changedPerson = { ...tempPerson, number: newNum}

      serverComms
        .change(changedPerson)
        .then(response =>{
          setPersons(persons.map(person => person.id !== id ? person : response.data))
        })
    }
    
  }

  return (
    <div>
      <Notification message={notificationMessage} classString={notificationMode}/>
    <Search newFilter={newFilter} handleFilterChange={handleFilterChange}/>
    <PersonForm setNotificationMessage={setNotificationMessage} setNotificationMode={setNotificationMode} replaceNum={replaceNum} setPersons={setPersons} persons={persons} setNewName={setNewName} setNewNumber={setNewNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
    <Persons personsToShow={persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))} deleteHandle={deleteHandle} setNotificationMessage={setNotificationMessage} setNotificationMode={setNotificationMode}/> 

    </div>
  )
}

export default App