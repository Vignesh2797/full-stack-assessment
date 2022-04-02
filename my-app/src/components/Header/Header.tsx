import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import "./Header.css";


function Header() {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" className="header">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <h3 className="header__title">FHIR DATA</h3>
          </Typography>
          <AccountCircleIcon />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
