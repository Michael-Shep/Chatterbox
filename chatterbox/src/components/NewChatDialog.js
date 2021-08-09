import { useState, useEffect } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import firebase from 'firebase/app';
import 'firebase/auth';

const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const NewChatDialog = ({ dialogOpen, onClose, userCredentials }) => {
    const [recieverEmail, setRecieverEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const userEmail = userCredentials.email;
    const db = firebase.firestore();

    useEffect(() => {
        if (!emailRegex.test(recieverEmail)) {
            setValidEmail(false);
        } else {
            setValidEmail(true);
        }
    }, [recieverEmail]);

    const shouldCreateBeDisabled = () => {
        return !validEmail || recieverEmail.length === 0;
    };

    const getDocumentName = () => {
        if (userEmail < recieverEmail) {
            return userEmail + '£' + recieverEmail;
        } else {
            return recieverEmail + '£' + userEmail;
        }
    }

    const createChat = () => {
        firebase.auth().fetchSignInMethodsForEmail(recieverEmail)
            .then((signInMethods) => {
                if(signInMethods.length === 0) {
                    setErrorMessage('User Not Found');
                }
                else {
                    setErrorMessage('');
                    let newDocName = getDocumentName();
                    db.collection('chats').doc(newDocName).get().then((doc) => {
                        if (doc.exists) {
                            setErrorMessage('Chat already exists!');
                        } else {
                            db.collection('chats').doc(newDocName).set({
                                participants: [userEmail, recieverEmail]
                            })
                            .then(() => {
                                onClose();
                            })
                            .catch((error) => {
                                setErrorMessage(error);
                            })
                        }
                    })
                    .catch((error) => {
                        setErrorMessage(error);
                    });
                }
            })
            .catch((error) => {
                setErrorMessage(error);
            });
    }

    return (
        <Dialog open={dialogOpen} onClose={onClose}>
            <Box display="flex" justifyContent="center"><DialogTitle>Setup New Chat</DialogTitle></Box>
            <Box p={2} pt={0}>
                { errorMessage !== '' &&
                    <Box display="flex" justifyContent="center" mb={2}>
                        <div className="errorText">{errorMessage}</div>
                    </Box>
                }
                <TextField label="Enter Recievers Email" fullWidth className="dialogMargin" 
                           value={recieverEmail} onChange={(e) => setRecieverEmail(e.target.value)}/>
                <Box p={2} display="flex" justifyContent="center">
                    <Button variant="contained" color="primary" 
                            disabled={shouldCreateBeDisabled()} onClick={createChat}>
                        Create Chat
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default NewChatDialog;