import { Container, Grid, Box, TextField, RadioGroup, FormControlLabel, Radio, FormLabel, Divider, withStyles, createStyles, Theme, styled, Button, Snackbar } from '@material-ui/core';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../../components/Hero';
import { ReactComponent as ContactSvg } from './contact.svg';
import Alert from '@material-ui/lab/Alert';
import { submitFormData } from './functions';

const StyledDivider = styled(Divider)({
  margin: '20px'
});

const StyledButton = styled(Button)({
  float: 'right',
  borderRadius: '10px',
  color: 'white',
  padding: '10px 20px',
  background: "linear-gradient(127deg, rgba(12,0,213,1) 0%, rgba(248,0,255,1) 100%)" 
});

const Contact: React.FC = () => {

  interface ContactData {
    firstName: string;
    lastName: string;
    email: string;
    year: string;
    major: string;
    // TODO: ask if we still want to do user-submitted questions
    questions: any[];
    role: string;
  }

  const [data, setData] = useState({ firstName: '', lastName: '', email: '', year: '', major: '', questions: [], role: '' } as ContactData);
  const [showAlert, setShowAlert] = useState<boolean>(false)

  return (
    <div>
      <Container maxWidth="md">
        <Helmet>
          <title>Projects</title>
          <meta
            name="description"
            content="C4C delivers web applications to Boston-based nonprofits."
          />
        </Helmet>
        <Hero
          subtitle="Want to stay in touch? Fill out your contact info below!"
          title="Contact Us"
          SvgNode={ContactSvg}
        />
      </Container>
      <Container maxWidth="md">
        <Box marginTop={5}>
          <Grid container>
            <TextField 
              label="First Name"
              value={data.firstName}
              onChange={(event) => setData({...data, firstName: event.target.value})}
            />
            <TextField 
              label="Last Name"
              value={data.lastName}
              onChange={(event) => setData({...data, lastName: event.target.value})}
            />
            <TextField 
              label="Email"
              value={data.email}
              onChange={(event) => setData({...data, email: event.target.value})}
            />
            <TextField 
              label="Graduation Year"
              value={data.year}
              onChange={(event) => setData({...data, year: event.target.value})}
            />
            <TextField 
              label="Major"
              value={data.major}
              onChange={(event) => setData({...data, major: event.target.value})}
            />
          </Grid>
          <StyledDivider />
          <FormLabel component="legend">Which positions are you interested in?</FormLabel>        
          <RadioGroup value={data.role} row>
            <FormControlLabel value="developer" control={<Radio />} label="Developer" 
              onChange={(event: any) => setData({...data, role: "developer"})}
            />
            <FormControlLabel value="designer" control={<Radio />} label="Designer"
              onChange={(event: any) => setData({...data, role: "designer"})}
            />
            <FormControlLabel value="productmanager" control={<Radio />} label="Product Manager"
              onChange={(event: any) => setData({...data, role: "productmanager"})}
            />
          </RadioGroup>
          <StyledButton onClick={(event) => {
            console.log('submitting form', data);

            if (data.email.indexOf('@') === -1) {
              setShowAlert(true);
              return;
            }

            if (data.email.indexOf('.') === -1) {
              setShowAlert(true);
              return;
            }

            const gradYear = parseInt(data.year);
            if (isNaN(gradYear)) {
              setShowAlert(true);
              return;
            }
            const submitData = {...data, gradYear};

            submitFormData({
              url: 'https://<some api url>',
              data: submitData,
              accessToken: 'some API token',
              secretToken: 'some secret API token',
            }).then((data: any) => {
              const { success, errorMessage } = data;

              if (success) {
                console.info("API submit successful")
              } else {
                console.info(`warning: ${errorMessage}`);
                setShowAlert(true);
                setData({ firstName: '', lastName: '', email: '', year: '', major: '', questions: [], role: '' })
              }
            }).catch((error) => {
              setShowAlert(true);
            })
          }}>
            Submit
          </StyledButton>
        </Box>
      </Container>
      <Snackbar open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert severity="info">Error submiting data</Alert>
      </Snackbar>
    </div>
  );
};

export default Contact;
