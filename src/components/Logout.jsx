import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import checkUser from './CheckUser';
import '@aws-amplify/ui-react/styles.css';

const Logout = ({ user, signOut }) => {

    user.signOut();
    
};

export default withAuthenticator(Logout);
