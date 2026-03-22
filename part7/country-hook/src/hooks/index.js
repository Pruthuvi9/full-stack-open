import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const fetchCountry = async (name) => {
      if (name) {
        try {
          let response = await axios.get(
            `https://studies.cs.helsinki.fi/restcountries/api/name/${encodeURI(name)}`,
          )

          // console.log(response)
          let countryObj = { ...response, found: true }

          setCountry(countryObj)
        } catch (error) {
          console.log(error)
          setCountry({ found: false })
        }
      } else {
        setCountry(null)
      }
    }

    fetchCountry(name)
  }, [name])

  return country
}
