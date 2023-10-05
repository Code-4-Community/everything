import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import c4cLogo from '../images/logos/c4cLogo.png';
import profileIcon from '../images/logos/profileIcon.png';
import cityOfBostonLogo from '../images/logos/cityOfBostonLogo.png';
import { Link } from '@mui/material';

function Navbar() {
  return (
    <AppBar
      position="static"
      style={{ height: '109px', backgroundColor: 'rgba(255, 255, 255, 1)' }}
    >
      <Container maxWidth="xl" style={{ color: 'grey' }}>
        <Toolbar
          style={{
            paddingTop: '25px',
            paddingBottom: '25px',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row' }}>
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
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Link
              style={{
                color: 'grey',
                fontSize: '16px',
                fontWeight: 'bold',
                marginRight: '20px',
              }}
            >
              SIGN UP
            </Link>
            <Link
              style={{
                color: 'grey',
                fontSize: '16px',
                fontWeight: 'bold',
                marginRight: '20px',
              }}
            >
              LOGIN
            </Link>
            <button style={{ borderStyle: 'none' }}>
              <img src={profileIcon} />
            </button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
