import React, { useCallback } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsmobile from '../aws-exports.js';
import axios from 'axios';
import AddPractitioner from './AddPractitioner';

Amplify.configure(awsmobile);

function ManageTherapists({ any: user }) {

  const getUserInfo = useCallback(async () => {
    await Auth.currentUserPoolUser();
  }, []);

  console.log('access token:' + Auth);
  return (
  <div>
    <AddPractitioner />
    <div></div>
    <button onClick={() => axios.get('http://localhost:3333/admin', { headers: { 'Authorization': `Bearer ${user.accessToken}`}}).then(res=> console.log(res))}>Test</button>
  </div>);
}

export default withAuthenticator(ManageTherapists);
