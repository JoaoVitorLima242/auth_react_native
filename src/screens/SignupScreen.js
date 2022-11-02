import { useState, useContext } from 'react';

import { createUser } from '../api/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay'
import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../contexts/auth';

function SignupScreen() {
  const [isAuthenticating, setIsAutheticating] = useState()
  
  const { authenticate } = useContext(AuthContext)

  const signupHandler = async (data) => {
    try {
      setIsAutheticating(true)
      const token = await createUser(data)
      authenticate(token)
      setIsAutheticating(false)
    } catch (err) {
      setIsAutheticating(false)
      console.log(err)
      Alert.alert('Authentication failed!', 'Could not create user. Try again later.')
    }
  }

  if (isAuthenticating) return <LoadingOverlay message='Creating user...'/>

  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;
