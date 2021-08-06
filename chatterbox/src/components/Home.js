import { useHistory } from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChatsList from './ChatsList';

const Home = ({ userCredentials, setUserCredentials }) => {
    const history = useHistory();

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
                <div>
                    <div id="usernameDisplay">
                        <h2>{userCredentials.email}</h2>
                    </div>
                    <ChatsList userCredentials={userCredentials} />
                </div>
            }
        </div>
    );
};

export default Home;