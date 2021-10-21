import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Grid,
  Hidden,
  MenuItem,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import countries from "../../../../utils/data/countries";
import { ExpandMore } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector, useDispatch } from "react-redux";
import { userById } from "../../../../store/ducks/User";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import validationSchema from "./validateSchema";

const Form = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const spaceColumn = 2;
  const elevetionAccordion = 3;

  const {
    signer: { userId },
    user: { type, status, dataUser },
  } = useSelector((state) => state);
  console.log(dataUser);
  useEffect(() => {
    dispatch(userById(userId));
  }, []);

  useEffect(() => {
    if (status === "loading" && type === "userById") {
      setOpen(true);
    } else if (status === "completed" && type === "userById") {
      // setCurrentUser(...dataUser);
      // console.log(currentUser);
      setOpen(false);
    }
  }, [status]);

  const formik = useFormik({
    initialValues: {
      ...dataUser,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleNationality = (event, value) => {
    console.log(event);
    // formik.setFieldValue("nacionalidade", value);
  };

  console.log(dataUser);
  console.log(formik.values.usuario?.nome);
  // console.log(formik.values?.usuario?.nome);
  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="primary" />
      </Backdrop>
      <br />
      <form onSubmit={formik.handleSubmit}>
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
                    <Grid container direction="column" spacing={spaceColumn}>
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
                              fullWidth
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
                              className={classes.fieldCentralization}
                              format="dd/MM/yyyy"
                              value={formik.values.pessoa.nascimento}
                              onChange={(date) =>
                                formik.setFieldValue("pessoa.nascimento", date)
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
                              disableCloseOnSelect
                              noOptionsText={"País não encontrado"}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  className={classes.fieldCentralization}
                                  label="NACIONALIDADE"
                                  name="pessoa.nacionalidade"
                                  margin="normal"
                                  size="small"
                                  variant="outlined"
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.pessoa?.nacionalidade &&
                                    Boolean(formik.errors.pessoa?.nacionalidade)
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
                              fullWidth
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
                              fullWidth
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
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <TextField
                              id="mae"
                              name="pessoa.mae"
                              label="Nome da Mãe"
                              variant="outlined"
                              size="small"
                              fullWidth
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
                              fullWidth
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
                        <Grid container>
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <TextField
                              id="email"
                              name="usuario.email"
                              label="Email"
                              variant="outlined"
                              size="small"
                              fullWidth
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
                    <Grid container direction="column" spacing={spaceColumn}>
                      <Grid item>
                        <Typography>Documentos</Typography>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <TextField
                              label="RG"
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <TextField
                              label="Orgão Emissor"
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <KeyboardDatePicker
                              id="emissao"
                              variant="dialog"
                              inputVariant="outlined"
                              name="pessoa.emissao"
                              margin="normal"
                              label="Data de emissão"
                              size="small"
                              className={classes.fieldCentralization}
                              format="dd/MM/yyyy"
                              fullWidth
                              required
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <TextField
                              label="CPF"
                              variant="outlined"
                              size="small"
                              fullWidth
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

        <Accordion elevation={elevetionAccordion}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel-content-personal-data"
            id="panel-header-personal-dataheader"
          >
            <Typography className={classes.heading}>Endereço</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item lg={5}>
                    <Grid container direction="column" spacing={spaceColumn}>
                      <Grid item>
                        <Typography>Endereço Pessoa Física</Typography>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <TextField
                              label="CEP"
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6} lg={12} xl={6}>
                            <TextField
                              label="Endereço"
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                            <TextField
                              label="Bairro"
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                            <TextField
                              label="Número"
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <TextField
                              label="Completo"
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <TextField
                              label="Estado"
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <TextField
                              label="Cidade"
                              variant="outlined"
                              size="small"
                              fullWidth
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
                    <Grid container direction="column" spacing={spaceColumn}>
                      <Grid item>
                        <Typography>Endereço Pessoa Jurídica</Typography>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <TextField
                              label="CEP"
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6} lg={12} xl={6}>
                            <TextField
                              label="Endereço"
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                            <TextField
                              label="Bairro"
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                            <TextField
                              label="Número"
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <TextField
                              label="Completo"
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <TextField
                              label="Estado"
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <TextField
                              label="Cidade"
                              variant="outlined"
                              size="small"
                              fullWidth
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
        <button type="submit"> Salvar</button>
      </form>
    </div>
  );
};

export default Form;
