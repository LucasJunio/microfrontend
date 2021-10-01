import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThumbUpAltOutlined } from "@material-ui/icons/";
import { ClassBackground } from "./styles";

import { emailValidation } from "../../store/ducks/Email";

const Email = () => {
  const { token } = useParams();
  const { status, message } = useSelector((state) => {
    return state.email;
  });

  const history = useHistory();  
  const dispach = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    switch (status) {
      case "completed":
        setOpenModal(true);
        break;

      case "failed":
        setOpenModal(true);
        break;

      default:
        setOpenModal(false);
        break;
    }
  }, [status]);

  useEffect(() => {
    dispach(emailValidation(token));
  }, []);

  const handleRedirect = () => {
    history.push("/signin");
  };

  return (
    <>
      <Dialog open={openModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {status === "completed" ? (
            <span>
              <ThumbUpAltOutlined /> Seja Bem Vindo ao Grupo Vileve
            </span>
          ) : (
            <span>Seu email não foi válidado</span>
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="form-dialog-body">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleRedirect}
            color={status === "completed" ? "success" : "danger"}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <ClassBackground></ClassBackground>
    </>
  );
};
export default Email;
