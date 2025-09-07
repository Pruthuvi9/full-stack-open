import { useEffect, useState } from "react";
import pbService from "./services/pbService";
import AddContact from "./components/AddContact";
import SearchFilter from "./components/SearchFilter";
import Contacts from "./components/Contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    pbService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    let similarNameArr = persons.filter((person) => person.name === newName);

    if (similarNameArr.length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPersonObj = { name: newName, number: newNumber };
      pbService
        .addPerson(newPersonObj)
        .then((res) => setPersons([...persons, res.data]));

      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = (p) => {
    if (window.confirm(`Delete ${p.name}?`)) {
      pbService
        .deletePerson(p.id)
        .then((res) => console.log("deleted", res.data));
      setPersons(persons.filter((person) => person.id !== p.id));
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;

    setFiltered(
      persons.filter(
        (person) =>
          person.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      )
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter handleSearch={handleSearch} />
      <h2>Add a contact</h2>
      <AddContact
        addName={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Contacts
        filtered={filtered}
        persons={persons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
