import { Button, TextField } from "@mui/material";
import "./register.css"
import '@fontsource/roboto/700.css';

const Register = () => {
    return (
    <div className="register">
        <div className="register-card">
            <span>
                <h3>Register an account</h3>
            </span>
            <form action="">
                <div className="aa-field">
                    <div className="label">
                        <label htmlFor="first-name">First Name</label>
                    </div>
                    <TextField id="first-name" label="First Name" variant="outlined" margin="normal" required />
                </div>
                <div className="aa-field">
                    <div className="label">
                        <label htmlFor="last-name">Last Name</label>
                    </div>
                    <TextField id="last-name" label="Last Name" variant="outlined" margin="normal" required />
                </div>
                <div className="aa-field">
                    <div className="label">
                        <label htmlFor="email">Email</label>
                    </div>
                    <TextField id="email" label="Email" variant="outlined" margin="normal" required />
                </div>
                <div className="aa-field">
                    <div className="label">
                        <label htmlFor="password">Password</label>
                    </div>
                    <TextField id="password" label="Password" variant="outlined" margin="normal" required />
                </div>
                <div className="aa-field">
                    <div className="label">
                        <label htmlFor="confirm-password">Confirm Password</label>
                    </div>
                    <TextField id="confirm-password" label="Password" variant="outlined" margin="normal" required />
                </div>
                <div className="submit-button">
                    <Button variant="contained">Register</Button>
                </div>
            </form>
        </div>
    </div>
    );
}
 
export default Register;