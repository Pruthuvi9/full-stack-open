import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl);

const addPerson = (newPersonObj) =>
  axios.post("http://localhost:3001/persons", newPersonObj);

const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`);

export default { getAll, addPerson, deletePerson };
