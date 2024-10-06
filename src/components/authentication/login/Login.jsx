import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import "./login.css"
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthContext } from "../../../contexts/useAuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useAuthContext();
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleLogin = () => {
        setUser({id: 1})
        navigate('/', { replace: true })
    }
        
    return (
        <div className="login">
            <span>
                <h3>Sign In</h3>
            </span>
            <form action="">
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
                        <Button variant="contained" onClick={handleLogin}>Log In</Button>
                    </div>
                </div>
            </form>
        </div>);
}
 
export default Login;