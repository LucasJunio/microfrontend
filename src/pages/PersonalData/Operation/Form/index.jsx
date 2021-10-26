import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  MenuItem,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Save, ExpandMore } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { userById, editUser } from "../../../../store/ducks/User";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import validationSchema from "./validateSchema";
import { clearUser } from "../../../../store/ducks/User";
import { getListWhereClause } from "../../../../store/ducks/Lists";
import { maskRealMoney } from "../../../../utils/string/masks";

const Form = () => {
  const {
    signer: { userId },
    user: { type, status, dataUser, message },
    lists: { data, status: statusList },
  } = useSelector((state) => state);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const spaceColumn = 2;
  const elevetionAccordion = 3;

  useEffect(() => {
    dispatch(getListWhereClause("'cobranca'"));
    dispatch(userById(userId));
    return async () => {
      await dispatch(clearUser());
    };
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
      delete values.pessoa;
      delete values.conta;
      delete values.endereco_cpf;
      delete values.endereco_cnpj;
      delete values.empresa;
      console.log(values);
      dispatch(editUser(values));
    },
  });
  console.log(data);
  console.log(data.length === 0);
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
                aria-controls="panel-content-company"
                id="panel-header-company"
              >
                <Typography variant="h2" className={classes.heading}>
                  Custo
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container justifyContent="space-between">
                      <Grid item sm={12} md={6} lg={5}>
                        <Grid
                          container
                          direction="column"
                          spacing={spaceColumn}
                        >
                          <Grid item>
                            <Typography>Informações</Typography>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  id="cobranca"
                                  variant="outlined"
                                  name="tarifa.tipo_cobranca"
                                  label="Tipo Cobrança"
                                  size="small"
                                  disabled
                                  select
                                  value={formik.values.tarifa?.tipo_cobranca}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.tarifa?.tipo_cobranca &&
                                    Boolean(formik.errors.tarifa?.tipo_cobranca)
                                  }
                                  helperText={
                                    formik.touched.tarifa?.tipo_cobranca &&
                                    formik.errors.tarifa?.tipo_cobranca
                                  }
                                  fullWidth
                                  required
                                >
                                  {data.length > 0 &&
                                    data.map(({ valor }) => {
                                      return (
                                        <MenuItem key={valor} value={valor}>
                                          {valor}
                                        </MenuItem>
                                      );
                                    })}
                                </TextField>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  label="Cobrança"
                                  id="taxa"
                                  name="tarifa.taxa"
                                  required
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  inputProps={{
                                    maxLength: 18,
                                  }}
                                  value={maskRealMoney(
                                    formik.values.tarifa?.cobranca
                                  )}
                                  onChange={(e) => {
                                    formik.handleChange(e);
                                  }}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.tarifa?.cobranca &&
                                    Boolean(formik.errors.tarifa?.cobranca)
                                  }
                                  helperText={
                                    formik.touched.tarifa?.cobranca &&
                                    formik.errors.tarifa?.cobranca
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
                aria-controls="panel-content-adress-company"
                id="panel-header-adress-company"
              >
                <Typography className={classes.heading}>Adquirente</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid item lg={5} md={8}>
                  <Grid container direction="column" spacing={spaceColumn}>
                    <Grid item>
                      <Typography>Dados</Typography>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <TextField
                            id="estabelecimento"
                            variant="outlined"
                            name="usuario.terminal"
                            label="Terminal (mid)"
                            size="small"
                            disabled
                            name="usuario.numero_estabelecimento"
                            label="Núm. do estabelecimento"
                            value={
                              formik.values.usuario?.numero_estabelecimento
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.usuario?.numero_estabelecimento &&
                              Boolean(
                                formik.errors.usuario?.numero_estabelecimento
                              )
                            }
                            helperText={
                              formik.touched.usuario?.numero_estabelecimento &&
                              formik.errors.usuario?.numero_estabelecimento
                            }
                            fullWidth
                            // required
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <TextField
                            id="mid"
                            variant="outlined"
                            name="usuario.terminal"
                            label="Terminal (mid)"
                            size="small"
                            disabled
                            value={formik.values.usuario?.terminal}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.usuario?.terminal &&
                              Boolean(formik.errors.usuario?.terminal)
                            }
                            helperText={
                              formik.touched.usuario?.terminal &&
                              formik.errors.usuario?.terminal
                            }
                            fullWidth
                            // required
                          />
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
