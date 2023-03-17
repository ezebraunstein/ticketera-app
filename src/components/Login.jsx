import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import checkUser from './CheckUser';
import '@aws-amplify/ui-react/styles.css';

const Login = ({ user }) => {

    const navigate = useNavigate();
    const [userExists, setUserExists] = useState(null);

    useEffect(() => {
        if (user) {
            const checkIfUserExists = async () => {
                const result = await checkUser(user);
                setUserExists(result);
            };
            checkIfUserExists();
        }
    }, [user]);

    if (userExists == true) {
        navigate(`/`);
    } else {
        navigate(`/create-user`);
    };

    return null;
};

export default withAuthenticator(Login);
