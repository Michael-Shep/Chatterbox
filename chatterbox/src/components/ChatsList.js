import { useState, useEffect } from "react";

import firebase from 'firebase/app';
import 'firebase/firestore';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import NewChatDialog from "./NewChatDialog";

const ChatsList = ({ userCredentials, selectedChatObject, setSelectedChatObject }) => {
    const db = firebase.firestore();
    const [chats, setChats] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const userEmail = userCredentials.email;

    useEffect(() => {
        db.collection("chats").where('participants', 'array-contains', userEmail)
        .onSnapshot((querySnapshot) => {
            let documents = [];
            querySnapshot.forEach((doc) => {
                let documentObject = doc.data();
                documentObject.id = doc.id;
                documents.push(documentObject);
            });
            setChats(prevChats => prevChats.concat(documents));
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
            <div id="newChatButton" onClick={() => setDialogOpen(true)}>Create New Chat</div>
            { chats.map((chat, index) => (
                <div key={index} 
                    className={`chatDisplay paddedObject ${selectedChatObject === chat ? 'selectedChat': ''}`}
                    onClick={() => setSelectedChatObject(chat)}> 
                    <span> {getMessageReciever(chat)} </span>
                    <ArrowForwardIosIcon />
                </div>
            )) }
            <NewChatDialog dialogOpen={dialogOpen} onClose={() => setDialogOpen(false)} userCredentials={userCredentials} />
        </div>
    );
};

export default ChatsList;