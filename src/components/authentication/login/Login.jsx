import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import "./login.css"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthContext } from "../../../contexts/auth/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../../contexts/alert/useAlertContext";
import { useState } from "react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useAuthContext();
    const { setAlert } = useAlertContext();
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        // call /login api to retrieve user
        // if user exists
        setUser({id: 1})
        setAlert({ severity: 'success', message: 'Login Successfully!'})
        navigate('/', { replace: true })
    }
        
    return (
        <div className="login">
            <span>
                <h3>Sign In</h3>
            </span>
            <form action="" onSubmit={e => handleLogin(e)}>
                <div className="form">
                    <div className="aa-field">
                        <div className="label">
                            <label htmlFor="username-login">Username</label>
                        </div>
                        <TextField id="username-login" label="Username" variant="outlined" margin="normal" autoComplete="off" required />
                    </div>
                    <div className="aa-field">
                        <div className="label">
                            <label htmlFor="password-login">Password</label>
                        </div>
                        <TextField 
                            id="password-login" 
                            label="Password" 
                            variant="outlined"
                            margin="normal" 
                            type={showPassword ? "text" : "password"}
                            slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                        </InputAdornment>
                                }
                            }}
                            autoComplete="off" 
                            required 
                        />
                    </div>
                    <div className="submit-button">
                        <Button variant="contained" type="submit">Log In</Button>
                    </div>
                </div>
            </form>
        </div>);
}

export default Login;