import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

let loginButtonPressed = false;

const Login = ({ userCredentials, setUserCredentials }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    const userCreated = new URLSearchParams(useLocation().search).get('userCreated');
    const history = useHistory();

    useEffect(() => {
        if (loginButtonPressed) {
            history.push('/home');
            loginButtonPressed = false;
        }
    }, [userCredentials, history]);

    useEffect(() => {
        setUserCredentials({});
        firebase.auth().signOut().catch((error) => {
            console.log('An Error Occurred when signing out the current user');
        });
    }, [setUserCredentials]);

    const loginButtonHandler = () => {
        loginButtonPressed = true;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(() => {
            setErrorText('Login Failed');
        });
    };

    return (
        <div className="centerContainer">
            <div className="formBox">
                <h1>Chatterbox</h1>
                { userCreated === 'true' &&
                    <Box mt={-3}>
                        <p className="successText"> User Successfully Created </p>
                    </Box>
                }
                { errorText !== '' &&
                    <Box mt={-5}>
                        <p className="errorText">{errorText}</p>
                    </Box>
                }
                <form className="formPadding">
                    <Box mb={2}> 
                        <TextField fullWidth label="Email" variant="filled" 
                                   value={email} onChange={(e) => setEmail(e.target.value)} /> 
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