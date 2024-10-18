import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import "./register.css"
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAlertContext } from "../../../contexts/alert/useAlertContext";

const Register = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    const { setAlert } = useAlertContext();
    
    const handlePasswordMaskOnClick = () => {
        setShowPassword(!showPassword)
    }

    const handleConfirmPasswordMaskOnClick = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleConfirmPasswordOnChange = (e) => {
        setConfirmPassword(e.target.value)
        if (isPasswordValid(e.target.value)) {
            setConfirmPasswordError(false)
        } else {
            setConfirmPasswordError(true)
        }
    }

    const isPasswordValid = (confirmPassword) => {
        return password === confirmPassword;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        // const registerInfo = { firstName, lastName, email, username, password }
        // call /register api to persist data
        setAlert({ severity: 'success', message: 'Registered Successfully!'})
        setTimeout(() => {
            setAlert(null);
        }, 10000);
    }
    
    return (
        <div className="register-card">
            <span>
                <h3>Register an Account</h3>
            </span>
            <form action="" onSubmit={e => handleRegister(e)}>
                <div className="form">

                    <div className="aa-field">
                        <div className="label">
                            <label htmlFor="first-name">First Name</label>
                        </div>
                        <TextField id="first-name" label="First Name" variant="outlined" margin="normal" autoComplete="off" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </div>
                    <div className="aa-field">
                        <div className="label">
                            <label htmlFor="last-name">Last Name</label>
                        </div>
                        <TextField id="last-name" label="Last Name" variant="outlined" margin="normal" autoComplete="off" required value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>
                    <div className="aa-field">
                        <div className="label">
                            <label htmlFor="email">Email</label>
                        </div>
                        <TextField id="email" label="Email" variant="outlined" margin="normal" type="email" autoComplete="off" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="aa-field">
                        <div className="label">
                            <label htmlFor="username">Username</label>
                        </div>
                        <TextField id="username" label="Username" variant="outlined" margin="normal" autoComplete="off" required value={username} onChange={e => setUsername(e.target.value)} />
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
                                            onClick={handlePasswordMaskOnClick}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                        </InputAdornment>
                                }
                            }}
                            autoComplete="off" 
                            required 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
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
                                            onClick={handleConfirmPasswordMaskOnClick}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                        </InputAdornment>
                                }
                            }}
                            autoComplete="off" 
                            required
                            value={confirmPassword}
                            onChange={(e) => handleConfirmPasswordOnChange(e)}
                            error={confirmPasswordError}
                            helperText={confirmPasswordError ? 'Passwords do not match.': ''}
                        />
                    </div>
                    <div className="submit-button">
                        <Button variant="contained" type="submit">Register</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
 
export default Register;