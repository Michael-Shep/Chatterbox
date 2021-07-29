import { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginButtonHandler = () => {
        console.log(`Username: ${username}, Password: ${password}`);
    };

    return (
        <div className="centerContainer">
            <div className="formBox">
                <h1>Chatterbox</h1>
                <form className="formPadding">
                    <Box mb={2}> 
                        <TextField fullWidth label="Email" variant="filled" 
                                   value={username} onChange={(e) => setUsername(e.target.value)} /> 
                    </Box>
                    <Box mb={4} > 
                        <TextField fullWidth label="Password" variant="filled" type="password" 
                                   value={password} onChange={(e) => setPassword(e.target.value)} /> 
                    </Box>
                    <Box mb={2}> 
                        <Button variant="contained" className="loginButton" onClick={loginButtonHandler}>Login</Button> 
                    </Box>
                    <Box mb={3}> 
                        <Button color="primary" className="loginButton" href="/signup">Click here to Sign Up</Button> 
                    </Box>
                </form>
            </div>
        </div>
    );
};

export default Login;