import axios from "axios"

const APP_KEY = 'AIzaSyA3SxUlwDy8Z2A0SMIW3CWtoC1538EU03U'

const authenticate = async (mode, email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${APP_KEY}`

    const response = await axios.post(url, {
        email,
        password,
        returnSecureToken: true
    })

    console.log(response.data)
}

export const createUser = async ({email, password}) => {
    await authenticate('signUp', email, password)
}

export const login = async ({email, password}) => {
    await authenticate('signInWithPassword', email, password)
}