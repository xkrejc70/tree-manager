import axios from 'axios'

const baseURL = process.env.VUE_APP_API_ENDPOINT

const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const fetchTreeNodes = () => {
    return apiClient.get('/getTree')
    .then((response) => response.data)
    .catch((error) => {
        console.error('Error fetching tree nodes:', error)
        throw error
    })
}

export const addNode = (parentId) => {
    return apiClient.post('/addNode', { parentId })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error adding node:', error)
            throw error
        })
}

export const initTree = () => {
    return apiClient.post('/initTree')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error initializing tree:', error)
        throw error
    })
}