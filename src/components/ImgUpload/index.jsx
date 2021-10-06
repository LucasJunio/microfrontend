import React from "react";
import PropTypes from "prop-types";
import Img from "../../assets/images/no-image-found-360x250.png";
import { AddPhotoAlternate } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import { useStyles } from "./styles";

const ImgUpload = ({ name, formik }) => {
  const classes = useStyles();

  const handleUploadClick = (event) => {
    event.currentTarget.files &&
      (document.getElementById(`${name}/img`).src = window.URL.createObjectURL(
        event.currentTarget.files[0]
      ));
    formik.setFieldValue(`${name}`, event.currentTarget.files[0]);
  };

  return (
    <div className={classes.img}>
      <img
        id={`${name}/img`}
        src={Img}
        alt="Imagem carregada"
        className={classes.imgUpload}
      />
      <input
        name={name}
        accept="image/png, image/jpeg"
        className={classes.input}
        id={`${name}`}
        multiple
        type="file"
        onChange={handleUploadClick}
        readOnly
      />
      <label htmlFor={`${name}`}>
        <Fab
          component="span"
          className={(classes.button, classes.positionBtnUpload)}
        >
          <AddPhotoAlternate />
        </Fab>
      </label>
    </div>
  );
};

ImgUpload.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
};

export default ImgUpload;
