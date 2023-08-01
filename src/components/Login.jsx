import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import checkUser from './CheckUser';
import checkPublica from './CheckPublica';
import '@aws-amplify/ui-react/styles.css';

const Login = ({ user }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const checkData = async () => {
                const [userExistsResult, userPublicaResult] = await Promise.all([
                    checkUser(user),
                    checkPublica(user),
                ]);

                if (userExistsResult) {
                    if (userPublicaResult) {
                        navigate(`/publica-events`);
                    } else {
                        navigate(`/`);
                    }
                } else {
                    navigate(`/create-user`);
                }
            };
            checkData();
        }
    }, [user, navigate]);

    return null;
};

export default withAuthenticator(Login);


