import { createContext } from "react";
import React, { useState } from "react";

export const authContext = createContext();


const AuthContextProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(false);
  const [signupState, setSignupState] = useState(false);

  return (
    <authContext.Provider
      value={{
        loginState,
        signupState,
        setLoginState,
        setSignupState,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;

