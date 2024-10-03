import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import "./login.css"
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
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
                            <label htmlFor="username">Username</label>
                        </div>
                        <TextField id="username" label="Username" variant="outlined" margin="normal" autoComplete="off" required />
                    </div>
                    <div className="aa-field">
                        <div className="label">
                            <label htmlFor="password">Password</label>
                        </div>
                        <TextField 
                            id="password" 
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
                        <Button variant="contained">Log In</Button>
                    </div>
                </div>
            </form>
        </div>);
}
 
export default Login;