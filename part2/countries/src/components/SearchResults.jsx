import { useState } from "react";
import Button from "./Button";
import CountryStats from "./CountryStats";

const SearchResults = ({ searchResults }) => {
  const [currentView, setCurrentView] = useState("");
  const clickHandler = (country) => {
    // console.log("click");
    setCurrentView(<CountryStats country={country} />);
  };
  return searchResults.length === 0 ? null : searchResults.length === 1 ? (
    <CountryStats country={searchResults[0]} />
  ) : searchResults.length < 10 ? (
    <>
      <ul>
        {searchResults.map((country) => (
          <li key={country.ccn3}>
            {country.name.common}{" "}
            <Button text="Show" onClick={() => clickHandler(country)} />
          </li>
        ))}
      </ul>
      <div>{currentView}</div>
    </>
  ) : (
    <div>Search too broad, try narrowing it down</div>
  );
};

export default SearchResults;
