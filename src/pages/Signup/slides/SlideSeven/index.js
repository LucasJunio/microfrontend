import React, { useState, useEffect } from "react";
import {
  Grid,
  Hidden,
  Typography,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import Button from "../../../../components/CustomButtons/Button";
import manPc from "../../../../assets/images/register.png";
import { useStyles } from "../../styles";
import { maskCpf, maskDate, maskCel } from "../../../../utils/string/masks";
import { getCountries } from "../../../../services/api/api";

export const SlideSeven = ({ nextStep, previousStep, formik }) => {
  const classes = useStyles();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const countriesNames = async () => {
      setCountries(await getCountries());
    };

    countriesNames();
  }, []);

  useEffect(() => {
    return () => {};
  });

  return (
    <Grid item xs={12} md={12}>
      <div className={classes.divCentralization}>
        <Grid container justify="center" alignItems="center">
          <Hidden only={["xs", "sm"]}>
            <Grid item md={4}>
              <Grid container justify="center" alignItems="center">
                <img src={manPc} className={classes.manPc} alt="logotipo" />
              </Grid>
            </Grid>
          </Hidden>
          <Grid item md={8}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <Typography
                      variant="body1"
                      gutterBottom
                      className={classes.label}
                    >
                      Informe os dados de{" "}
                      <span className={classes.labelUser}>Pessoa Física</span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="cpfPf"
                      name="cpfPf"
                      label="CPF"
                      value={formik.values.cpfPf}
                      onChange={(e) => {
                        formik.setFieldValue(
                          e.target.id,
                          maskCpf(e.target.value)
                        );
                      }}
                      fullWidth
                      inputProps={{ maxLength: 14 }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="celularPf"
                      name="celularPf"
                      label="CELULAR"
                      value={formik.values.celularPf}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          maskCel(e.target.value)
                        )
                      }
                      fullWidth
                      inputProps={{ maxLength: 15 }}
                      required
                      error={Boolean(formik.errors.celularPf)}
                      helperText={formik.errors.celularPf}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="nascimentoPf"
                      name="nascimentoPf"
                      label="NASCIMENTO"
                      value={formik.values.nascimentoPf}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          maskDate(e.target.value)
                        )
                      }
                      inputProps={{ maxLength: 10 }}
                      fullWidth
                      required
                      error={Boolean(formik.errors.nascimentoPf)}
                      helperText={formik.errors.nascimentoPf}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="naturalidadePf"
                      name="naturalidadePf"
                      label="NATURALIDADE"
                      value={formik.values.naturalidadePf}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          e.target.value.replace(/[^a-zA-ZçÇ]/g, "")
                        )
                      }
                      fullWidth
                      required
                      error={Boolean(formik.errors.naturalidadePf)}
                      helperText={formik.errors.naturalidadePf}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="nacionalidadePf"
                      name="nacionalidadePf"
                      select
                      label="NACIONALIDADE"
                      value={formik.values.nacionalidadePf}
                      onChange={formik.handleChange}
                      fullWidth
                      required
                      error={Boolean(formik.errors.nacionalidadePf)}
                      helperText={formik.errors.nacionalidadePf}
                    >
                      {countries.map((country) => {
                        return (
                          <MenuItem key={country} value={country}>
                            {country}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="estadoCivilPf"
                      name="estadoCivilPf"
                      select
                      label="ESTADO CIVIL"
                      value={formik.values.estadoCivilPf}
                      fullWidth
                      onChange={formik.handleChange}
                      required
                      error={Boolean(formik.errors.estadoCivilPf)}
                      helperText={formik.errors.estadoCivilPf}
                    >
                      <MenuItem key="sl" value="Solteiro">
                        Solteiro
                      </MenuItem>
                      <MenuItem key="cs" value="Casado">
                        Casado
                      </MenuItem>
                      <MenuItem key="sp" value="Separado">
                        Separado
                      </MenuItem>
                      <MenuItem key="vi" value="Viuvo">
                        Viúvo
                      </MenuItem>
                      <MenuItem key="dv" value="Divorciado">
                        Divorciado
                      </MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="rgPf"
                      name="rgPf"
                      label="RG"
                      value={formik.values.rgPf}
                      onChange={formik.handleChange}
                      fullWidth
                      inputProps={{ maxLength: 10 }}
                      required
                      error={Boolean(formik.errors.rgPf)}
                      helperText={formik.errors.rgPf}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="emissorPf"
                      name="emissorPf"
                      label="ORGÃO EMISSOR"
                      value={formik.values.emissorPf}
                      onChange={formik.handleChange}
                      fullWidth
                      error={Boolean(formik.errors.emissorPf)}
                      helperText={formik.errors.emissorPf}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="emissaoPf"
                      name="emissaoPf"
                      label="DATA EMISSAO"
                      value={formik.values.emissaoPf}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          maskDate(e.target.value)
                        )
                      }
                      fullWidth
                      inputProps={{ maxLength: 10 }}
                      required
                      error={Boolean(formik.errors.emissaoPf)}
                      helperText={formik.errors.emissaoPf}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="sexoPf"
                      name="sexoPf"
                      select
                      label="SEXO"
                      fullWidth
                      value={formik.values.sexoPf}
                      onChange={formik.handleChange}
                      required
                      error={Boolean(formik.errors.sexoPf)}
                      helperText={formik.errors.sexoPf}
                    >
                      <MenuItem key="M" value="M">
                        Masculino
                      </MenuItem>
                      <MenuItem key="F" value="F">
                        Feminino
                      </MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      id="maePf"
                      name="maePf"
                      label="NOME DA MÃE"
                      value={formik.values.maePf}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          e.target.value.replace(/[^a-zA-Z ]/g, "")
                        )
                      }
                      fullWidth
                      inputProps={{ maxLength: 150 }}
                      required
                      error={Boolean(formik.errors.maePf)}
                      helperText={formik.errors.maePf}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      id="paiPf"
                      name="paiPf"
                      label="NOME DO PAI"
                      value={formik.values.paiPf}
                      onChange={formik.handleChange}
                      fullWidth
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          e.target.value.replace(/[^a-zA-Z ]/g, "")
                        )
                      }
                      inputProps={{ maxLength: 150 }}
                      error={Boolean(formik.errors.paiPf)}
                      helperText={formik.errors.paiPf}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TextField
                      id="sitePf"
                      name="sitePf"
                      label="SITE DE VENDAS"
                      value={formik.values.sitePf}
                      onChange={formik.handleChange}
                      fullWidth
                      required
                      error={Boolean(formik.errors.sitePf)}
                      helperText={formik.errors.sitePf}
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
                  <Grid item>
                    <Button
                      color="primary"
                      size="sm"
                      id="BTNSECONDNEXTPF"
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
        </Grid>
      </div>
    </Grid>
  );
};
