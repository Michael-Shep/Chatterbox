import { useHistory } from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Home = ({ setUserCredentials }) => {
    const history = useHistory();

    const exitButtonHandler = () => {
        setUserCredentials('');
        history.push('/login');
    };

    return (
        <div>
            <div className="toolbar">
                <h1 id="toolbarText">Chatterbox</h1>
                <ExitToAppIcon id="exitIcon" onClick={exitButtonHandler} fontSize="large"/>
            </div>
        </div>
    );
};

export default Home;