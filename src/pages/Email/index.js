import React from "react";
import $ from "jquery";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "components/CustomButtons/Button.js";
import { useLocation } from "react-router-dom";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

import { ClassBackground } from "./styles";

import { useDispatch, useSelector } from "react-redux";
import {
  signupRequest,
  signupSuccess,
} from "../../store/modules/signup/actions";
import history from "../../services/history";

// const getUrlParameter = (sParam) => {
//   HeaderView();
//   var sPageURL = window.location.search.substring(1),
//     sURLVariables = sPageURL.split("?"),
//     sParameterName,
//     i;

//   for (i = 0; i < sURLVariables.length; i++) {
//     sParameterName = sURLVariables[i].split("=");

//     if (sParameterName[0] === sParam) {
//       return typeof sParameterName[1] === undefined
//         ? true
//         : decodeURIComponent(sParameterName[1]);
//     }
//   }
//   return false;
// };

function HeaderView() {
  const location = useLocation();
  console.log(location.pathname);
  // return <span>Path : {location.pathname}</span>;
}

const getUrlParameter = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const token = pathName.split("/email/")[1];
  return token;
};

const Email = () => {
  const dispatch = useDispatch();
  const [modal, setOpenmodal] = React.useState(false);

  $.ajax({
    url: `https://vileveway-backend-lb-develop.vileveway.com.br/api/v1/validation/email/${getUrlParameter()}`,
    type: "GET",
    crossDomain: true,
    cache: false,
    success: (result) => {
      dispatch(signupSuccess());
      setOpenmodal(true);
      $("#form-dialog-body").html(
        `<b>Seja bem vindo à Vileve,</b> seu <b>email foi confirmado</b>, agora você está pronto pra começar!.`
      );
    },
    error: (error) => {
      setOpenmodal(true);
      $("#form-dialog-body").html(
        `<b><span style="color:red">Erro :(</span></b> ${JSON.stringify(
          error.responseJSON.message.message
        )}.`
      );
    },
  });

  const handleClose = () => {
    // dispatch(signupSuccess());
    history.push("/");
  };

  return (
    <>
      <Dialog open={modal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <ThumbUpAltOutlinedIcon style={{ marginTop: 15, marginRight: 5 }} />{" "}
          Seja Bem Vindo ao Grupo Vileve
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="form-dialog-body"></DialogContentText>
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
};
export default Email;
