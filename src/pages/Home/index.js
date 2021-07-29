import React, { useEffect } from 'react';
import {Link} from 'react-router-dom'
import $ from "jquery";
// eslint-disable-next-line no-use-before-define
import axios from "axios"

import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
Drawer, 
AppBar, 
Toolbar, 
List,
CssBaseline, 
Typography, 
Divider, 
IconButton, 
ListItem, 
ListItemIcon, 
ListItemText, 
Button,
TextField, 
Dialog, 
DialogActions, 
DialogContent, 
DialogContentText, 
DialogTitle,  
} from '@material-ui/core'

 


import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

 

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AppsIcon from '@material-ui/icons/Apps';



import Alert from '@material-ui/lab/Alert';

 

import logotipo from '../../assets/images/logo-vileve-pay-cor-140px.png'



import ButtonTimer from '../../components/ButtonTimer'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


import {
  Loading,
  Spinner
} from './styles'

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logotipo:{
    width:'100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openmodal, setOpenmodal] = React.useState(true);
  const handleClickOpen = () => {
    setOpenmodal(true);
  };

  const handleClose = () => {
    //sendtokensms();
  };

  const getIconRender = i =>{
    if(i === 0) return <HomeIcon />
    if(i === 1) return <AssignmentIndIcon />
    if(i === 2) return <AppsIcon /> 
  }

  const [token, setTOKEN] = React.useState('');
  const OnchangeTOKEN = v => { setTOKEN(v.replace(/\D/g, '')) }


  const [Showloading, setShowloading] = React.useState('none');

 
  const sendtokensms = () => {
  setShowloading('')
  $.ajax({
    url: `http://3.233.0.255:3001/validation/sms/${token}`,
    type: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('token')
    },
    async: true,
    crossDomain: true,
    cache: false,
    success: (result) => {
      alert(result.message);
      setOpenmodal(false);
      setShowloading('none');
    },
    error: (error) => {
      alert(error.responseJSON.message);
      setOpenmodal(false);
      setShowloading('none');
    }
  })
  }

 



  return (

    <>

    <Loading style={{ display: Showloading }}><Spinner /></Loading>


      <Dialog open={openmodal} aria-labelledby="form-dialog-title" data-keyboard="false"data-backdrop="static">
        <DialogTitle id="form-dialog-title">Informe o Token enviado por SMS</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Informe o token enviado para seu celular para que confirme sua conta no gateway de pagamentos Vileve.
          </DialogContentText>

          <TextField
            autoFocus
            // margin="dense"
            id="name"
            label="Token"
            type="text"
            autoComplete="off"
            variant="outlined"
            inputProps={{ maxLength: 6,
              onChange: (e) => OnchangeTOKEN(e.target.value),
              value: token
            }}
            // fullWidth
          />
          
 
        <ButtonTimer/>

 
        </DialogContent>


        <DialogActions>
          <Button onClick={sendtokensms} variant="contained" color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>

    
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Bem Vindo ao Gateway de Pagamentos Vileve
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        
        <div className={classes.toolbar}>
        <div className={classes.logotipo} ><img src={logotipo} width="100px"></img></div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />

          <List>
            <Link to='/'>
              <ListItem button >
                <ListItemIcon> <HomeIcon /> </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>

            <Link to='/form'>
              <ListItem button>
                <ListItemIcon> <AssignmentIndIcon /> </ListItemIcon>
                <ListItemText primary="Cadastro" />
              </ListItem>
            </Link>

            <Link to='/products'>
              <ListItem button >
                <ListItemIcon> <AppsIcon /> </ListItemIcon>
                <ListItemText primary="Produtos" />
              </ListItem>
            </Link>

          </List>

        <Divider />

        <Link to='/signup'>
        <List>
             <ListItem button>
              <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
        </List>
        </Link>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <h3>Gateway de Pagamentos Vileve Pay</h3>
        <Typography paragraph>
        {/* <Typography variant="h5" gutterBottom>Gateway de Pagamentos Vileve Pay</Typography> */}
          Seja bem vindo à área de administração do seu gateway de pagamentos vileve.
        </Typography>
 

      <div className={classes.root}>
      <Alert severity="warning"><b>Atenção:</b> Complete    seu cadastro! <a href='#'>Clique aqui para acessar o formulário!</a> </Alert>
     </div>
 
      </main>
    </div>
    </>
  );
}
