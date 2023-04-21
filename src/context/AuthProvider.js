import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  console.log("CONTEXT: " + JSON.stringify(auth));
  console.log("CONTEXT2: " + JSON.stringify(auth.user));

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
