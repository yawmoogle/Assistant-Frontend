import { useEffect } from "react";
import { useAuthContext } from "../contexts/auth/useAuthContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useAuthContext()

    useEffect(() => {
        if (!user) {
            navigate("/register", { replace: true })
        }

    }, [user, navigate])
    return (<>{ children }</>);
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
}
 
export default ProtectedRoute;