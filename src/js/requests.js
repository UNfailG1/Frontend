import axios from 'axios'

// const BASE_URL = 'https://spairing-api.herokuapp.com'
const BASE_URL = 'http://localhost:3001'

const POST = (url, data) => {
  return axios({
    url,
    method: 'post',
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

const GET = (url, params = {}) => {
  return axios({
    url,
    method: 'get',
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

const POST_AUTH = (url, data) => {
  return axios({
    url,
    method: 'post',
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('spToken')}`
    },
    data
  })
}

const GET_AUTH = (url, params = {}) => {
  return axios({
    url,
    method: 'get',
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('spToken')}`
    },
    params
  })
}

const PATCH = (url, data) => {
  return axios({
    url,
    method: 'patch',
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('spToken')}`
    },
    data
  })
}

const FPATCH = (url, data) => {
  return axios({
    url,
    method: 'patch',
    baseURL: BASE_URL,
    data
  })
}

export { POST, GET, POST_AUTH, GET_AUTH, PATCH, FPATCH, BASE_URL }
