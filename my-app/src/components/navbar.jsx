import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Arial',
  },
  navbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    zIndex: 1,
    minWidth: '200px',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.dropdownMenu}
    >
      
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#2196f3' }}>
        <Container>
          <Toolbar className={classes.navbarContainer}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              PwC
            </Typography>

            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <div className={classes.dropdownContainer}>
              <Button color="inherit" component={Link} to="/scheduler" onClick={handleMenuOpen}>
                Scheduler
              </Button>
              {renderMenu}
            </div>
            <Button color="inherit" component={Link} to="/contactus">
              Contact Us
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;