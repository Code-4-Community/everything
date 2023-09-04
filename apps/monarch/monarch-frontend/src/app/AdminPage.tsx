/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
//@ts-ignore
import awsmobile from '../aws-exports.js';
import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { SearchTherapists } from './SearchTherapists.js';
import ManageTherapists from './ManageTherapists';
Amplify.configure(awsmobile);

function AdminPage () {
    const [accessToken, setAccessToken] = useState<string>('');
    useEffect(() => {
        async function fetchData() {
          const userData = await Auth.currentAuthenticatedUser();
          const cognitoStorage = userData['pool']['storage'];
          const accessTokenKey = Object.keys(cognitoStorage).find((key) => key.includes('accessToken'));
          const accessTokenValue = accessTokenKey ? cognitoStorage[accessTokenKey] : '';
          setAccessToken(accessTokenValue);
          //console.log(accessToken);
        }
        fetchData();
    }, []);

    return (
        <Tabs isManual variant='enclosed'>
            <TabList>
              <Tab>Search</Tab>
              <Tab>Manage</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SearchTherapists accessToken={accessToken} />
              </TabPanel>
              <TabPanel>
                <ManageTherapists accessToken={accessToken}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
    )
}

export default withAuthenticator(AdminPage);
