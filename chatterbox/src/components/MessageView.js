import { useEffect, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';

import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const MessageView = ({ userCredentials, selectedChatObject }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const db = firebase.firestore();
    const userEmail = userCredentials.email;

    const getMessageReciever = () => {
        if (selectedChatObject.participants[0] === userEmail) {
            return selectedChatObject.participants[1];
        } else {
            return selectedChatObject.participants[0];
        }
    }

    useEffect(() => {
        if (Object.keys(selectedChatObject).length !== 0) {
            db.collection('chats').doc(selectedChatObject.id).collection('messages').get()
                .then((querySnapshot) => {
                    let messageData = [];
                    querySnapshot.forEach(doc => {
                        messageData.push(doc.data());
                    });
                    setMessages(messageData);
                });
        }
    }, [db, selectedChatObject]);

    const getMessageAlignmentClass = (message, forContainer) => {
        if (message.from === userEmail) {
            if (forContainer) return 'rightAlignedContainer';
            else return 'rightAlignedBubble';
        } else {
            if (forContainer) return 'leftAlignedContainer';
            else return 'leftAlignedBubble';
        }
    };

    const sendMessage = () => {
        if (newMessage.length > 0) {
            db.collection('chats').doc(selectedChatObject.id).collection('messages').doc().set({
                content: newMessage,
                from: userEmail
            })
            .then(() => {
                setNewMessage('');
            })
            .catch((error) => {
                console.log('Error occurred when sending message');
                console.log(error);
            })
        }
    };

    const handleTyping = (event) => {
        if (event.nativeEvent.inputType === 'insertText' ||
            event.nativeEvent.inputType === 'deleteContentBackward') {
            setNewMessage(event.target.value);
        }
        else if (event.nativeEvent.inputType === 'insertLineBreak') {
            sendMessage();
        }
    }

    return (
        <div className="halfScreenContainer messageView">
            { Object.keys(selectedChatObject).length === 0 &&
                <div className="paddedObject centerText">
                    <h4>No Chat currently selected</h4>
                    <span>Select one of the chats to view messages here</span>
                </div>
            }
            { Object.keys(selectedChatObject).length !== 0 &&
                <div className="paddedObject">
                    <h2 className="centerText"> {getMessageReciever(selectedChatObject)} </h2>
                    {
                        messages.map((message, index) => (
                            <div key={index} className={`${getMessageAlignmentClass(message, true)}`}>
                                <div className={`messageBubble ${getMessageAlignmentClass(message, false)}`}>{message.content}</div>
                            </div>
                        ))
                    }

                </div>
            }
            { Object.keys(selectedChatObject).length !== 0 &&
                <div className="paddedObject">
                    <TextField label="New Message" variant="filled" multiline fullWidth value={newMessage}  
                               onChange = {handleTyping}
                               InputProps={{
                                   endAdornment: <InputAdornment position="end">
                                        <SendIcon color="primary" className="sendButton" 
                                                  onClick={() => sendMessage()} />
                                   </InputAdornment>
                               }} />
                </div>
            }
        </div>
    );
};

export default MessageView;