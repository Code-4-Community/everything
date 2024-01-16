/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { SearchTherapists } from './SearchTherapists.js';
import ManageTherapists from './ManageTherapists';

function AdminPage () {
    const [accessToken, setAccessToken] = useState<string>('');
    const [reload, setReload] = useState<boolean>(false);

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
        <Tabs isManual variant='enclosed'>
            <TabList>
              <Tab>Home</Tab>
              <Tab>Manage</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SearchTherapists accessToken={accessToken} reload={reload} setReload={setReload}/>
              </TabPanel>
              <TabPanel>
                <ManageTherapists accessToken={accessToken} reload={reload} setReload={setReload}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
    )
}

export default withAuthenticator(AdminPage);
