import './Login.css';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const Login = () => {
    return (
        <div className="centerContainer">
            <div id="loginBox">
                <h1>Chatterbox</h1>
                <form id="loginForm">
                    <Box mb={2}> 
                        <TextField fullWidth id="filled-basic" label="Email" variant="filled" /> 
                    </Box>
                    <Box mb={4} > 
                        <TextField fullWidth id="filled-basic" label="Password" variant="filled" type="password" /> 
                    </Box>
                    <Button variant="contained" className="loginButton">Login</Button>
                </form>
            </div>
        </div>
    );
};

export default Login;