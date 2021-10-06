import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import ImgUpload from "components/ImgUpload";
import { useStyles } from "./styles";
import { useFormik } from "formik";
import { persistDocuments } from "../../../../../store/ducks/User";
import { useDispatch } from "react-redux";
const Upload = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      rgImg: null,
      rgVersoImg: null,
    },
    onSubmit: (values) => {
      const body = createObjectDocuments(values);
      console.log(body);
      dispatch(persistDocuments(body));
    },
  });

  const createObjectDocuments = (values = undefined) => {
    if (!!values) {
      let formData = new FormData();

      const docIdentifications = ["rgImg", "rgVersoImg"];

      const files = Object.keys(values).forEach((key) => {
        return formData.append("file", values[key]);
      });

      const itens = Object.keys(values).map((key) => {
        if (docIdentifications.indexOf(key) > -1) {
          return {
            categorie: "identificacao",
            filename: values[key].name,
          };
        }
      });

      // const obj = {
      //   file: [...files],
      //   info: JSON.stringify({
      //     idClient: 172,
      //     product: "vilevewayclient",

      //     itens: [...itens],
      //   }),
      // };
      // const obj = {
      //   file: [...files],
      // };

      const bodyobject = {
        idClient: 172,
        product: "vilevewayclient",
        itens: [
          { categorie: "identificacao", filename: "selectedFiles[0].name" },
          { categorie: "residencia", filename: "selectedFiles1[0].name" },
        ],
      };

      formData.append("info", JSON.stringify(bodyobject));

      console.log(formData);
      console.log(formData.getAll("file"));
      return formData;
    }

    return undefined;
  };
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
                  <ImgUpload name="rgImg" formik={formik} />
                  {/* <ImgUpload name="rgImg" formik={formik} /> */}
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                  <ImgUpload name="rgVersoImg" formik={formik} />
                </Grid>
                <Grid item>
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
