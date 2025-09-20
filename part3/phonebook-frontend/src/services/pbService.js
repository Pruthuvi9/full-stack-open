import axios from "axios";

// const baseUrl = "http://localhost:3001/persons";
const baseUrl = "/api/persons";

const getAll = () => axios.get(baseUrl).then((res) => res.data);

const addPerson = (newPersonObj) =>
  axios.post(baseUrl, newPersonObj).then((res) => res.data);

const deletePerson = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((res) => res.data);

const updatePerson = (person) =>
  axios
    .put(`${baseUrl}/${person.id}`, {
      ...person,
    })
    .then((res) => res.data);

export default { getAll, addPerson, deletePerson, updatePerson };
