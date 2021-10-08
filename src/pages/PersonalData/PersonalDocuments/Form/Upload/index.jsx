import React, { useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import ImgUpload from "components/ImgUpload";
import ProgressBarLinear from "components/ProgressBarLinear";
import { useStyles } from "./styles";
import { useFormik } from "formik";
import {
  persistDocuments,
  clearImgUpload,
} from "../../../../../store/ducks/User";
import { useDispatch, useSelector } from "react-redux";
import { createObjectDocuments } from "../../../../../utils/img/imgUpload";

const Upload = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    signer: { userId },
    user: { percentUploadImg },
  } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    return () => {
      dispatch(clearImgUpload());
    };
  }, []);

  console.log(percentUploadImg);
  const formik = useFormik({
    initialValues: {
      rgImg: null,
      rgVersoImg: null,
    },
    onSubmit: (values) => {
      const body = createObjectDocuments(values, userId, "vilevewayclient");
      dispatch(persistDocuments(body));
    },
  });

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Card className={classes.root}>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography variant="h5">Documentos Pessoa Física</Typography>
                  <br />
                  <Divider />
                </Grid>
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
                  <ProgressBarLinear percent={percentUploadImg} width="308px" />
                  <button type="submit">salvar</button>
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
