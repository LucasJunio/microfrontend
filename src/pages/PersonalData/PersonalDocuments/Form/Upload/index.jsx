import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import ImgUpload from "components/ImgUpload";
import ProgressBarLinear from "components/ProgressBarLinear";
import TransitionsModal from "components/Modal";
import { useStyles } from "./styles";
import { useFormik } from "formik";
import {
  persistDocuments,
  clearImgUpload,
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

  const [openModal, setOpenModal] = useState(false);
  const [isCnpj] = useState(true);

  const handleModal = () => {
    setOpenModal(!openModal);
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

  const formik = useFormik({
    initialValues: {
      indetificacao: null,
      rgVersoImg: null,
    },
    onSubmit: (values) => {
      const body = createObjectDocuments(values, userId, "vilevewayclient");
      dispatch(persistDocuments(body));
    },
  });
  console.log(imgData);
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Card className={classes.root}>
          <CardContent>
            <TransitionsModal openModal={openModal} handleModal={handleModal}>
              <ProgressBarLinear percent={percentUploadImg} width="100%" />
            </TransitionsModal>
            <form onSubmit={formik.handleSubmit}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography variant="h5">Documentos Pessoa Física</Typography>
                  <br />
                  <Divider />
                </Grid>
                {imgData &&
                  imgData.map(({ base64, categoria, status }) => {
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
                        <ImgUpload
                          name={categoria}
                          formik={formik}
                          category={categoria}
                          base64={`data:image/png;base64,${base64}`}
                          showButton={status === "Reprovado" ? true : false}
                          status={status}
                          showDivOpacity={true}
                        />
                      </Grid>
                    );
                  })}

                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                  <ImgUpload
                    name="rgImg"
                    formik={formik}
                    category="indetificação"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                  <ImgUpload
                    name="rgVersoImg"
                    formik={formik}
                    category="teste"
                  />
                </Grid>
                <Grid item>
                  <button type="submit" onClick={handleModal}>
                    salvar
                  </button>
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
