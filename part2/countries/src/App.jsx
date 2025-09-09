import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./components/Form";
import SearchResults from "./components/SearchResults";

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
      {allCountries ? (
        <Form handleInput={searchForCountry} />
      ) : (
        <div>loading...</div>
      )}
      <SearchResults searchResults={searchResults} />
    </div>
  );
}

export default App;
