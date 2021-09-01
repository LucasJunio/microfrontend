import React, { useEffect, useState } from "react";
import $ from "jquery";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {ThumbUpAltOutlined} from "@material-ui/icons/";
import { ClassBackground } from "./styles";

import { emailValidation } from "../../store/ducks/Email";
import Modal from "components/Modal"

const Email = () => {
  const { token } = useParams();
  const dispach = useDispatch();

  
  const { status, message } = useSelector((state) => {
    return state.email;
  });
  
  const [openModal, setOpenModal] = useState(false);
  
  useEffect(() => {
    
    console.log(status)

    switch (status) {
      case "completed":
        setOpenModal(true);
        console.log("Deu bom");
        $("#form-dialog-body").html(
          `<b>Seja bem vindo à Vileve,</b> seu <b>email foi confirmado</b>, agora você está pronto pra começar!.`
        );
        break;

      case "failed":
        console.log("Deu ruim");

        setOpenModal(true);
        $("#form-dialog-body").html(
          `<b><span style="color:red">Erro: </span></b>Algo deu errado tente novamente!</b>`
        );
        break;

      default:
        setOpenModal(false);
        break;
    }
  }, [status]);

  useEffect(() => {
    dispach(emailValidation(token));
  },[])


  const handleCloseModal = () => {
    setOpenModal(false)
  };

  return (
    <>

      <Modal openModal={openModal}>
        <div>{message}</div>
      </Modal>

      {/* <Dialog open={modal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <ThumbUpAltOutlined style={{ marginTop: 15, marginRight: 5 }} />{" "}
          Seja Bem Vindo ao Grupo Vileve
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="form-dialog-body"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="success">
            Ok
          </Button>
        </DialogActions>
      </Dialog> */}

      <ClassBackground></ClassBackground>
    </>
  );
};
export default Email;
