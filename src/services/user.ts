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

const loginUser = async (user: { [key: string | number]: any }) => {
    try {
        const res = await axios.post(`${API_URL}/api/user`, user)
        const finalUser = res.data
        localStorage.setItem('user', JSON.stringify({
            ...finalUser,
            app: 'easy-notes',
            login: new Date()
        }))
        if (finalUser.defaultLedger !== null) localStorage.setItem('ledger', finalUser.defaultLedger)
        return finalUser
    } catch (error) { console.log(error) }
}

const registerUser = async (data: { [key: string | number]: any }) => {
    try {
        const newUser = await axios.post(`${API_URL}/api/user/create`, data)
        return newUser
    } catch (err) { console.log(err) }
}

const updateUser = async (data: { [key: string | number]: any }) => {
    try {
        const user = await axios.post(`${API_URL}/api/user/update`, data, getConfig())
        const localUser = JSON.parse(localStorage.getItem('user') || '{}')
        localStorage.setItem('user', JSON.stringify({
            ...localUser,
            ...user.data
        }))
        return user.data
    } catch (err) { console.log(err) }
}

export {
    loginUser,
    registerUser,
    updateUser
}