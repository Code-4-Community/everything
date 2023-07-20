import React, { useEffect, useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsmobile from '../aws-exports.js';
import axios from 'axios';
import AddPractitioner from './AddPractitioner';

Amplify.configure(awsmobile);

function ManageTherapists() {
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      const userData = await Auth.currentAuthenticatedUser();
      const cognitoStorage = userData['pool']['storage'];
      const accessTokenKey = Object.keys(cognitoStorage).find((key) => key.includes('accessToken'));
      const accessTokenValue = accessTokenKey ? cognitoStorage[accessTokenKey] : '';
      setAccessToken(accessTokenValue);
    }
    fetchData();
  }, []); 
  
  return (
  <div>
    <AddPractitioner />
    <div></div>
    <button onClick={() => axios.get('http://localhost:3333/admin', { headers: { 'accesstoken': accessToken}}).then(res=> console.log(res))}>Test</button>
  </div>);
}

export default withAuthenticator(ManageTherapists);
