import { useState, useEffect } from 'react'
import axios from 'axios'
import './app.css'

const baseUrl = 'http://localhost:3001/persons'
const App = () => {
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState(``)
  const [showMessage, setShowMessage] = useState(false)
  const [newErrorMessage, setNewErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  useEffect(()=>{
      axios.get(baseUrl)
      .then(
        resposne =>{
          setPersons(resposne.data)
        }
      )
  },[])


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) =>{
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addDetails = (event) =>{
    event.preventDefault()

    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }

    console.log("added")
    const personObj = {
      name: newName,
      number:newNumber
    }

    axios.post(baseUrl, personObj).then(
      resposne => {
        setPersons(persons.concat(resposne.data))
        setNewName("")
        setNewNumber("")
        
        setNewMessage(`added ${resposne.data.name}`)
        setShowMessage(true)
        setTimeout(
          ()=>{
            setShowMessage(false)
            setNewMessage(null)
          },3000
        )
      }
    ).catch(
      (err) => {
        setNewErrorMessage(`error (${err.message})`)
        setShowError(true)
        setTimeout(
          ()=>{
            setShowError(false)
            setNewErrorMessage(null)
          },3000
        )
      }
    )
    
    
  }
  const FilteredPersons = persons.filter((person)=>
    person.name.includes(newFilter)
  )
  const deletePerson = (id,name) =>{
    if(window.confirm(`delete ${name}`)){
      axios.delete(`${baseUrl}/${id}`)
      .then(() =>{
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div className={showMessage ? "message" : "hidden"}>
        {newMessage}
      </div>
      <div className={showError ? "error" : "hidden"}>
        {newErrorMessage}
      </div>
      <p>filter shown with <input value={newFilter} onChange={handleFilterChange} /></p>
      <h2>Add a new</h2>
      <form onSubmit={addDetails}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>

      {FilteredPersons.map(person => 
      <div key={person.id}>
        <p>{person.name} {person.number} </p>
        <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
      </div>
     )}
      
    </div>
  )
}

export default App
