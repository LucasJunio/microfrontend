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

export const SlideThree = ({ nextStep, previousStep, formik }) => {
  const classes = useStyles();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const countriesNames = async () => {
      setCountries(await getCountries());
    };

    countriesNames();
  }, [countries]);

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
                      <span className={classes.labelUser}>
                        Representante Legal
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="cpf"
                      name="cpf"
                      label="CPF"
                      value={formik.values.cpf}
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
                      id="celular"
                      name="celular"
                      label="CELULAR"
                      value={formik.values.celular}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          maskCel(e.target.value)
                        )
                      }
                      fullWidth
                      inputProps={{ maxLength: 15 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="nascimento"
                      name="nascimento"
                      label="NASCIMENTO"
                      value={formik.values.nascimento}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          maskDate(e.target.value)
                        )
                      }
                      inputProps={{ maxLength: 10 }}
                      fullWidth
                      required
                      error={Boolean(formik.errors.nascimento)}
                      helperText={formik.errors.nascimento}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="naturalidade"
                      name="naturalidade"
                      label="NATURALIDADE"
                      value={formik.values.naturalidade}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          e.target.value.replace(/[^a-zA-ZçÇ]/g, "")
                        )
                      }
                      fullWidth
                      required
                      error={Boolean(formik.errors.naturalidade)}
                      helperText={formik.errors.naturalidade}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="nacionalidade"
                      name="nacionalidade"
                      select
                      label="NACIONALIDADE"
                      value={formik.values.nacionalidade}
                      onChange={formik.handleChange}
                      fullWidth
                      required
                      error={Boolean(formik.errors.nacionalidade)}
                      helperText={formik.errors.nacionalidade}
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
                      id="estado_civil"
                      name="estado_civil"
                      select
                      label="ESTADO CIVIL"
                      value={formik.values.estado_civil}
                      fullWidth
                      onChange={formik.handleChange}
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
                      id="rg"
                      name="rg"
                      label="RG"
                      value={formik.values.rg}
                      onChange={formik.handleChange}
                      fullWidth
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="emissor"
                      name="emissor"
                      label="ORGÃO EMISSOR"
                      value={formik.values.emissor}
                      onChange={formik.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="emissao"
                      name="emissao"
                      label="DATA EMISSAO"
                      value={formik.values.emissao}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          maskDate(e.target.value)
                        )
                      }
                      fullWidth
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="sexo"
                      name="sexo"
                      select
                      label="SEXO"
                      fullWidth
                      value={formik.values.sexo}
                      onChange={formik.handleChange}
                      required
                      error={Boolean(formik.errors.sexo)}
                      helperText={formik.errors.sexo}
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
                  <Grid item xs={12} md={12}>
                    <TextField
                      id="mae"
                      name="mae"
                      label="NOME DA MÃE"
                      value={formik.values.mae}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          e.target.value.replace(/[^a-zA-Z ]/g, "")
                        )
                      }
                      fullWidth
                      inputProps={{ maxLength: 150 }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <TextField
                      id="pai"
                      name="pai"
                      label="NOME DO PAI"
                      value={formik.values.pai}
                      onChange={formik.handleChange}
                      fullWidth
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          e.target.value.replace(/[^a-zA-Z ]/g, "")
                        )
                      }
                      inputProps={{ maxLength: 150 }}
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
                      id="BTNSECONDNEXT"
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
