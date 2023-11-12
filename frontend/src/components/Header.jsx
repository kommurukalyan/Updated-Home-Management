import React, { useState,useEffect } from 'react'
import { AppBar, Toolbar, Grid, InputBase, IconButton, Badge, makeStyles } from '@material-ui/core'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { useNavigate } from 'react-router-dom';
import * as userService from '../services/userService'
const useStyles = makeStyles(theme => ({
    root: {
        color:'white',
        backgroundColor: '#151b54',
        
    },
    title: {
        display: 'none',
        marginLeft:'340px',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
    searchInput: {
        opacity: '0.6',
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: 'white'
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }
    }
}))

export default function Header(props) {

  let userId=localStorage.getItem('Id')
  let user;

  useEffect(()=>{
    userService.getUserById(userId).then(res=>{
      user=res[0]
    })
  })
    const navigate=useNavigate()
const {messages,notifications,image=null}=props
const [recordForEdit, setRecordForEdit] = React.useState(null)
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
      };
      const handleMenuClose1 = () => {
        navigate('/dashboard/profile',{state:{
          userdata:user
        }
      })
        setRecordForEdit(user)
        setAnchorEl(null);
        handleMobileMenuClose();
      };
      const handleMenuClose2 = () => {
        navigate('/')
        setAnchorEl(null);
        handleMobileMenuClose();
      };
    
      const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
      };
    
      const menuId = 'primary-search-account-menu';
      const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose1}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose2}>Logout</MenuItem>
        </Menu>
      );
    
      const mobileMenuId = 'primary-search-account-menu-mobile';
      const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge badgeContent={11} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </Menu>
      );

    return (
        <div>
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container
                    alignItems="center">
                    <Typography className={classes.title} variant="h5" noWrap>
              Home Management
          </Typography>
                    
                    <Grid item sm></Grid>
                    <Grid item >
                        <IconButton>
                            <Badge overlap='rectangular' badgeContent={notifications} color="secondary">
                                <NotificationsNoneIcon style={{color:'white',marginLeft:'220px'}} fontSize="small" />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge overlap='rectangular' badgeContent={messages} color="primary">
                                <ChatBubbleOutlineIcon style={{color:'white'}} fontSize="small" />
                            </Badge>
                        </IconButton>
                        {
                            image!=null?
                            <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={`http://localhost:8801/images/`+image} />
              </IconButton>:
                            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
                        }


                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
         {renderMenu}
         </div>
    )
}
