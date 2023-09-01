import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import c4cLogo from '../images/c4cLogo.png'
import cityOfBostonLogo from '../images/cityOfBostonLogo.png'

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ height: '109px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
      <Container maxWidth="xl" style={{ color: 'grey' }}>
        <Toolbar style={{ paddingTop: '25px', paddingBottom: '25px' }}>
          <img src={cityOfBostonLogo} style={{ marginTop: '12px', paddingRight: '15px' }} />
          <div
            style={{
              borderLeft: '1px solid rgba(0, 0, 0, 1)',
              height: '55px',
              paddingRight: '15px',
            }} />
          <img src={c4cLogo} />
          
          <Box sx={{ flexGrow: 0, float: 'right' }}>
            <p style={{paddingLeft: '650px', fontFamily: 'Lora', fontSize: '20px'}}>Green Infrastructure</p>
          </Box>
        </Toolbar>
        
      </Container>
      
    </AppBar>
  );
}
export default ResponsiveAppBar;