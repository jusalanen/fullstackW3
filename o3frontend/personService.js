import axios from 'axios'

const baseUrl = '/api/persons/'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const deletePerson = (personId) => {
    const id = String(personId)
    const strDel = baseUrl.concat("", id)
    return axios.delete(strDel)
}

const update = (id, newObject) => {
    const strPut = baseUrl.concat("", String(id))
    return axios.put(strPut, newObject)
}

export default { getAll, create, deletePerson, update }