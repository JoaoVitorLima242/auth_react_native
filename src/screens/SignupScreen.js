import { useState } from 'react';

import { createUser } from '../api/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay'
import AuthContent from '../components/Auth/AuthContent';

function SignupScreen() {
  const [isAuthenticating, setIsAutheticating] = useState()

  const signupHandler = async (data) => {
    try {
      setIsAutheticating(true)
      await createUser(data)
      setIsAutheticating(false)
    } catch (err) {
      setIsAutheticating(false)
      console.log(err.message)
    }
  }

  if (isAuthenticating) return <LoadingOverlay message='Creating user...'/>

  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;
