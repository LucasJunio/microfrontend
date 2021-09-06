import React, { useState, useEffect } from "react";
import {
  Grid,
  Hidden,
  Typography,
  TextField,
  MenuItem,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
  }, []);

  useEffect(() => {
    return () => {};
  });

  const handleNationality = (event, value) => {
    formik.setFieldValue("nacionalidade", value);
  };

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
                        formik.handleChange(e);
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
                      onChange={(e) => {
                        formik.setFieldValue(
                          e.target.id,
                          maskCel(e.target.value)
                        );
                        formik.handleChange(e);
                      }}
                      value={formik.values.celular}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.celular && Boolean(formik.errors.celular)
                      }
                      helperText={
                        formik.touched.celular && formik.errors.celular
                      }
                      fullWidth
                      inputProps={{ maxLength: 15 }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="nascimento"
                      name="nascimento"
                      label="NASCIMENTO"
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          maskDate(e.target.value)
                        )
                      }
                      value={formik.values.nascimento}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.nascimento &&
                        Boolean(formik.errors.nascimento)
                      }
                      helperText={
                        formik.touched.nascimento && formik.errors.nascimento
                      }
                      inputProps={{ maxLength: 10 }}
                      fullWidth
                      required
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
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.naturalidade &&
                        Boolean(formik.errors.naturalidade)
                      }
                      helperText={
                        formik.touched.naturalidade &&
                        formik.errors.naturalidade
                      }
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          e.target.value.replace(/[^a-zA-ZçÇ ]/g, "")
                        )
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={countries}
                      getOptionLabel={(option) => option}
                      id="nacionalidade"
                      onChange={handleNationality}
                      value={formik.values.nacionalidade}
                      disableCloseOnSelect
                      noOptionsText={"País não encontrado"}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          style={{ marginTop: "0px" }}
                          label="NACIONALIDADE"
                          name="nacionalidade"
                          margin="normal"
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.nacionalidade &&
                            Boolean(formik.errors.nacionalidade)
                          }
                          helperText={
                            formik.touched.nacionalidade &&
                            formik.errors.nacionalidade
                          }
                          fullWidth
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="estado_civil"
                      name="estado_civil"
                      select
                      label="ESTADO CIVIL"
                      value={formik.values.estado_civil}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.estado_civil &&
                        Boolean(formik.errors.estado_civil)
                      }
                      helperText={
                        formik.touched.estado_civil &&
                        formik.errors.estado_civil
                      }
                      fullWidth
                      required
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
                      onBlur={formik.handleBlur}
                      error={formik.touched.rg && Boolean(formik.errors.rg)}
                      helperText={formik.touched.rg && formik.errors.rg}
                      inputProps={{ maxLength: 10 }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="emissor"
                      name="emissor"
                      label="ORGÃO EMISSOR"
                      value={formik.values.emissor}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.emissor && Boolean(formik.errors.emissor)
                      }
                      helperText={
                        formik.touched.emissor && formik.errors.emissor
                      }
                      fullWidth
                      required
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
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.emissao && Boolean(formik.errors.emissao)
                      }
                      helperText={
                        formik.touched.emissao && formik.errors.emissao
                      }
                      fullWidth
                      inputProps={{ maxLength: 10 }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="sexo"
                      name="sexo"
                      select
                      label="SEXO"
                      value={formik.values.sexo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.sexo && Boolean(formik.errors.sexo)}
                      helperText={formik.touched.sexo && formik.errors.sexo}
                      fullWidth
                      required
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
                      onBlur={formik.handleBlur}
                      error={formik.touched.mae && Boolean(formik.errors.mae)}
                      helperText={formik.touched.mae && formik.errors.mae}
                      inputProps={{ maxLength: 150 }}
                      fullWidth
                      required
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
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          e.target.value.replace(/[^a-zA-Z ]/g, "")
                        )
                      }
                      onBlur={formik.handleBlur}
                      error={formik.touched.pai && Boolean(formik.errors.pai)}
                      helperText={formik.touched.pai && formik.errors.pai}
                      inputProps={{ maxLength: 150 }}
                      fullWidth
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
