import { useState, useContext } from 'react';

import LoadingOverlay from '../components/ui/LoadingOverlay'
import AuthContent from '../components/Auth/AuthContent';
import { login } from '../api/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../contexts/auth';

function LoginScreen() {
  const [isAuthenticating, setIsAutheticating] = useState()

  const { authenticate } = useContext(AuthContext)


  const signinHandler = async (data) => {
    try {
      setIsAutheticating(true)
      const token = await login(data)
      authenticate(token)
      setIsAutheticating(false)
    } catch (err) {
      setIsAutheticating(false)
      Alert.alert('Authentication failed!', 'Could not log you in. Try again later.')
    }
  }

  if (isAuthenticating) return <LoadingOverlay message='Loging user...'/>

  return <AuthContent isLogin onAuthenticate={signinHandler} />;
}

export default LoginScreen;
