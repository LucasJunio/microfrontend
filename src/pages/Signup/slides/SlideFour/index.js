import React, { useEffect } from "react";
import { Grid, Hidden, Typography, TextField } from "@material-ui/core";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import Button from "../../../../components/CustomButtons/Button";
import manPc from "../../../../assets/images/register.png";
import { useStyles } from "../../styles";
import { maskNumber } from "../../../../utils/string/masks";
import { getCep } from "../../../../services/api/api";

export const SlideFour = ({ nextStep, previousStep, formik, waitCep }) => {
  const classes = useStyles();

  const handleCep = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    if (value.length >= 8) {
      getCep(event.target.value).then((cep) => {
        waitCep(true);
        setTimeout(() => {
          if (!!cep) {
            waitCep(false);
            formik.setFieldValue("endereco", cep.logradouro);
            formik.setFieldValue("bairro", cep.bairro);
            formik.setFieldValue("cidade", cep.localidade);
            formik.setFieldValue("estado", cep.uf);
          }
        }, 1500);
      });
    } else {
      waitCep(false);
      formik.setFieldValue("endereco", "");
      formik.setFieldValue("bairro", "");
      formik.setFieldValue("cidade", "");
      formik.setFieldValue("estado", "");
    }
    formik.handleChange(event);
  };

  useEffect(() => {
    return () => {};
  });

  return (
    <Grid item xs={12} md={12} lg={12}>
      <div className={classes.divCentralization}>
        <Grid container justify="center" alignItems="center">
          <Hidden only={["xs", "sm"]}>
            <Grid item md={6}>
              <Grid container justify="center" alignItems="center">
                <img src={manPc} className={classes.manPc} alt="logotipo" />
              </Grid>
            </Grid>
          </Hidden>
          <Grid item md={6}>
            <Grid container direction="column" spacing={4}>
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
                      id="cep"
                      name="cep"
                      label="CEP"
                      value={formik.values.cep}
                      onChange={(e) => handleCep(e)}
                      onBlur={formik.handleBlur}
                      error={formik.touched.cep && Boolean(formik.errors.cep)}
                      helperText={formik.touched.cep && formik.errors.cep}
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
                      id="endereco"
                      name="endereco"
                      label="ENDEREÇO"
                      value={formik.values.endereco}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.endereco &&
                        Boolean(formik.errors.endereco)
                      }
                      helperText={
                        formik.touched.endereco && formik.errors.endereco
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item md={2} lg={3}>
                    <TextField
                      id="numero"
                      name="numero"
                      label="NÚMERO"
                      value={formik.values.numero}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          maskNumber(e.target.value)
                        )
                      }
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.numero && Boolean(formik.errors.numero)
                      }
                      helperText={formik.touched.numero && formik.errors.numero}
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
                      id="bairro"
                      name="bairro"
                      label="BAIRRO"
                      value={formik.values.bairro}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.bairro && Boolean(formik.errors.bairro)
                      }
                      helperText={formik.touched.bairro && formik.errors.bairro}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item md={6} lg={6}>
                    <TextField
                      id="complemento"
                      name="complemento"
                      label="COMPLEMENTO"
                      value={formik.values.complemento}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.complemento &&
                        Boolean(formik.errors.complemento)
                      }
                      helperText={
                        formik.touched.complemento && formik.errors.complemento
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
                      id="cidade"
                      name="cidade"
                      label="CIDADE"
                      value={formik.values.cidade}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.cidade && Boolean(formik.errors.cidade)
                      }
                      helperText={formik.touched.cidade && formik.errors.cidade}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      id="estado"
                      name="estado"
                      label="ESTADO"
                      value={formik.values.estado}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          e.target.value.replace(/[^a-zA-ZçÇ]/g, "")
                        )
                      }
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.estado && Boolean(formik.errors.estado)
                      }
                      helperText={formik.touched.estado && formik.errors.estado}
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
                      color="warning"
                      size="sm"
                      rel="noopener noreferrer"
                      onClick={() => previousStep()}
                    >
                      <ArrowBack className={classes.arrowIconBack} />
                      Anterior
                    </Button>
                  </Grid>
                  <Button
                    color="primary"
                    size="sm"
                    id="BTNTHIRDNEXT"
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
