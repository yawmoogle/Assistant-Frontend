
import "./authentication-page.css"
import Login from "./login/Login";
import Register from "./register/Register";

const AuthenticationPage = () => {
    return (
    <div className="authentication-page">
        <Register />
        <div className="divider"></div>
        <Login />
        
    </div>
    );
}
 
export default AuthenticationPage;