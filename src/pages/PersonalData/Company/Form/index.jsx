import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { ExpandMore } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { userById, editUser } from "../../../../store/ducks/User";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import validationSchema from "./validateSchema";
import { maskCnpj, maskTellPhone, maskCel } from "utils/string/masks";
import { clearUser } from "../../../../store/ducks/User";

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

  useEffect(async () => {
    await dispatch(clearUser());
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
  }, [type]);

  const formik = useFormik({
    initialValues: {
      ...dataUser,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      delete values.tarifa;
      delete values.usuario;
      delete values.pessoa;
      delete values.conta;
      delete values.endereco_cpf;
      dispatch(editUser(values));
    },
  });

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
                  Pessoa Jurídica
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container justifyContent="space-between">
                      <Grid item lg={7}>
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
                                  label="CPNJ"
                                  id="cnpj"
                                  name="empresa.cnpj"
                                  required
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={maskCnpj(formik.values.empresa?.cnpj)}
                                  onChange={() => {
                                    formik.setFieldValue("empresa.cnpj", value);
                                  }}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.empresa?.cnpj &&
                                    Boolean(formik.errors.empresa?.cnpj)
                                  }
                                  helperText={
                                    formik.touched.empresa?.cnpj &&
                                    formik.errors.empresa?.cnpj
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  label="Razão Social"
                                  id="razao_social"
                                  name="empresa.razao_social"
                                  required
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={formik.values.empresa?.razao_social}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.empresa?.razao_social &&
                                    Boolean(formik.errors.empresa?.razao_social)
                                  }
                                  helperText={
                                    formik.touched.empresa?.razao_social &&
                                    formik.errors.empresa?.razao_social
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  label="Nome Fantasia"
                                  id="nome_fantasia"
                                  name="empresa.nome_fantasia"
                                  required
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={formik.values.empresa?.nome_fantasia}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.empresa?.nome_fantasia &&
                                    Boolean(
                                      formik.errors.empresa?.nome_fantasia
                                    )
                                  }
                                  helperText={
                                    formik.touched.empresa?.nome_fantasia &&
                                    formik.errors.empresa?.nome_fantasia
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  label="CNAE"
                                  id="cnae"
                                  name="empresa.cnae"
                                  required
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={formik.values.empresa?.cnae}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.empresa?.cnae &&
                                    Boolean(formik.errors.empresa?.cnae)
                                  }
                                  helperText={
                                    formik.touched.empresa?.cnae &&
                                    formik.errors.empresa?.cnae
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  id="telefone_fixo"
                                  name="empresa.telefone_fixo"
                                  label="Telefone Fixo"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  required
                                  value={maskTellPhone(
                                    formik.values.empresa?.telefone_fixo
                                  )}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.empresa?.telefone_fixo &&
                                    Boolean(
                                      formik.errors.empresa?.telefone_fixo
                                    )
                                  }
                                  helperText={
                                    formik.touched.empresa?.telefone_fixo &&
                                    formik.errors.empresa?.telefone_fixo
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <TextField
                                  id="celular"
                                  name="empresa.celular"
                                  label="Celular"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  required
                                  value={maskCel(
                                    formik.values.empresa?.celular
                                  )}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.empresa?.celular &&
                                    Boolean(formik.errors.empresa?.celular)
                                  }
                                  helperText={
                                    formik.touched.empresa?.celular &&
                                    formik.errors.empresa?.celular
                                  }
                                ></TextField>
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
                                  id="site"
                                  name="empresa.site"
                                  label="Site"
                                  variant="outlined"
                                  size="small"
                                  disabled
                                  fullWidth
                                  required
                                  value={formik.values.empresa?.site}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.empresa?.site &&
                                    Boolean(formik.errors.empresa?.site)
                                  }
                                  helperText={
                                    formik.touched.empresa?.site &&
                                    formik.errors.empresa?.site
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
                aria-controls="panel-content-adress-company"
                id="panel-header-adress-company"
              >
                <Typography className={classes.heading}>Endereço</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid item lg={5}>
                  <Grid container direction="column" spacing={spaceColumn}>
                    <Grid item>
                      <Typography>Endereço Pessoa Jurídica</Typography>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            id="cep-cnpj"
                            name="endereco_cnpj.cep"
                            label="CEP"
                            variant="outlined"
                            size="small"
                            disabled
                            inputProps={{ maxLength: 8 }}
                            fullWidth
                            value={formik.values.endereco_cnpj?.cep}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.endereco_cnpj?.cep &&
                              Boolean(formik.errors.endereco_cnpj?.cep)
                            }
                            helperText={
                              formik.touched.endereco_cnpj?.cep &&
                              formik.errors.endereco_cnpj?.cep
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={12} xl={6}>
                          <TextField
                            id="endereco-cnpf"
                            name="endereco_cnpj.endereco"
                            label="Endereço"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={formik.values.endereco_cnpj?.endereco}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.endereco_cnpj?.endereco &&
                              Boolean(formik.errors.endereco_cnpj?.endereco)
                            }
                            helperText={
                              formik.touched.endereco_cnpj?.endereco &&
                              formik.errors.endereco_cnpj?.endereco
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={5} lg={6} xl={6}>
                          <TextField
                            id="bairro-cnpf"
                            name="endereco_cnpj.bairro"
                            label="Bairro"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={formik.values.endereco_cnpj?.bairro}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.endereco_cnpj?.bairro &&
                              Boolean(formik.errors.endereco_cnpj?.bairro)
                            }
                            helperText={
                              formik.touched.endereco_cnpj?.bairro &&
                              formik.errors.endereco_cnpj?.bairro
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={6} xl={2}>
                          <TextField
                            id="numero-cnpf"
                            name="endereco_cnpj.numero"
                            label="Número"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={formik.values.endereco_cnpj?.numero}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.endereco_cnpj?.numero &&
                              Boolean(formik.errors.endereco_cnpj?.numero)
                            }
                            helperText={
                              formik.touched.endereco_cnpj?.numero &&
                              formik.errors.endereco_cnpj?.numero
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={12} xl={4}>
                          <TextField
                            id="complemento-cnpf"
                            name="endereco_cnpj.complemento"
                            label="Completo"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={formik.values.endereco_cnpj?.complemento}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.endereco_cnpj?.complemento &&
                              Boolean(formik.errors.endereco_cnpj?.complemento)
                            }
                            helperText={
                              formik.touched.endereco_cnpj?.complemento &&
                              formik.errors.endereco_cnpj?.complemento
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            id="estado-cnpf"
                            name="endereco_cnpj.estado"
                            label="Estado"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={formik.values.endereco_cnpj?.estado}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.endereco_cnpj?.estado &&
                              Boolean(formik.errors.endereco_cnpj?.estado)
                            }
                            helperText={
                              formik.touched.endereco_cnpj?.estado &&
                              formik.errors.endereco_cnpj?.estado
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            id="cidade-cnpf"
                            name="endereco_cnpj.cidade"
                            label="Cidade"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={formik.values.endereco_cnpj?.cidade}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.endereco_cnpj?.cidade &&
                              Boolean(formik.errors.endereco_cnpj?.cidade)
                            }
                            helperText={
                              formik.touched.endereco_cnpj?.cidade &&
                              formik.errors.endereco_cnpj?.cidade
                            }
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
