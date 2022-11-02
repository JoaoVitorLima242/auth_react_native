import { createContext, useState } from 'react'

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    autheticate: (token) => {},
    logout: () => {}
})

const AuthContextProvider = ({children}) => {
    const [authToken, setAuthToken] = useState()

    const autheticate = (token) => {
        setAuthToken(token)
    }

    const logout = () => {
        setAuthToken(null)
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        autheticate,
        logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider