import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const AlertContext = createContext();

const AlertContextProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);
    return ( 
        <AlertContext.Provider value={{alert, setAlert}}>
            { children }
        </AlertContext.Provider>
     );
}

AlertContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}
 
export default AlertContextProvider;