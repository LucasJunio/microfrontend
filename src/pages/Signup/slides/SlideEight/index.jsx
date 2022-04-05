import React, { useEffect } from "react";
import { Button, Grid, Hidden, Typography, TextField } from "@material-ui/core";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import manPc from "../../../../assets/images/register.png";
import { useStyles } from "../../styles";
import { maskNumber } from "../../../../utils/string/masks";
import { getCep } from "../../../../services/api/api";

export const SlideEight = ({ nextStep, previousStep, formik, waitCep }) => {
  const classes = useStyles();
  useEffect(() => {
    return () => {};
  });
  const handleCep = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    if (value.length >= 8) {
      getCep(event.target.value).then((cep) => {
        waitCep(true);
        setTimeout(() => {
          if (!!cep) {
            waitCep(false);
            formik.setFieldValue("enderecoPf", cep.logradouro);
            formik.setFieldValue("bairroPf", cep.bairro);
            formik.setFieldValue("cidadePf", cep.localidade);
            formik.setFieldValue("estadoPf", cep.uf);
          }
        }, 1500);
      });
    } else {
      waitCep(false);
      formik.setFieldValue("enderecoPf", "");
      formik.setFieldValue("bairroPf", "");
      formik.setFieldValue("cidadePf", "");
      formik.setFieldValue("estadoPf", "");
    }
    formik.handleChange(event);
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <div className={classes.divCentralization}>
        <Grid container justifyContent="center" alignItems="center">
          <Hidden only={["xs", "sm"]}>
            <Grid item md={6}>
              <Grid container justifyContent="center" alignItems="center">
                <img src={manPc} className={classes.manPc} alt="logotipo" />
              </Grid>
            </Grid>
          </Hidden>
          <Grid item md={6}>
            <Grid container direction="column" spacing={6}>
              <Grid item>
                <Typography
                  variant="body1"
                  gutterBottom
                  className={classes.label}
                >
                  Informe os dados de{" "}
                  <span className={classes.labelUser}>
                    Endereço do Representante Legal
                  </span>
                </Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} lg={3}>
                    <TextField
                      id="cepPf"
                      name="cepPf"
                      label="CEP"
                      value={formik.values.cepPf}
                      onChange={(e) => handleCep(e)}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.cepPf && Boolean(formik.errors.cepPf)
                      }
                      helperText={formik.touched.cepPf && formik.errors.cepPf}
                      inputProps={{
                        maxLength: 8,
                        autoComplete: "off",
                      }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item md={7} lg={6}>
                    <TextField
                      id="enderecoPf"
                      name="enderecoPf"
                      label="ENDEREÇO"
                      value={formik.values.enderecoPf}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.enderecoPf &&
                        Boolean(formik.errors.enderecoPf)
                      }
                      helperText={
                        formik.touched.enderecoPf && formik.errors.enderecoPf
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item md={2} lg={3}>
                    <TextField
                      id="numeroPf"
                      name="numeroPf"
                      label="NÚMERO"
                      value={formik.values.numeroPf}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          maskNumber(e.target.value)
                        )
                      }
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.numeroPf &&
                        Boolean(formik.errors.numeroPf)
                      }
                      helperText={
                        formik.touched.numeroPf && formik.errors.numeroPf
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item md={6} lg={6}>
                    <TextField
                      id="bairroPf"
                      name="bairroPf"
                      label="BAIRRO"
                      value={formik.values.bairroPf}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.bairroPf &&
                        Boolean(formik.errors.bairroPf)
                      }
                      helperText={
                        formik.touched.bairroPf && formik.errors.bairroPf
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item md={6} lg={6}>
                    <TextField
                      id="complementoPf"
                      name="complementoPf"
                      label="COMPLEMENTO"
                      value={formik.values.complementoPf}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.complementoPf &&
                        Boolean(formik.errors.complementoPf)
                      }
                      helperText={
                        formik.touched.complementoPf &&
                        formik.errors.complementoPf
                      }
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item lg={6}>
                    <TextField
                      id="cidadePf"
                      name="cidadePf"
                      label="CIDADE"
                      value={formik.values.cidadePf}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.cidadePf &&
                        Boolean(formik.errors.cidadePf)
                      }
                      helperText={
                        formik.touched.cidadePf && formik.errors.cidadePf
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      id="estadoPf"
                      name="estadoPf"
                      label="ESTADO"
                      value={formik.values.estadoPf}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          e.target.value.replace(/[^a-zA-ZçÇ]/g, "")
                        )
                      }
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.estadoPf &&
                        Boolean(formik.errors.estadoPf)
                      }
                      helperText={
                        formik.touched.estadoPf && formik.errors.estadoPf
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  justify="flex-end"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="sm"
                      rel="noopener noreferrer"
                      onClick={() => previousStep()}
                    >
                      <ArrowBack className={classes.arrowIconBack} />
                      Anterior
                    </Button>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    size="sm"
                    id="BTNTHIRDNEXTPF"
                    rel="noopener noreferrer"
                    onClick={() => nextStep()}
                  >
                    Próximo
                    <ArrowForward className={classes.arrowIconNext} />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};
