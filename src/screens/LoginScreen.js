import { useState } from 'react';

import LoadingOverlay from '../components/ui/LoadingOverlay'
import AuthContent from '../components/Auth/AuthContent';
import { login } from '../api/auth';
import { Alert } from 'react-native';

function LoginScreen() {
  const [isAuthenticating, setIsAutheticating] = useState()

  const signinHandler = async (data) => {
    try {
      setIsAutheticating(true)
      await login(data)
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
