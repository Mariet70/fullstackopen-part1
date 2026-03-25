import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const filtered = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div>
        find countries{' '}
        <input value={search} onChange={handleSearchChange} />
      </div>

      {filtered.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {filtered.length <= 10 && filtered.length > 1 && (
        <div>
          {filtered.map(country => (
            <p key={country.name.common}>
              {country.name.common}{' '}
              <button onClick={() => setSearch(country.name.common)}>
                show
              </button>
            </p>
          ))}
        </div>
      )}

      {filtered.length === 1 && (
        <div>
          <h1>{filtered[0].name.common}</h1>

          <p>Capital {filtered[0].capital?.[0]}</p>
          <p>Area {filtered[0].area}</p>

          <h2>Languages</h2>
          <ul>
            {filtered[0].languages &&
              Object.values(filtered[0].languages).map(lang => (
                <li key={lang}>{lang}</li>
              ))}
          </ul>

          <img
            src={filtered[0].flags?.png}
            alt="flag"
            width="200"
          />
        </div>
      )}
    </div>
  )
}

export default App