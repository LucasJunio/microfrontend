import React from 'react'
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

const Email =() => {
  const dispatch = useDispatch();
  var modal = React.useState(true);

  const handleClose = () => {
    dispatch(signupSuccess());
    history.push('/');
  };

console.log('')
    return (
     <>
        <Dialog open={modal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><ThumbUpAltOutlinedIcon style={{ marginTop: 15, marginRight: 5 }}/>  Seja Bem Vindo ao Grupo Vileve</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b>Seja bem vindo à Vileve,</b> seu <b>email foi confirmado</b>, agora você está pronto pra começar!.
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