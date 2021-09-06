import React from "react";
import { useStyles } from "./styles";
import { Modal, Backdrop, Fade, Card, CardContent } from "@material-ui/core";

const TransitionsModal = ({ openModal, handleModal, children }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      onClose={handleModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal} style={{ outline: 0 }}>
        <Card className={classes.root}>
          <CardContent>{children}</CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};

export default TransitionsModal;
