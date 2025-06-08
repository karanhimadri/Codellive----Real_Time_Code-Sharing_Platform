import { createContext } from "react";
import { useState } from "react";

export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(false);
  const [signupState, setSignupState] = useState(false);
  const [tempUserName, setTempUserName] = useState("")
  const [isTempLoggedIn, setIsTempLoggedIn] = useState(false)

  return (
    <authContext.Provider
      value={{
        tempUserName,
        loginState,
        signupState,
        setLoginState,
        setSignupState,
        setTempUserName,
        isTempLoggedIn,
        setIsTempLoggedIn
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
