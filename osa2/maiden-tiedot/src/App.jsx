import { useEffect, useState } from 'react'
import countryService from './service/countries'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>find countries: <input value={props.search} onChange={props.handler}/></div>
  )
}

const Title = ( {name} ) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = (props) => {

  const [weather, setWeather] = useState({})
  const [capital, setCapital] = useState(null)

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  const weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast'
  
  useEffect(() => {
    console.log('effect run, city is now', capital)
    if (capital) {
      console.log('fetching weather...')
      axios
        .get(`${weatherUrl}?appid=${apiKey}&q=${capital}&units=metric`)
        .then(response => {
          setWeather(response.data.list[0])
        })
    }
  }, [capital])

  const filteredData = props.countries.filter(x => x.name.common.includes(props.filter))
  const countriesOut = filteredData.map(x => 
    <p key={x.name.official}>
      { x.name.common } &nbsp;
      <button onClick={props.click(x.name.common)} >
        show
      </button>
    </p>)
  
  let message = ""
  
  if (props.filter.length === 0) {
     message = ""
  }
  else if ( filteredData.length > 10 ) {
    message = "Too many matches, specify another filter"
  }
  else {
    message = countriesOut
  }

  if (filteredData.length === 1) {

    const country = filteredData[0]
    
    if (capital != country.capital[0]) {
      setCapital(country.capital[0])
    }

    const languages = Object.values(country.languages).map(x => <li key={x}>{x}</li>)
    const temp = weather.main ? weather.main.temp : null
    const icon = weather.weather ? weather.weather[0].icon : null
    const wind = weather.wind ? weather.wind.speed : null
    
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital: <strong>{capital}</strong></p>
        <p>area: <strong>{country.area} km&sup2;</strong></p>

        <h4>Languages:</h4>
        <div>
        <ul>
          {languages}
        </ul>
        </div>
        <div><img src={country.flags.png} /></div>

        <h2>Weather in {capital}</h2>
        <p>temperature:  <strong>{temp} &deg;C</strong></p>
        <p><img src = {`https://openweathermap.org/img/wn/${icon}@2x.png`} /></p>
        <p>wind: <strong>{wind} m/s</strong></p>
        
      </div>
    )
  }

  /***
  props.countries.forEach(element => {
    console.log(element.name.official)
  });
  */
  
  return (
    <div>
      {message}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
  }
  useEffect(hook, [])

  const handleFilter = (event) => {
    setFilter(toTitleCase(event.target.value))
    console.log(event.target.value)
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
  
  const handleClick = (name) => () => {
    const getCountry = countries.filter(x => x.name.common.includes(name))
    
    setFilter(name)
    console.log(getCountry)    
  }

  return (
    <div>
      <Title name="The Country Finder" />
      
      <Filter search={filter} handler={handleFilter} />

      <Content countries={countries} filter={filter} click={handleClick} />
      
    </div>
  )
}

export default App
