import React from "react";
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
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import countries from "../../../../utils/data/countries";
import { ExpandMore } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";

const Form = () => {
  const classes = useStyles();
  const spaceColumn = 2;
  const elevetionAccordion = 3;

  const handleNationality = (event, value) => {
    console.log(event);
    // formik.setFieldValue("nacionalidade", value);
  };

  return (
    <div className={classes.root}>
      <br />
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
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            id="sexo"
                            name="sexo"
                            label="Sexo"
                            variant="outlined"
                            size="small"
                            fullWidth
                            select
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
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <Autocomplete
                            options={countries}
                            getOptionLabel={(option) => option}
                            id="nacionalidade"
                            onChange={handleNationality}
                            // value={formik.values.nacionalidade}
                            disableCloseOnSelect
                            noOptionsText={"País não encontrado"}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className={classes.fieldCentralization}
                                label="NACIONALIDADE"
                                name="nacionalidade"
                                margin="normal"
                                size="small"
                                variant="outlined"
                                // onBlur={formik.handleBlur}
                                // error={
                                //   formik.touched.nacionalidade &&
                                //   Boolean(formik.errors.nacionalidade)
                                // }
                                // helperText={
                                //   formik.touched.nacionalidade &&
                                //   formik.errors.nacionalidade
                                // }
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
                            label="Naturalidade"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            id="estadoCivil"
                            name="estadoCivil"
                            label="Estado Civil"
                            variant="outlined"
                            size="small"
                            fullWidth
                            select
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
                            label="Nome da Mãe"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            label="Nome do Pai"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <TextField
                            label="Email"
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
                      <Typography>Documentos</Typography>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            label="RG"
                            variant="outlined"
                            size="small"
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
                          />
                        </Grid>
                        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                          <TextField
                            label="Número"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                          <TextField
                            label="Completo"
                            variant="outlined"
                            size="small"
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
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            label="Cidade"
                            variant="outlined"
                            size="small"
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
                          />
                        </Grid>
                        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                          <TextField
                            label="Número"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                          <TextField
                            label="Completo"
                            variant="outlined"
                            size="small"
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
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            label="Cidade"
                            variant="outlined"
                            size="small"
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
    </div>
  );
};

export default Form;
