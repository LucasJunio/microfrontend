import React from 'react'
import $ from "jquery";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";

import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';

import {
 ClassBackground
} from './styles'

import { useDispatch, useSelector } from 'react-redux';
import { signupRequest, signupSuccess } from '../../store/modules/signup/actions';
import history from '../../services/history';

const getUrlParameter = (sParam) => {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('?'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
  return false;
};

const Email =() => {
  const dispatch = useDispatch();
  const [modal, setOpenmodal] = React.useState(false);


  $.ajax({
    url: `http://3.233.0.255:3001/validation/email/${getUrlParameter('token')}`,
    type: 'GET',
    crossDomain: true,
    cache: false,
    success: (result) => {
    setOpenmodal(true);
    $('#form-dialog-body').html(`<b>Seja bem vindo à Vileve,</b> seu <b>email foi confirmado</b>, agora você está pronto pra começar!.`);
    },
    error: (error) => {
       setOpenmodal(true);
       $('#form-dialog-body').html(`<b><span style="color:red">Erro :(</span></b> ${JSON.stringify(error.responseJSON.message.message)}.`);
      }
  })

  const handleClose = () => {
    // dispatch(signupSuccess());
    history.push('/');
  };


    return (
     <>
        <Dialog open={modal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><ThumbUpAltOutlinedIcon style={{ marginTop: 15, marginRight: 5 }}/>  Seja Bem Vindo ao Grupo Vileve</DialogTitle>
        <DialogContent>
          <DialogContentText id="form-dialog-body">
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="success">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

     <ClassBackground></ClassBackground>
     </>
    );
  }
export default Email;