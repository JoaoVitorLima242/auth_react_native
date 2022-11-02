import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLoading from 'expo-app-loading'

import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { Colors } from './src/constants/styles';
import AuthContextProvider, { AuthContext } from './src/contexts/auth';
import IconButton from './src/components/ui/IconButton'

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const { logout } = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({tintColor}) => <IconButton icon='exit' size={24} color={tintColor} onPress={logout}/>
      }}/>
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated } = useContext(AuthContext)
  return (
      <NavigationContainer>
        {
          !isAuthenticated
          ? <AuthStack />
          : <AuthenticatedStack />
        }
      </NavigationContainer>
  );
}

function Root () {
  const [tryLogin, setTryLogin] = useState(true)
  const { authenticate } = useContext(AuthContext)
  useEffect(() => {
    const fetchToken = async () => {
        const storedToken = await AsyncStorage.getItem('token')
  
        if (storedToken) authenticate(storedToken)

        setTryLogin(false)
    }
  
    fetchToken()
  }, [])

  if (tryLogin) return <AppLoading />
  
  return <Navigation />
}

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="light" />
      <Root />
    </AuthContextProvider>
  );
}
