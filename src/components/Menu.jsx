import React, {useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import WorkIcon from '@material-ui/icons/Work';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import swal from 'sweetalert';

import { logOutUser, setPayload, clearMessage } from '../actions';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Menu = ({users ,clearMessage,  messages, logOutUser, setPayload}) => {
    const history = useHistory();

    const handleClick = (path) => {
        history.push(path);
    }

    useEffect(() => {
        if(users.payload.nombre.length === 0){
            let localPayload = localStorage.getItem('payload');
            if(localPayload){
                if(JSON.parse(localPayload).nombre.length > 0){
                    setPayload(JSON.parse(localPayload));
                }
            }
        }
	}, [])

    const removePayload = () => {
        localStorage.removeItem('payload')
        logOutUser();
    }

    function logOut() {
        if(users.payload.nombre.length > 0){
        
            return (
                <ListItem button activeClassName={classes.active} component={NavLink} to="/login" key={99} onClick={() => {  removePayload();  handleClick("/login");   } } >
                    <ListItemIcon>  <ExitToAppIcon /> </ListItemIcon>
                    <ListItemText primary="Salir" />
                </ListItem>
            );
        }
    }

    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className="backColor MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters" >
                    Menu
            </div>
            <Divider />
            <List>
            
                <ListItem activeClassName={classes.active} component={NavLink} to="/home" button key={1} onClick={() => handleClick("/")}>
                    <ListItemIcon>  <WorkIcon /> </ListItemIcon>
                    <ListItemText primary="Trabajando" />
                </ListItem>

                <ListItem button activeClassName={classes.active} component={NavLink} to="/asistencia-historica" key={9} onClick={() => handleClick("/asistencia-historica")}>
                    <ListItemIcon>  <WorkIcon /> </ListItemIcon>
                    <ListItemText primary="Asistencia Historica" />
                </ListItem>
                <br />
                <Divider />
                <br />
                <ListItem button activeClassName={classes.active} component={NavLink} to="/usuarios" onClick={() => handleClick("/usuarios")} >
                    <ListItemIcon>  <PeopleIcon /> </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                </ListItem>

                <ListItem button activeClassName={classes.active} component={NavLink} to="/usuarios-enrrolados" key={3} onClick={() => handleClick("/usuarios-enrrolados")} >
                    <ListItemIcon>  <AssignmentIndIcon /> </ListItemIcon>
                    <ListItemText primary="Usuarios Enrrolados" />
                </ListItem>

                <ListItem button activeClassName={classes.active} component={NavLink} to="/tiendas" key={4} onClick={() => handleClick("/tiendas")}>
                    <ListItemIcon>  <StorefrontIcon /> </ListItemIcon>
                    <ListItemText primary="Tiendas" />
                </ListItem>
                
                {
                    logOut()
                }

            </List>
        </div>
    );
    
    const window = undefined;

    const container = window !== undefined ? () => window().document.body : undefined;

    if(messages.sendMessage){
        let titulo = messages.messages.title;
        let message = messages.messages.message;
        let status = messages.messages.status;

		setTimeout(() => {
			swal(titulo, message, status)
				.then(() => {
                    return clearMessage();
				});
			}, 100
		);
	}

	return(
        <div>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    DJ Adrenaline Shops
                </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            
        </div>

	)
};

Menu.propTypes = {

}

const mapStateProps = ({users, messages}) => ({users, messages});

export default connect(mapStateProps, {logOutUser, clearMessage, setPayload})(Menu);

