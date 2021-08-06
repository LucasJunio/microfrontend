import React, { useEffect } from "react";
import { Grid, Hidden, Typography, TextField } from "@material-ui/core";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import Button from "../../../../components/CustomButtons/Button";
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
      console.log(value);
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
        <Grid container justify="center" alignItems="center">
          <Hidden only={["xs", "sm"]}>
            <Grid item md={5}>
              <Grid container justify="center">
                <img src={manPc} className={classes.manPc} alt="logotipo" />
              </Grid>
            </Grid>
          </Hidden>
          <Grid item md={7}>
            <Grid container direction="column" spacing={3}>
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
                      fullWidth
                      inputProps={{ maxLength: 18 }}
                      required
                      error={Boolean(formik.errors.cnpj)}
                      helperText={formik.errors.cnpj}
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
                      fullWidth
                      inputProps={{ maxLength: 14 }}
                      required
                      error={Boolean(formik.errors.telefone)}
                      helperText={formik.errors.telefone}
                    />
                  </Grid>
                  <Grid item md={4} lg={5}>
                    <TextField
                      id="site"
                      name="site"
                      label="SITE"
                      value={formik.values.site}
                      onChange={formik.handleChange}
                      fullWidth
                      required
                      error={Boolean(formik.errors.site)}
                      helperText={formik.errors.site}
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
                      fullWidth
                      required
                      error={Boolean(formik.errors.razaosocial)}
                      helperText={formik.errors.razaosocial}
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
                      fullWidth
                      required
                      error={Boolean(formik.errors.cnae)}
                      helperText={formik.errors.cnae}
                    />
                  </Grid>
                  <Grid item md={4} lg={4}>
                    <TextField
                      id="nome_fantasia"
                      name="nome_fantasia"
                      label="NOME FANTASIA"
                      value={formik.values.nome_fantasia}
                      onChange={formik.handleChange}
                      fullWidth
                      required
                      error={Boolean(formik.errors.nome_fantasia)}
                      helperText={formik.errors.nome_fantasia}
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
                      fullWidth
                      required
                      error={Boolean(formik.errors.ceppj)}
                      helperText={formik.errors.ceppj}
                    />
                  </Grid>
                  <Grid item md={6} lg={6}>
                    <TextField
                      id="enderecopj"
                      name="enderecopj"
                      label="ENDEREÇO"
                      value={formik.values.enderecopj}
                      onChange={formik.handleChange}
                      fullWidth
                      required
                      error={Boolean(formik.errors.enderecopj)}
                      helperText={formik.errors.enderecopj}
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
                      fullWidth
                      required
                      error={Boolean(formik.errors.numeropj)}
                      helperText={formik.errors.numeropj}
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
                      fullWidth
                      required
                      error={Boolean(formik.errors.bairropj)}
                      helperText={formik.errors.bairropj}
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
                      error={Boolean(formik.errors.cidadepj)}
                      helperText={formik.errors.cidadepj}
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <TextField
                      id="estadopj"
                      name="estadopj"
                      label="ESTADO"
                      value={formik.values.estadopj}
                      onChange={formik.handleChange}
                      fullWidth
                      required
                      error={Boolean(formik.errors.estadopj)}
                      helperText={formik.errors.estadopj}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} style={{ marginTop: "10px" }}>
            <Grid container justify="flex-end" alignItems="center" spacing={3}>
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
              <Grid item>
                <Button
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
