import React from "react";
import PropTypes from "prop-types";
import Img from "../../assets/images/no-image-found-360x250.png";
import { AddPhotoAlternate } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import { useStyles } from "./styles";

/**
 * Component to img. Use the funciton imgUpload if you send in request.
 * Formik is required
 */

const ImgUpload = ({ name, category, formik }) => {
  const classes = useStyles();

  const handleUploadClick = (event) => {
    event.currentTarget.files &&
      (document.getElementById(`${name}/img`).src = window.URL.createObjectURL(
        event.currentTarget.files[0]
      ));
    event.currentTarget.files[0].category = category;
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
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
};

export default ImgUpload;
