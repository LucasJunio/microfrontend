import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
  Grid,
  Hidden,
  MenuItem,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { KeyboardDatePicker } from "@material-ui/pickers";
import countries from "../../../../utils/data/countries";
import { ExpandMore } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector, useDispatch } from "react-redux";
import { userById, editUser } from "../../../../store/ducks/User";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import validationSchema from "./validateSchema";
import { maskCel, maskCpf } from "../../../../utils/string/masks";
import bancos from "../../../../utils/data/banco";

const Form = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const spaceColumn = 2;
  const elevetionAccordion = 3;

  const {
    signer: { userId },
    user: { type, status, dataUser, message },
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch(userById(userId));
  }, []);

  useEffect(() => {
    if (status === "loading" && (type === "userById" || type === "editUser")) {
      setOpen(true);
    } else if (
      status === "completed" &&
      (type === "userById" || type === "editUser")
    ) {
      if (type === "editUser") {
        setOpen(false);
        enqueueSnackbar(message, {
          variant: "success",
        });
      }
      setOpen(false);
    } else if (status === "failed" && type === "editUser") {
      setOpen(false);
      enqueueSnackbar(message, {
        variant: "error",
      });
    }
  }, [status]);

  const formik = useFormik({
    initialValues: {
      ...dataUser,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      delete values.tarifa;
      delete values.conta;
      delete values.empresa;
      dispatch(editUser(values));
    },
  });

  const handleNationality = (event, value) => {
    formik.setFieldValue("pessoa.nacionalidade", value);
  };

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="primary" />
      </Backdrop>
      <br />
      <form onSubmit={formik.handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Accordion defaultExpanded elevation={elevetionAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel-content-personal-data"
                id="panel-header-personal-data"
              >
                <Typography variant="h2" className={classes.heading}>
                  Perfil
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container justifyContent="space-between">
                      <Grid item lg={5}>
                        <Grid
                          container
                          direction="column"
                          spacing={spaceColumn}
                        >
                          <Grid item>
                            <Typography>Dados Pessoais</Typography>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  label="Nome Completo"
                                  id="nome"
                                  name="usuario.nome"
                                  required
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={formik.values.usuario?.nome}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.usuario?.nome &&
                                    Boolean(formik.errors.usuario?.nome)
                                  }
                                  helperText={
                                    formik.touched.usuario?.nome &&
                                    formik.errors.usuario?.nome
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  id="sexo"
                                  name="pessoa.sexo"
                                  label="Sexo"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  required
                                  select
                                  value={formik.values.pessoa?.sexo}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.pessoa?.sexo &&
                                    Boolean(formik.errors.pessoa?.sexo)
                                  }
                                  helperText={
                                    formik.touched.pessoa?.sexo &&
                                    formik.errors.pessoa?.sexo
                                  }
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
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <KeyboardDatePicker
                                  id="nascimento"
                                  variant="dialog"
                                  inputVariant="outlined"
                                  name="pessoa.nascimento"
                                  margin="normal"
                                  label="Data de Nascimento"
                                  size="small"
                                  disabled
                                  className={classes.fieldCentralization}
                                  format="dd/MM/yyyy"
                                  value={formik.values.pessoa?.nascimento}
                                  onChange={(date) =>
                                    formik.setFieldValue(
                                      "pessoa.nascimento",
                                      date
                                    )
                                  }
                                  KeyboardButtonProps={{
                                    "aria-label": "change date",
                                  }}
                                  invalidLabel="Date of purchase"
                                  fullWidth
                                  required
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <Autocomplete
                                  id="nacionalidade"
                                  options={countries}
                                  getOptionLabel={(option) => option}
                                  onChange={handleNationality}
                                  value={formik.values.pessoa?.nacionalidade}
                                  disabled
                                  disableCloseOnSelect
                                  noOptionsText={"Pa??s n??o encontrado"}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      className={classes.fieldCentralization}
                                      label="Nacionalidade"
                                      name="pessoa.nacionalidade"
                                      margin="normal"
                                      size="small"
                                      variant="outlined"
                                      onBlur={formik.handleBlur}
                                      error={
                                        formik.touched.pessoa?.nacionalidade &&
                                        Boolean(
                                          formik.errors.pessoa?.nacionalidade
                                        )
                                      }
                                      helperText={
                                        formik.touched.pessoa?.nacionalidade &&
                                        formik.errors.pessoa?.nacionalidade
                                      }
                                      fullWidth
                                      required
                                    />
                                  )}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  id="naturalidade"
                                  name="pessoa.naturalidade"
                                  label="Naturalidade"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  required
                                  value={formik.values.pessoa?.naturalidade}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.pessoa?.naturalidade &&
                                    Boolean(formik.errors.pessoa?.naturalidade)
                                  }
                                  helperText={
                                    formik.touched.pessoa?.naturalidade &&
                                    formik.errors.pessoa?.naturalidade
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  id="estadoCivil"
                                  name="pessoa.estado_civil"
                                  label="Estado Civil"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  required
                                  select
                                  value={formik.values.pessoa?.estado_civil}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.pessoa?.estado_civil &&
                                    Boolean(formik.errors.pessoa?.estado_civil)
                                  }
                                  helperText={
                                    formik.touched.pessoa?.estado_civil &&
                                    formik.errors.pessoa?.estado_civil
                                  }
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
                                    Vi??vo
                                  </MenuItem>
                                  <MenuItem key="dv" value="Divorciado">
                                    Divorciado
                                  </MenuItem>
                                </TextField>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  id="mae"
                                  name="pessoa.mae"
                                  label="Nome da M??e"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  required
                                  value={formik.values.pessoa?.mae}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.pessoa?.mae &&
                                    Boolean(formik.errors.pessoa?.mae)
                                  }
                                  helperText={
                                    formik.touched.pessoa?.mae &&
                                    formik.errors.pessoa?.mae
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  id="pai"
                                  name="pessoa.pai"
                                  label="Nome do Pai"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  required
                                  value={formik.values.pessoa?.pai}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.pessoa?.pai &&
                                    Boolean(formik.errors.pessoa?.pai)
                                  }
                                  helperText={
                                    formik.touched.pessoa?.pai &&
                                    formik.errors.pessoa?.pai
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={12} md={12} lg={7} xl={12}>
                                <TextField
                                  id="email"
                                  name="usuario.email"
                                  label="Email"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  required
                                  value={formik.values.usuario?.email}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.usuario?.email &&
                                    Boolean(formik.errors.usuario?.email)
                                  }
                                  helperText={
                                    formik.touched.usuario?.email &&
                                    formik.errors.usuario?.email
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={5} xl={12}>
                                <TextField
                                  id="celular"
                                  name="pessoa.celular"
                                  label="Celular"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  required
                                  value={maskCel(formik.values.pessoa?.celular)}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.pessoa?.celular &&
                                    Boolean(formik.errors.pessoa?.celular)
                                  }
                                  helperText={
                                    formik.touched.pessoa?.celular &&
                                    formik.errors.pessoa?.celular
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item></Grid>
                      </Grid>

                      <Hidden only={("xs", "sm", "md")}>
                        <Divider
                          orientation="vertical"
                          flexItem
                          // className={classes.dividerHeight}
                        />
                      </Hidden>
                      <Grid item lg={5}>
                        <Grid
                          container
                          direction="column"
                          spacing={spaceColumn}
                        >
                          <Grid item>
                            <Typography>Documentos</Typography>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  label="RG"
                                  id="rg"
                                  name="pessoa.rg"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  required
                                  value={formik.values.pessoa?.rg}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.pessoa?.rg &&
                                    Boolean(formik.errors.pessoa?.rg)
                                  }
                                  helperText={
                                    formik.touched.pessoa?.rg &&
                                    formik.errors.pessoa?.rg
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  id="emissor"
                                  name="pessoa.emissor"
                                  label="Org??o Emissor"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  required
                                  value={formik.values.pessoa?.emissor}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.pessoa?.emissor &&
                                    Boolean(formik.errors.pessoa?.emissor)
                                  }
                                  helperText={
                                    formik.touched.pessoa?.emissor &&
                                    formik.errors.pessoa?.emissor
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <KeyboardDatePicker
                                  id="emissao"
                                  name="pessoa.emissao"
                                  variant="dialog"
                                  inputVariant="outlined"
                                  margin="normal"
                                  label="Data de emiss??o"
                                  size="small"
                                  disabled
                                  className={classes.fieldCentralization}
                                  format="dd/MM/yyyy"
                                  value={formik.values.pessoa?.emissao}
                                  onChange={(date) =>
                                    formik.setFieldValue("pessoa.emissao", date)
                                  }
                                  KeyboardButtonProps={{
                                    "aria-label": "change date",
                                  }}
                                  invalidLabel="Date of purchase"
                                  fullWidth
                                  required
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <TextField
                                  id="cpf"
                                  name="pessoa.cpf"
                                  label="CPF"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  required
                                  value={maskCpf(formik.values.pessoa?.cpf)}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.pessoa?.cpf &&
                                    Boolean(formik.errors.pessoa?.cpf)
                                  }
                                  helperText={
                                    formik.touched.pessoa?.cpf &&
                                    formik.errors.pessoa?.cpf
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item>
            <Accordion defaultExpanded elevation={elevetionAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel-content-personal-data"
                id="panel-header-personal-dataheader"
              >
                <Typography className={classes.heading}>Endere??o</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container justifyContent="space-between">
                      <Grid item lg={5}>
                        <Grid
                          container
                          direction="column"
                          spacing={spaceColumn}
                        >
                          <Grid item>
                            <Typography>Endere??o Pessoa F??sica</Typography>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  id="cep-pf"
                                  name="endereco_cpf.cep"
                                  label="CEP"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={formik.values.endereco_cpf?.cep}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.endereco_cpf?.cep &&
                                    Boolean(formik.errors.endereco_cpf?.cep)
                                  }
                                  helperText={
                                    formik.touched.endereco_cpf?.cep &&
                                    formik.errors.endereco_cpf?.cep
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={12} xl={6}>
                                <TextField
                                  id="endereco-pf"
                                  name="endereco_cpf.endereco"
                                  label="Endere??o"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={formik.values.endereco_cpf?.endereco}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.endereco_cpf?.endereco &&
                                    Boolean(
                                      formik.errors.endereco_cpf?.endereco
                                    )
                                  }
                                  helperText={
                                    formik.touched.endereco_cpf?.endereco &&
                                    formik.errors.endereco_cpf?.endereco
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={5} md={5} lg={6} xl={6}>
                                <TextField
                                  id="bairro-pf"
                                  name="endereco_cpf.bairro"
                                  label="Bairro"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={formik.values.endereco_cpf?.bairro}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.endereco_cpf?.bairro &&
                                    Boolean(formik.errors.endereco_cpf?.bairro)
                                  }
                                  helperText={
                                    formik.touched.endereco_cpf?.bairro &&
                                    formik.errors.endereco_cpf?.bairro
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={3} md={3} lg={2} xl={2}>
                                <TextField
                                  id="numero-pf"
                                  name="endereco_cpf.numero"
                                  label="N??mero"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={formik.values.endereco_cpf?.numero}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.endereco_cpf?.numero &&
                                    Boolean(formik.errors.endereco_cpf?.numero)
                                  }
                                  helperText={
                                    formik.touched.endereco_cpf?.numero &&
                                    formik.errors.endereco_cpf?.numero
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                <TextField
                                  id="complemento-pf"
                                  name="endereco_cpf.complemento"
                                  label="Completo"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={
                                    formik.values.endereco_cpf?.complemento
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.endereco_cpf?.complemento &&
                                    Boolean(
                                      formik.errors.endereco_cpf?.complemento
                                    )
                                  }
                                  helperText={
                                    formik.touched.endereco_cpf?.complemento &&
                                    formik.errors.endereco_cpf?.complemento
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  id="estado-pf"
                                  name="endereco_cpf.estado"
                                  label="Estado"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={formik.values.endereco_cpf?.estado}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.endereco_cpf?.estado &&
                                    Boolean(formik.errors.endereco_cpf?.estado)
                                  }
                                  helperText={
                                    formik.touched.endereco_cpf?.estado &&
                                    formik.errors.endereco_cpf?.estado
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  id="cidade-pf"
                                  name="endereco_cpf.cidade"
                                  label="Cidade"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={formik.values.endereco_cpf?.cidade}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.endereco_cpf?.cidade &&
                                    Boolean(formik.errors.endereco_cpf?.cidade)
                                  }
                                  helperText={
                                    formik.touched.endereco_cpf?.cidade &&
                                    formik.errors.endereco_cpf?.cidade
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item></Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item>
            <Accordion defaultExpanded elevation={elevetionAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel-content-personal-data"
                id="panel-header-personal-dataheader"
              >
                <Typography className={classes.heading}>Conta</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container justifyContent="space-between">
                      <Grid item lg={5}>
                        <Grid
                          container
                          direction="column"
                          spacing={spaceColumn}
                        >
                          <Grid item>
                            <Typography>Dados Banc??rios</Typography>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <TextField
                                  id="bancopj"
                                  name="conta.banco"
                                  select
                                  label="Banco"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  value={formik.values.conta?.banco}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.conta?.banco &&
                                    Boolean(formik.errors.conta?.banco)
                                  }
                                  helperText={
                                    formik.touched.conta?.banco &&
                                    formik.errors.conta?.banco
                                  }
                                  fullWidth
                                  required
                                >
                                  {bancos.map(({ nomeBanco, numeroBanco }) => {
                                    return (
                                      <MenuItem
                                        key={numeroBanco}
                                        value={numeroBanco}
                                      >
                                        {nomeBanco}
                                      </MenuItem>
                                    );
                                  })}
                                </TextField>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  id="agencia"
                                  name="conta.agencia"
                                  label="Ag??ncia"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={formik.values.conta?.agencia}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.conta?.agencia &&
                                    Boolean(formik.errors.conta?.agencia)
                                  }
                                  helperText={
                                    formik.touched.conta?.agencia &&
                                    formik.errors.conta?.agencia
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  id="conta"
                                  name="conta.conta"
                                  label="Conta"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={formik.values.conta?.conta}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.conta?.conta &&
                                    Boolean(formik.errors.conta?.conta)
                                  }
                                  helperText={
                                    formik.touched.conta?.conta &&
                                    formik.errors.conta?.conta
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <TextField
                                  id="pix"
                                  name="conta.pix"
                                  label="PIX"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={formik.values.conta?.pix}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.conta?.pix &&
                                    Boolean(formik.errors.conta?.pix)
                                  }
                                  helperText={
                                    formik.touched.conta?.pix &&
                                    formik.errors.conta?.pix
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item>
            <Grid container justifyContent="flex-end" alignItems="flex-end">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  disabled
                  startIcon={<Save fontSize="small" />}
                  type="submit"
                >
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Form;
