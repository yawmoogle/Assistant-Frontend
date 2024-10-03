import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import "./register.css"
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }
    
    return (
        <div className="register-card">
            <span>
                <h3>Register an Account</h3>
            </span>
            <form action="">
                <div className="form">

                    <div className="aa-field">
                        <div className="label">
                            <label htmlFor="first-name">First Name</label>
                        </div>
                        <TextField id="first-name" label="First Name" variant="outlined" margin="normal" autoComplete="off" required />
                    </div>
                    <div className="aa-field">
                        <div className="label">
                            <label htmlFor="last-name">Last Name</label>
                        </div>
                        <TextField id="last-name" label="Last Name" variant="outlined" margin="normal" autoComplete="off" required />
                    </div>
                    <div className="aa-field">
                        <div className="label">
                            <label htmlFor="email">Email</label>
                        </div>
                        <TextField id="email" label="Email" variant="outlined" margin="normal" type="email" autoComplete="off" required />
                    </div>
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
                    <div className="aa-field">
                        <div className="label">
                            <label htmlFor="confirm-password">Confirm Password</label>
                        </div>
                        <TextField 
                            id="confirm-password" 
                            label="Confirm Password" 
                            variant="outlined"
                            margin="normal" 
                            type={showConfirmPassword ? "text" : "password"}
                            slotProps={{
                                input: {
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                        </InputAdornment>
                                }
                            }}
                            autoComplete="off" 
                            required 
                        />
                    </div>
                    <div className="submit-button">
                        <Button variant="contained">Register</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
 
export default Register;