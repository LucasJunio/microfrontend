import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import ImgUpload from "components/ImgUpload";
import ProgressBarLinear from "components/ProgressBarLinear";
import SkeletonImgDocuments from "components/SkeletonImgDocuments";
import TransitionsModal from "components/Modal";
import { useStyles } from "./styles";
import { useFormik } from "formik";
import {
  persistDocuments,
  clearImgUpload,
  clearPercentUpload,
  documentsByUser,
} from "../../../../../store/ducks/User";
import { useDispatch, useSelector } from "react-redux";
import { createObjectDocuments } from "../../../../../utils/img/imgUpload";

const Upload = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    signer: { userId },
    user: { percentUploadImg, imgData },
  } = useSelector((state) => {
    return state;
  });
  let readOnly = true;
  const [openModal, setOpenModal] = useState(false);
  const [img, setImg] = useState([]);

  const handleModal = () => {
    dispatch(clearPercentUpload());
    setOpenModal(!openModal);
    dispatch(documentsByUser(userId));
  };

  useEffect(() => {
    percentUploadImg === 100 && handleModal();
  }, [percentUploadImg]);

  useEffect(() => {
    dispatch(documentsByUser(userId));
    return () => {
      dispatch(clearImgUpload());
    };
  }, []);

  useEffect(() => {
    imgData.length > 0 && setImg(imgData);
  }, [imgData]);

  const obj = {};
  img.forEach(({ categoria, status }) => {
    status = status ?? "";
    if (status.toLowerCase() === "reprovado" || !status) {
      readOnly = false;
    }
    obj[categoria] = categoria;
  });

  const formik = useFormik({
    initialValues: {
      ...obj,
    },

    onSubmit: (values) => {
      const body = createObjectDocuments(values, userId, "vilevewayclient");
      dispatch(persistDocuments(body));
    },
  });
  return (
    <Grid container direction="column">
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Card className={classes.root}>
          <CardContent>
            <TransitionsModal openModal={openModal} handleModal={handleModal}>
              <ProgressBarLinear percent={percentUploadImg} width="100%" />
            </TransitionsModal>
            <form onSubmit={formik.handleSubmit}>
              <Grid container direction="column" spacing={5}>
                <Grid item>
                  <Typography variant="h5">Documentos Pessoa F??sica</Typography>
                  <br />
                  <Divider />
                </Grid>
                {img && img.length > 0 ? (
                  img.map(({ base64, categoria, status, descricao }) => {
                    status = status ?? "";
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={8}
                        lg={8}
                        xl={8}
                        key={categoria}
                      >
                        <Typography variant="subtitle1">{descricao}</Typography>
                        <ImgUpload
                          name={categoria}
                          formik={formik}
                          category={categoria}
                          base64={base64 && `data:image/png;base64,${base64}`}
                          showButton={
                            !status || status.toLowerCase() === "reprovado"
                              ? true
                              : false
                          }
                          status={status}
                          showDivOpacity={true}
                        />
                      </Grid>
                    );
                  })
                ) : (
                  <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <SkeletonImgDocuments
                      widthImg={360}
                      widthText={360}
                      heightImg={250}
                    />
                    <SkeletonImgDocuments
                      widthImg={360}
                      widthText={360}
                      heightImg={250}
                    />
                    <SkeletonImgDocuments
                      widthImg={360}
                      widthText={360}
                      heightImg={250}
                    />
                  </Grid>
                )}
                <Grid item>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleModal}
                        disabled={readOnly}
                        startIcon={<Save />}
                      >
                        Salvar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Upload;
