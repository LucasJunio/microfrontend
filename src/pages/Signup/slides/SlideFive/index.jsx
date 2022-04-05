import React, { useEffect } from "react";
import { Button, Grid, Hidden, Typography, TextField } from "@material-ui/core";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import manPc from "../../../../assets/images/register.png";
import { useStyles } from "../../styles";
import {
  maskTellPhone,
  maskNumber,
  maskCnpj,
} from "../../../../utils/string/masks";
import { getCnpj } from "../../../../services/api/api";

export const SlideFive = ({ nextStep, previousStep, formik, waitCnpj }) => {
  const classes = useStyles();

  const handleCNPJ = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    if (value.length >= 14) {
      waitCnpj(true);
      getCnpj(value).then((cnpj) => {
        if (!!cnpj) {
          waitCnpj(false);
          formik.setFieldValue("razaosocial", cnpj.name);
          formik.setFieldValue("nome_fantasia", cnpj.alias);
          formik.setFieldValue("telefone", maskTellPhone(cnpj.phone.phone_1));
          formik.setFieldValue("cnae", cnpj.legal_nature.code);
          formik.setFieldValue("ceppj", cnpj.address.zip_code);
          formik.setFieldValue("enderecopj", cnpj.address.street);
          formik.setFieldValue("bairropj", cnpj.address.neighborhood);
          formik.setFieldValue("cidadepj", cnpj.address.city);
          formik.setFieldValue("estadopj", cnpj.address.state);
          formik.setFieldValue("numeropj", cnpj.address.number);
        } else {
          waitCnpj(false);
          formik.setFieldValue("razaosocial", "");
          formik.setFieldValue("site", "");
          formik.setFieldValue("nome_fantasia", "");
          formik.setFieldValue("cidadepj", "");
          formik.setFieldValue("enderecopj", "");
          formik.setFieldValue("estadopj", "");
          formik.setFieldValue("numeropj", "");
          formik.setFieldValue("bairropj", "");
          formik.setFieldValue("telefone", "");
          formik.setFieldValue("ceppj", "");
          formik.setFieldValue("cnae", "");
        }
      });
    } else if (value.length === 0) {
      formik.setFieldValue("razaosocial", "");
      formik.setFieldValue("site", "");
      formik.setFieldValue("nome_fantasia", "");
      formik.setFieldValue("cidadepj", "");
      formik.setFieldValue("enderecopj", "");
      formik.setFieldValue("estadopj", "");
      formik.setFieldValue("numeropj", "");
      formik.setFieldValue("bairropj", "");
      formik.setFieldValue("telefone", "");
      formik.setFieldValue("ceppj", "");
      formik.setFieldValue("cnae", "");
    }

    formik.setFieldValue("cnpj", maskCnpj(event.target.value));
  };

  useEffect(() => {
    return () => {};
  });
  return (
    <Grid item md={12} lg={12}>
      <div style={{ padding: 20 }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Hidden only={["xs", "sm"]}>
            <Grid item md={5}>
              <Grid container justifyContent="center">
                <img src={manPc} className={classes.manPc} alt="logotipo" />
              </Grid>
            </Grid>
          </Hidden>
          <Grid item md={7}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Typography
                  variant="body1"
                  gutterBottom
                  className={classes.label}
                >
                  Informe os dados da{" "}
                  <span className={classes.labelUser}>Sua Empresa</span>
                </Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item md={4} lg={4}>
                    <TextField
                      id="cnpj"
                      name="cnpj"
                      label="CNPJ"
                      value={formik.values.cnpj}
                      onChange={(e) => {
                        handleCNPJ(e);
                      }}
                      onBlur={formik.handleBlur}
                      error={formik.touched.cnpj && Boolean(formik.errors.cnpj)}
                      helperText={formik.touched.cnpj && formik.errors.cnpj}
                      inputProps={{ maxLength: 18 }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item md={4} lg={3}>
                    <TextField
                      id="telefone"
                      name="telefone"
                      label="TELEFONE"
                      value={formik.values.telefone}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          maskTellPhone(e.target.value)
                        )
                      }
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.telefone &&
                        Boolean(formik.errors.telefone)
                      }
                      helperText={
                        formik.touched.telefone && formik.errors.telefone
                      }
                      inputProps={{ maxLength: 14 }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item md={4} lg={5}>
                    <TextField
                      id="site"
                      name="site"
                      label="SITE"
                      value={formik.values.site}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.site && Boolean(formik.errors.site)}
                      helperText={formik.touched.site && formik.errors.site}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item md={4} lg={5}>
                    <TextField
                      id="razaosocial"
                      name="razaosocial"
                      label="RAZÃO SOCIAL"
                      value={formik.values.razaosocial}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.razaosocial &&
                        Boolean(formik.errors.razaosocial)
                      }
                      helperText={
                        formik.touched.razaosocial && formik.errors.razaosocial
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item md={4} lg={3}>
                    <TextField
                      id="cnae"
                      name="cnae"
                      label="CNAE"
                      value={formik.values.cnae}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          maskNumber(e.target.value)
                        )
                      }
                      onBlur={formik.handleBlur}
                      error={formik.touched.cnae && Boolean(formik.errors.cnae)}
                      helperText={formik.touched.cnae && formik.errors.cnae}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item md={4} lg={4}>
                    <TextField
                      id="nome_fantasia"
                      name="nome_fantasia"
                      label="NOME FANTASIA"
                      value={formik.values.nome_fantasia}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.nome_fantasia &&
                        Boolean(formik.errors.nome_fantasia)
                      }
                      helperText={
                        formik.touched.nome_fantasia &&
                        formik.errors.nome_fantasia
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item md={3} lg={3}>
                    <TextField
                      id="ceppj"
                      name="ceppj"
                      label="CEP"
                      value={formik.values.ceppj}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.ceppj && Boolean(formik.errors.ceppj)
                      }
                      helperText={formik.touched.ceppj && formik.errors.ceppj}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item md={6} lg={6}>
                    <TextField
                      id="enderecopj"
                      name="enderecopj"
                      label="ENDEREÇO"
                      value={formik.values.enderecopj}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.enderecopj &&
                        Boolean(formik.errors.enderecopj)
                      }
                      helperText={
                        formik.touched.enderecopj && formik.errors.enderecopj
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item md={3} lg={3}>
                    <TextField
                      id="numeropj"
                      name="numeropj"
                      label="NUMERO"
                      value={formik.values.numeropj}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          maskNumber(e.target.value)
                        )
                      }
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.numeropj &&
                        Boolean(formik.errors.numeropj)
                      }
                      helperText={
                        formik.touched.numeropj && formik.errors.numeropj
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item md={6} lg={3}>
                    <TextField
                      id="bairropj"
                      name="bairropj"
                      label="BAIRRO"
                      value={formik.values.bairropj}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.bairropj &&
                        Boolean(formik.errors.bairropj)
                      }
                      helperText={
                        formik.touched.bairropj && formik.errors.bairropj
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item md={6} lg={3}>
                    <TextField
                      id="complementopj"
                      name="complementopj"
                      label="COMPLEMENTO"
                      value={formik.values.complementopj}
                      onChange={formik.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <TextField
                      id="cidadepj"
                      name="cidadepj"
                      label="CIDADE"
                      value={formik.values.cidadepj}
                      onChange={formik.handleChange}
                      fullWidth
                      required
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.cidadepj &&
                        Boolean(formik.errors.cidadepj)
                      }
                      helperText={
                        formik.touched.cidadepj && formik.errors.cidadepj
                      }
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <TextField
                      id="estadopj"
                      name="estadopj"
                      label="ESTADO"
                      value={formik.values.estadopj}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.estadopj &&
                        Boolean(formik.errors.estadopj)
                      }
                      helperText={
                        formik.touched.estadopj && formik.errors.estadopj
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} style={{ marginTop: "10px" }}>
            <Grid
              container
              justifyContent="flex-end"
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
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="sm"
                  id="BTNFOURTHNEXT"
                  rel="noopener noreferrer"
                  onClick={() => nextStep()}
                >
                  Próximo
                  <ArrowForward className={classes.arrowIconBack} />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};
