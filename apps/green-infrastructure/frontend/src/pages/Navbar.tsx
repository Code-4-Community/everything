import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import c4cLogo from '../images/logos/c4cLogo.png';
import cityOfBostonLogo from '../images/logos/cityOfBostonLogo.png';
import profileIcon from '../images/logos/profileIcon.png';
import { Link } from '@mui/material';

function Navbar() {
  return (
    <AppBar
      position="sticky"
      style={{ height: '109px', backgroundColor: 'rgba(255, 255, 255, 1)' }}
    >
      <Container maxWidth="xl" style={{ color: 'grey' }}>
        <Toolbar style={{ paddingTop: '25px', paddingBottom: '25px' }}>
          <img
            src={cityOfBostonLogo}
            style={{ marginTop: '12px', paddingRight: '15px' }}
          />
          <div
            style={{
              borderLeft: '1px solid rgba(0, 0, 0, 1)',
              height: '55px',
              paddingRight: '15px',
            }}
          />
          <img src={c4cLogo} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              flexGrow: 1,
            }}
          >
            <Link
              href="/signup"
              style={{
                height: '25px',
                textDecoration: 'none',
                paddingTop: '5px',
                marginRight: '40px',
                color: 'black',
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: 'Montserrat',
              }}
            >
              SIGN UP
            </Link>
            <Link
              href="/login"
              style={{
                height: '25px',
                textDecoration: 'none',
                paddingTop: '5px',
                marginRight: '40px',
                color: 'black',
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: 'Montserrat',
              }}
            >
              LOGIN
            </Link>
            <button
              style={{
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                backgroundColor: 'white',
                height: '32px',
                width: '32px',
              }}
            >
              <img
                style={{ width: '32px', height: '32px' }}
                src={profileIcon}
              />
            </button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
