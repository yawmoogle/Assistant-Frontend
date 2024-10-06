import Alert from '@mui/material/Alert';
import "./authentication-page.css"
import Login from "./login/Login";
import Register from "./register/Register";
import { useAlertContext } from '../../contexts/alert/useAlertContext';
import { useEffect } from 'react';

const AuthenticationPage = () => {
    const { alert, setAlert } = useAlertContext();

    useEffect(() => {
        setTimeout(() => {
            setAlert(null)
        }, 10000);
    }, [setAlert])

    return (
        <div className="authentication-page">
            {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
            <Register />
            <div className="divider"></div>
            <Login />
            
        </div>
    );
}
 
export default AuthenticationPage;