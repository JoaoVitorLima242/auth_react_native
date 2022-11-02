import axios from "axios"

const APP_KEY = 'AIzaSyA3SxUlwDy8Z2A0SMIW3CWtoC1538EU03U'

export const createUser = async ({email, password}) => {
    console.log(email, password)
    const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=` + APP_KEY,
        {
            email,
            password,
            returnSecureToken: true
        }
    )

    return response
}