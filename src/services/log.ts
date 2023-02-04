import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_API_URL

const getHeaders = () => {
    const { token }: { [key: string | number]: any } = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
    return { authorization: `Bearer ${token}` }
}
const getConfig = () => {
    const { token }: { [key: string | number]: any } = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
    return { headers: { authorization: `Bearer ${token}` } }
}

const getAllLogs = async () => {
    try {
        const logs = await axios.get(`${API_URL}/api/log/getAll`, { headers: getHeaders() })
        return logs.data
    } catch (err) { console.log(err) }
}

const createLog = async (data: { [key: string | number]: any }) => {
    try {
        const log = await axios.post(`${API_URL}/api/log/create`, data, getConfig())
        return log.data
    } catch (err) { console.log(err) }
}

const updateLog = async (data: { [key: string | number]: any }) => {
    try {
        const log = await axios.post(`${API_URL}/api/log/update`, data, getConfig())
        return log.data
    } catch (err) { console.log(err) }
}

const deleteLog = async (data: { [key: string | number]: any }) => {
    try {
        const deleted = await axios.post(`${API_URL}/api/log/remove`, data, getConfig())
        return deleted.data
    } catch (err) { console.log(err) }
}

export {
    getAllLogs,
    createLog,
    updateLog,
    deleteLog
}