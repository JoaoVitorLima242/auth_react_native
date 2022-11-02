import { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) => {},
    logout: () => {}
})

const AuthContextProvider = ({children}) => {
    const [authToken, setAuthToken] = useState(null)

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem('token')

            if (storedToken) setAuthToken(storedToken)
        }

        fetchToken()
    }, [])

    const authenticate = (token) => {
        AsyncStorage.setItem('token', token)
        setAuthToken(token)
    }

    const logout = () => {
        AsyncStorage.removeItem('token')
        setAuthToken(null)
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate,
        logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider