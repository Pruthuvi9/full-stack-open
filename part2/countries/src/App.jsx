import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [allCountries, setAllCountries] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => setAllCountries(res.data));
  }, []);

  const searchForCountry = (e) => {
    const value = e.target.value;
    let results = allCountries.filter(
      (country) =>
        country.name.common.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    setSearchResults(results);
    // console.log("search results:", results);
  };

  return (
    <div>
      <form>
        {allCountries ? (
          <div>
            find countries <input onChange={searchForCountry} />
          </div>
        ) : (
          <div>loading...</div>
        )}
      </form>
      {searchResults.length === 0 ? null : searchResults.length === 1 ? (
        <div>
          <h2>{searchResults[0].name.common}</h2>
          <div>
            <p>Official name: {searchResults[0].name.official}</p>
            <p>Capital: {searchResults[0].capital}</p>
            <p>Area: {searchResults[0].area}</p>
          </div>
          <h3>Languages</h3>
          <ul>
            {Object.entries(searchResults[0].languages).map((lan) => (
              <li key={lan[0]}>{lan[1]}</li>
            ))}
          </ul>
          <div>
            <h3>Flag</h3>
            <img
              src={searchResults[0].flags.svg}
              style={{ maxWidth: "500px", width: "100%" }}
            />
          </div>
        </div>
      ) : searchResults.length < 10 ? (
        <ul>
          {searchResults.map((country) => (
            <li key={country.ccn3}>{country.name.common}</li>
          ))}
        </ul>
      ) : (
        <div>Search too broad, try narrowing it down</div>
      )}
    </div>
  );
}

export default App;
