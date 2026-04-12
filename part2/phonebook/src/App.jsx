import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number:'040-1234567'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
    setPersons(persons.concat(personObj))

    setNewName("")
    setNewNumber("")
    
  }
  const FilteredPersons = persons.filter((person)=>
    person.name.includes(newFilter)
  )
  return (
    <div>
      <h2>Phonebook</h2>
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

      {FilteredPersons.map((person,index) => 
        <p key={index}>{person.name} {person.number} </p>
      )}
      
    </div>
  )
}

export default App
