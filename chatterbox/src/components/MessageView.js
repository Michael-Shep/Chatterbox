import { useEffect, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';

const MessageView = ({ userCredentials, selectedChatObject }) => {
    const [messages, setMessages] = useState([]);

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
        </div>
    );
};

export default MessageView;