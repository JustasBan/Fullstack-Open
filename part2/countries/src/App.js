import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const Countries = (props) => {

  if(props.countriesToShow.length > 10){

    return(
      <div>
        <h2>Results:</h2>
        too many rezults
      </div>
    )

  }
  else{

    if(props.countriesToShow.length > 1){

      return(
        <div>
          <h2>Results:</h2>
          {props.countriesToShow.map(country => <ListItem key={country.name} name={country.name} number={country.number}/>)}
        </div>
      )

    }
    else{

      if(props.countriesToShow.length > 0){

        return(
          <div>
            <h2>{props.countriesToShow.map(country => <div key={country.name}><p>{country.name}</p></div>)}</h2>
            {props.countriesToShow.map(country => <div key={country.name}><p>capital {country.capital}</p></div>)}
            {props.countriesToShow.map(country => <div key={country.name}><p>population {country.population}</p></div>)}

            <h3>languages:</h3>
            {props.countriesToShow.map(country => <div key={country.name}>
              <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
              </ul>
            </div>)}

            {props.countriesToShow.map(country => <div key={country.name}><img width="150px" src={country.flag}></img></div>)}
            
          </div>
        )
      }
      else{
        return(
          <div>
          <h2>Results:</h2>
          none
        </div>
        )
      }
    }

  }
}

const App = () => {

  //states
  const [ countries, setCountries ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')

  //handlers
  const handleFilterChange = (event) =>{
    console.log(event.target.value)
    setNewFilter(event.target.value)

  }

  //fetching data
  useEffect(() => {
    //console.log('effect')

    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        //console.log('promise fullfiled')
        setCountries(response.data)
      })
  })

  return(
    <div>
      <Search newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <Countries countriesToShow={countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))}/>
    </div>
  )
}


export default App;
