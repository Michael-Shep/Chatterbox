import { useState, useEffect } from "react";

import firebase from 'firebase/app';
import 'firebase/firestore';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const ChatsList = ({ userCredentials, selectedChatObject, setSelectedChatObject }) => {
    const db = firebase.firestore();
    const [chats, setChats] = useState([]);
    const userEmail = userCredentials.email;

    useEffect(() => {
        db.collection("chats").where('participants', 'array-contains', userEmail).get()
        .then((querySnapshot) => {
            let documents = [];
            querySnapshot.forEach((doc) => {
                let documentObject = doc.data();
                documentObject.id = doc.id;
                documents.push(documentObject);
            });
            setChats(documents);
        })
        .catch((error) => {
            console.log('Chat data could not be fetched');
            console.log(error);
        });
    }, [db, userEmail]);

    const getMessageReciever = (chatObject) => {
        if (chatObject.participants[0] === userEmail) {
            return chatObject.participants[1];
        } else {
            return chatObject.participants[0];
        }
    }

    return (
        <div className="halfScreenContainer">
            { chats.map((chat, index) => (
                <div key={index} 
                    className={`chatDisplay paddedObject ${selectedChatObject === chat ? 'selectedChat': ''}`}
                    onClick={() => setSelectedChatObject(chat)}> 
                    <span> {getMessageReciever(chat)} </span>
                    <ArrowForwardIosIcon />
                </div>
            )) }
        </div>
    );
};

export default ChatsList;