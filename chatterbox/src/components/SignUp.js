import { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const signUpButtonHandler = () => {
        console.log(`Email: ${email}, Username: ${username}, Password: ${password}, Confirm Password: ${confirmPassword}`);
    };

    return (
        <div className="centerContainer">
            <div className="formBox">
                <h1>Chatterbox</h1>
                <Box mt={-5}> <h3>Create New User</h3> </Box>
                <form className="formPadding">
                    <Box mb={2}> 
                        <TextField fullWidth label="Email" variant="filled" value={email} 
                                   onChange={(e) => setEmail(e.target.value)} /> 
                    </Box>
                    <Box mb={2}> 
                        <TextField fullWidth label="Username" variant="filled" value={username}
                                   onChange={(e) => setUsername(e.target.value)} /> 
                    </Box>
                    <Box mb={2}>
                        <TextField fullWidth label="Password" variant="filled" type="password" 
                                   value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Box>
                    <Box mb={4}>
                        <TextField fullWidth label="Confirm Password" variant="filled" type="password" 
                                   value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Box>
                    <Box mb={3}> 
                        <Button variant="contained" className="loginButton" onClick={signUpButtonHandler}>
                            Sign Up
                        </Button> 
                    </Box>
                </form>
            </div>
        </div>
    );
};

export default SignUp;