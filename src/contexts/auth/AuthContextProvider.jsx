import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const AuthContext = createContext({
    user: null, 
    setUser: () => {}, 
  });

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const value = { user, setUser };

    return (<AuthContext.Provider value={value}>{ children }</AuthContext.Provider>);
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}
 
export default AuthContextProvider;