import { useState } from "react";
import AddContact from "./components/AddContact";
import SearchFilter from "./components/SearchFilter";
import Contacts from "./components/Contacts";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState([]);

  const addName = (e) => {
    e.preventDefault();

    let similarNameArr = persons.filter((person) => person.name === newName);

    if (similarNameArr.length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPersonsArr = [...persons, { name: newName, number: newNumber }];
      setPersons(newPersonsArr);
      // console.log("persons:", newPersonsArr);
      setNewName("");
      setNewNumber("");
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    // console.log(typeof searchValue);
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
        addName={addName}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Contacts filtered={filtered} persons={persons} />
    </div>
  );
};

export default App;
