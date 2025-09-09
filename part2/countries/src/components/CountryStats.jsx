import Weather from "./Weather";

const CountryStats = ({ country }) => {
  // console.log("country:", country);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        <p>Official name: {country.name.official}</p>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
      </div>
      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map((lan) => (
          <li key={lan[0]}>{lan[1]}</li>
        ))}
      </ul>
      <div>
        <h3>Flag</h3>
        <img
          src={country.flags.svg}
          style={{ maxWidth: "500px", width: "100%" }}
        />
      </div>
      <Weather country={country} />
    </div>
  );
};

export default CountryStats;
