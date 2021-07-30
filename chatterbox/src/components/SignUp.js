import { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import { InputAdornment } from '@material-ui/core';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const signUpButtonHandler = () => {
        console.log(`Email: ${email}, Username: ${username}, Password: ${password}, Confirm Password: ${confirmPassword}`);
    };

    const emailValidiationHandler = () => {
        return true;
    };

    const usernameValidationHandler = () => {
        return true;
    };

    const passwordValidationHandler = () => {
        return true;
    };

    const confirmPasswordValidationHandler = () => {
        return true;
    };

    const createFormElement = (labelString, value, setterFunction, tooltipString, validationFunction, errorString) => {
        let validInput = validationFunction();
        let helperText = validInput ? '' : errorString;
        return (
            <Box mb={2}>
                <TextField fullWidth label={labelString} variant="filled" value={value}
                           onChange={(e) => setterFunction(e.target.value)} error={!validInput} helperText={helperText}
                           InputProps={{endAdornment: (
                               <Tooltip className="inputToolTip" title={tooltipString} placement="top" arrow>
                                   <InputAdornment position="end">
                                       <InfoIcon color="primary" edge="end" />
                                   </InputAdornment>
                               </Tooltip>
                           )}}
                           FormHelperTextProps={{className: 'helperTextColor'}} 
                />
            </Box>
        );
    };

    return (
        <div className="centerContainer">
            <div className="formBox">
                <h1>Chatterbox</h1>
                <Box mt={-5}> <h3>Create New User</h3> </Box>
                <form className="formPadding">
                    {createFormElement('Email', email, setEmail, 'Must be standard email format e.g. example@example.com',
                                        emailValidiationHandler, 'Input must be a valid email')}
                    {createFormElement('Username', username, setUsername, 'Can contain letters, numbers and underscores',
                                        usernameValidationHandler, 'Must only contain letters, numbers and underscores')}
                    {createFormElement('Password', password, setPassword, 'At least 8 characters and contain at least 1 letter and digit',
                                        passwordValidationHandler, 'Must contain at least 8 characters, 1 digit and 1 letter')}
                    {createFormElement('Confirm Password', confirmPassword, setConfirmPassword, 'Passwords must match',
                                        confirmPasswordValidationHandler, 'Passwords must match')}
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