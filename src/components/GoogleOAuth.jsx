import { jwtDecode } from 'jwt-decode';
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setAuthUserDetails } from '../ReduxStore/authSlice';
import { GoogleLogin } from '@react-oauth/google';
import { authContext } from '../context/AuthContextProvider';

const GoogleOAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setSignupState, setLoginState } = useContext(authContext);

  const login = (credentialResponse) => {
    if (!credentialResponse || !credentialResponse.credential) {
      toast.error("Login failed. Invalid credentials.");
      return;
    }

    try {
      const decoded = jwtDecode(credentialResponse.credential);
      dispatch(
        setAuthUserDetails({
          user_id: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          email_verified: decoded.email_verified,
          profile_picture: decoded.picture,
          given_name: decoded.given_name,
        })
      );

      setLoginState(false)
      setSignupState(false)
    } catch (error) {
      toast.error("Error decoding token.");
    }
  };

  const loginError = () => {
    toast.error("Login failed.");
  };

  return (
    <div>
      <GoogleLogin onSuccess={login} onError={loginError} />
      <div className='flex flex-col items-center justify-center'>
        <p className='my-3 font-medium text-gray-500'>OR</p>
      </div>
    </div>
  );
}

export default GoogleOAuth