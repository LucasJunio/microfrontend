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
  console.log(dataUser);
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
      console.log(values);
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
                  Sensedia
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
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  label="Client ID"
                                  id="client_id"
                                  name="usuario.client_id"
                                  required
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={formik.values.usuario?.client_id}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.usuario?.client_id &&
                                    Boolean(formik.errors.usuario?.client_id)
                                  }
                                  helperText={
                                    formik.touched.usuario?.client_id &&
                                    formik.errors.usuario?.client_id
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  label="Client Secret"
                                  id="cliente_secret"
                                  name="usuario.cliente_secret"
                                  required
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={formik.values.usuario?.cliente_secret}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.usuario?.cliente_secret &&
                                    Boolean(
                                      formik.errors.usuario?.cliente_secret
                                    )
                                  }
                                  helperText={
                                    formik.touched.usuario?.cliente_secret &&
                                    formik.errors.usuario?.cliente_secret
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
                                  label="Base 64"
                                  id="base_64"
                                  name="usuario.base_64"
                                  required
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  multiline
                                  rows={10}
                                  value={formik.values.usuario?.base_64}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.usuario?.base_64 &&
                                    Boolean(formik.errors.usuario?.base_64)
                                  }
                                  helperText={
                                    formik.touched.usuario?.base_64 &&
                                    formik.errors.usuario?.base_64
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
