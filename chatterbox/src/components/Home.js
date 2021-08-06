import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ChatsList from './ChatsList';
import MessageView from './MessageView';

const Home = ({ userCredentials }) => {
    const history = useHistory();
    const [selectedChatObject, setSelectedChatObject] = useState({});

    const exitButtonHandler = () => {
        history.push('/login');
    };

    return (
        <div className="screenContainer">
            <div className="toolbar">
                <h1 id="toolbarText">Chatterbox</h1>
                <ExitToAppIcon id="exitIcon" onClick={exitButtonHandler} fontSize="large"/>
            </div>
            { userCredentials &&
                <div id="contentContainer">
                    <div id="usernameDisplay">
                        <h2>{userCredentials.email}</h2>
                    </div>
                    <div id="chatsContainer">
                        <ChatsList userCredentials={userCredentials} 
                                   selectedChatObject={selectedChatObject}
                                   setSelectedChatObject={setSelectedChatObject} />
                        <MessageView selectedChatObject={selectedChatObject} 
                                     userCredentials={userCredentials} />
                    </div>
                </div>
            }
        </div>
    );
};

export default Home;