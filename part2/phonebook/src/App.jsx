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
    pbService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    let similarNameArr = persons.filter((person) => person.name === newName);

    if (similarNameArr.length > 0) {
      const personToUpdate = {
        ...similarNameArr[0],
        name: newName,
        number: newNumber,
      };
      let confirmationMessage = `${newName} is already added to phonebook, replace the old number with a new one?`;

      if (window.confirm(confirmationMessage)) {
        pbService
          .updatePerson(personToUpdate)
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.name === newName ? returnedPerson : person
              )
            )
          );
        setNewName("");
        setNewNumber("");
      }
    } else {
      const newPersonObj = { name: newName, number: newNumber };
      pbService
        .addPerson(newPersonObj)
        .then((returnedPerson) => setPersons([...persons, returnedPerson]));
      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = (p) => {
    if (window.confirm(`Delete ${p.name}?`)) {
      pbService
        .deletePerson(p.id)
        .then((deletedPerson) => console.log("deleted", deletedPerson));
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
