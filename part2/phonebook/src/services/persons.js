import axios from 'axios'

const baseUrl = 'https://ideal-meme-wrgp9g99pj73wr9-3001.app.github.dev/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson)
}
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}
const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson)
}

export default {
  getAll,
  create,
  remove,
  update
}