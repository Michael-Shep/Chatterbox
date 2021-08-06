import { useEffect } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';

const MessageView = ({ userCredentials, selectedChatObject }) => {
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
                    querySnapshot.forEach(doc => {
                        console.log(doc.data());
                    })
                });
        }
    }, [db, selectedChatObject]);

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
                </div>
            }
        </div>
    );
};

export default MessageView;