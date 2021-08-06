import { useState, useEffect } from "react";

import firebase from 'firebase/app';
import 'firebase/firestore';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const ChatsList = ({ userCredentials }) => {
    const db = firebase.firestore();
    const [chats, setChats] = useState([]);
    const userEmail = userCredentials.email;

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

    const getMessageReciever = (chatObject) => {
        if (chatObject.participants[0] === userEmail) {
            return chatObject.participants[1];
        } else {
            return chatObject.participants[0];
        }
    }

    const chatObjectHandler = (chatObject) => {
        console.log('Chat object clicked');
    }

    return (
        <div id="chatListContainer">
            { chats.map((chat, index) => (
                <div key={index} className='chatDisplay' onClick={chatObjectHandler}> 
                    <span> {getMessageReciever(chat)} </span>
                    <ArrowForwardIosIcon />
                </div>
            )) }
        </div>
    );
};

export default ChatsList;