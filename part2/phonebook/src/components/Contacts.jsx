const Contacts = ({ filtered, persons }) => {
  return (
    <ul>
      {filtered.length < 1
        ? persons.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
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

