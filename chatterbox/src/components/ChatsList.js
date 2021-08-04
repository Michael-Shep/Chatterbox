import { useState, useEffect } from "react";

import firebase from 'firebase/app';
import 'firebase/firestore';

const ChatsList = ({ userCredentials }) => {
    const db = firebase.firestore();
    const [chats, setChats] = useState([]);
    const userEmail = userCredentials.user.email;

    useEffect(() => {
        db.collection("chats").where('participants', 'array-contains', userEmail).get()
        .then((querySnapshot) => {
            let documents = [];
            querySnapshot.forEach((doc) => {
                documents.push(doc.data());
            });
            setChats(documents);
        })
        .catch((error) => {
            console.log('Chat data could not be fetched');
            console.log(error);
        });
    }, [db, userEmail]);

    useEffect(() => {
        console.log(chats);
    }, [chats]);

    return (
        <div id="chatListContainer">
            This is the chat list
        </div>
    );
};

export default ChatsList;