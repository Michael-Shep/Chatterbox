import { useHistory } from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChatsList from './ChatsList';

const Home = ({ userCredentials, setUserCredentials }) => {
    const history = useHistory();

    const exitButtonHandler = () => {
        setUserCredentials('');
        history.push('/login');
    };

    return (
        <div className="screenContainer">
            <div className="toolbar">
                <h1 id="toolbarText">Chatterbox</h1>
                <ExitToAppIcon id="exitIcon" onClick={exitButtonHandler} fontSize="large"/>
            </div>
            <div id="usernameDisplay">
                <h2>{userCredentials.user.email}</h2>
            </div>
            <ChatsList userCredentials={userCredentials} />
        </div>
    );
};

export default Home;