import { useEffect, useState } from 'react'
import numberService from './services/numbers'

const Filter = (props) => {
  return (
    <p>filter shown with <input value={props.search} onChange={props.handler}/></p>
  )
}

const Title = ({title}) => {
  return (
    <h2 className='title'>{title}</h2>
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

const Numbers = ({nums, filter, oC}) => {

  const filteredData = nums.filter(x => x.name.includes(filter))
  const output = filteredData.map(
    (person) => 
      <p key={person.name}>
        {person.name}
        &nbsp;
        {person.number} 
        &nbsp;
        <button onClick={oC(person.id, person.name)}>delete</button>
      </p>
  )
  return (
    <div>
      {output}
    </div>
  )
}

const Notification = (props) => {
  console.log(props)
  if (props.info === null && props.error === null) {
    return null
  }

  if(props.info) {
    return (
      <div className="infoGreen">
        {props.info}
      </div>
    )
  }
  if(props.error) {
    return (
      <div className="infoRed">
        {props.error}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    numberService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  
  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const getPerson = persons.find(n => n.name == newName)
    console.log(getPerson)
    if (getPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        numberService
          .update(getPerson.id, nameObject)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(person => person.id !== getPerson.id ? person : returnedPerson))
            setInfoMessage(`Number has been changed for ${newName}!`)
              setTimeout(() => {
                setInfoMessage(null)
              }, 5000)
          })
      }
    } else {
    
      numberService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setInfoMessage(`Added ${newName}`)
            setTimeout(() => {
              setInfoMessage(null)
            }, 5000)
          setNewName('')
          setNewNumber('')
        })
    } 
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(toTitleCase(event.target.value))
    //console.log(newFilter)
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

  const deleteName = (id, name) => () => {
    if (window.confirm("Delete " + name + "?")) {
      console.log(id)
      numberService
        .deletePerson(id)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.filter((person) => person.id !== id))
          setErrorMessage(`Deleted ${name}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
        })
        .catch(error => {
          console.log(error.message)
          setPersons(persons.filter((person) => person.id !== id))
          setErrorMessage(`Information of ${name} has already been removed from server!`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
        })
    }
  }

  return (
    <div>
      
      <Title title='Phonebook' />

      <Filter search={newFilter} handler={handleFilter} />
      
      <Title title='Add new' />

      <Notification info={infoMessage} error={errorMessage} />

      <PersonForm oS={addName} nName={newName} nNumber={newNumber} oC={[handleNameChange, handleNumberChange]} btnTxt={'add'} />

      <Title title='Numbers' />

      <Numbers nums={persons} filter={newFilter} oC={deleteName} />
      
    </div>
  )

}
export default App