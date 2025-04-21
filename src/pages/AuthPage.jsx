import React, { useContext } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'
import { authContext } from '../context/AuthContextProvider'

const AuthPage = () => {
  const { signupState, loginState } = useContext(authContext)
  return (
    <div>
      {signupState && <Signup />}
      {loginState && <Login />}
    </div>
  )
}

export default AuthPage