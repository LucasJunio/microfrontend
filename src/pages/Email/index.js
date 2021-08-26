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

import history from "../../services/history";

const getUrlParameter = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const token = pathName.split("/email/")[1];
  return token;
};

const Email = () => {
  const [modal, setOpenmodal] = React.useState(false);

  $.ajax({
    url: `https://vileveway-backend-lb-develop.vileveway.com.br/api/v1/validation/email/${getUrlParameter()}`,
    type: "GET",
    crossDomain: true,
    cache: false,
    success: (result) => {
      setOpenmodal(true);
      $("#form-dialog-body").html(
        `<b>Seja bem vindo à Vileve,</b> seu <b>email foi confirmado</b>, agora você está pronto pra começar!.`
      );
    },
    error: (error) => {
      console.log(error);
      setOpenmodal(true);
      $("#form-dialog-body").html(
        `<b><span style="color:red">Erro: </span></b>Algo deu errado tente novamente!</b>`
      );
    },
  });

  const handleClose = () => {
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
