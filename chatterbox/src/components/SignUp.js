import { useState, useEffect } from 'react';
import "firebase/auth";

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import { InputAdornment } from '@material-ui/core';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validConfirmPassword, setValidConfirmPassword] = useState(true);

    const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const passwordRegex = new RegExp(/^(?=[a-zA-Z_]*\d)(?=[0-9_]*[a-zA-Z])[a-zA-Z0-9_]{8,}$/);

    const performValidationWithRegex = (regex, testStr, isValidFunction) => {
        if (!regex.test(testStr)) {
            isValidFunction(false);
        }
        else {
            isValidFunction(true);
        }
    };

    useEffect(() => {
        if (email.length > 0) {
            performValidationWithRegex(emailRegex, email, setValidEmail);
        }
    }, [email]);

    useEffect(() => {
        if (password.length > 0) {
            performValidationWithRegex(passwordRegex, password, setValidPassword);
        }
    }, [password]);

    useEffect(() => {
        if (confirmPassword === password || confirmPassword.length === 0) {
            setValidConfirmPassword(true);
        } 
        else {
            setValidConfirmPassword(false);
        }
    }, [confirmPassword]);

    const signUpButtonHandler = () => {
        console.log(`Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}`);
    };

    const shouldSubmitBeDisabled = () => {
        return !validEmail || email.length === 0 || !validPassword || password.length === 0 || 
                            !validConfirmPassword || validConfirmPassword.length === 0;
    };

    const createFormElement = (labelString, value, setterFunction, tooltipString, validInput, errorString, inputType='text') => {
        let helperText = validInput ? '' : errorString;
        return (
            <Box mb={2}>
                <TextField fullWidth label={labelString} variant="filled" value={value}
                           onChange={(e) => { setterFunction(e.target.value); }} 
                           error={!validInput} helperText={helperText} type={inputType}
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
                                        validEmail, 'Input must be a valid email')}
                    {createFormElement('Password', password, setPassword, 'At least 8 characters and contain at least 1 letter and digit',
                                        validPassword, 'At least 8 characters, 1 digit and 1 letter', 'password')}
                    {createFormElement('Confirm Password', confirmPassword, setConfirmPassword, 'Passwords must match',
                                        validConfirmPassword,'Passwords must match', 'password')}
                    <Box mb={3}> 
                        <Button variant="contained" className="loginButton" onClick={signUpButtonHandler}
                                disabled={shouldSubmitBeDisabled()}>
                            Sign Up
                        </Button> 
                    </Box>
                </form>
            </div>
        </div>
    );
};

export default SignUp;