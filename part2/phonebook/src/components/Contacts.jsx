const Contacts = ({ filtered, persons, deletePerson }) => {
  return (
    <ul>
      {filtered.length < 1
        ? persons.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}{" "}
              <button onClick={() => deletePerson(person)}>Delete</button>
            </li>
          ))
        : filtered.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))}
    </ul>
  );
};

export default Contacts;
