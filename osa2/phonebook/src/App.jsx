import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <p>filter shown with <input value={props.search} onChange={props.handler}/></p>
  )
}

const Title = ({title}) => {
  return (
    <h2>{title}</h2>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.oS}>
        <div>
          name: <input value={props.nName} onChange={props.oC[0]} />
        </div>
        <div>
          number: <input value={props.nNumber} onChange={props.oC[1]} />
        </div>
        <div>
          <button type="submit">{props.btnTxt}</button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const addName = (event) => {
    console.log(persons)
    event.preventDefault()
    if (persons.find(n => n.name == newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    console.log('button click',event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(toTitleCase(event.target.value))
    console.log(newFilter)
  }

  const Numbers = ({nums}) => {
    const filteredData = persons.filter(x => x.name.includes(newFilter))
    const output = filteredData.map((person) => <p key={person.name}>{person.name} {person.number}</p>)
    console.log(filteredData)
    
    return (
      <div>
        {output}
      </div>
    )
  }

  const toTitleCase = (str) => {
    const titleCase = str
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ')
  
    return titleCase;
  }



  return (
    <div>
      
      <Title title='Phonebook' />

      <Filter search={newFilter} handler={handleFilter} />
      
      <Title title='add new' />

      <PersonForm oS={addName} nName={newName} nNumber={newNumber} oC={[handleNameChange, handleNumberChange]} btnTxt={'add'} />

      <Title title='Numbers' />

      <Numbers nums={persons} />
      
    </div>
  )

}
export default App