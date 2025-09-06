import { useEffect, useState } from "react";
import axios from "axios";
import AddContact from "./components/AddContact";
import SearchFilter from "./components/SearchFilter";
import Contacts from "./components/Contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

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
