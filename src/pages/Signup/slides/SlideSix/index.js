import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Hidden,
  Typography,
  TextField,
  MenuItem,
} from "@material-ui/core";

import { ArrowBack, Save } from "@material-ui/icons";
import Button from "../../../../components/CustomButtons/Button";
import manPc from "../../../../assets/images/register.png";
import { useStyles } from "../../styles";

const bancos = [
  {
    numeroBanco: 104,
    nomeBanco: "Caixa Econômica Federal (104)",
  },
  {
    numeroBanco: 237,
    nomeBanco: "Banco Bradesco S.A (237)",
  },
  {
    numeroBanco: 33,
    nomeBanco: "Banco Santander (Brasil) S.A. (033)",
  },
  {
    numeroBanco: 341,
    nomeBanco: "Banco Itaú S.A. (341)",
  },
  {
    numeroBanco: 1,
    nomeBanco: "Banco do Brasil S.A. (001)",
  },
  {
    numeroBanco: 197,
    nomeBanco: "Stone (197)",
  },
  {
    numeroBanco: 77,
    nomeBanco: "Banco Inter (077)",
  },
  {
    numeroBanco: 748,
    nomeBanco: "Sicred (748)",
  },
  {
    numeroBanco: 136,
    nomeBanco: "Banco UNICRED (136)",
  },
  {
    numeroBanco: 756,
    nomeBanco: "Banco Cooperativo do Brasil S.A. – BANCOOB (756)",
  },
  {
    numeroBanco: 260,
    nomeBanco: "Nubank (260)",
  },
  {
    numeroBanco: 41,
    nomeBanco: "Banco do Estado do Rio Grande do Sul S.A. (041)",
  },
  {
    numeroBanco: 356,
    nomeBanco: "Banco Real S.A. (antigo) (356)",
  },
  {
    numeroBanco: 399,
    nomeBanco: "HSBC Bank Brasil S.A. – Banco Múltiplo (399)",
  },
  {
    numeroBanco: 422,
    nomeBanco: "Banco Safra S.A. (422)",
  },
  {
    numeroBanco: 453,
    nomeBanco: "Banco Rural S.A. (453)",
  },
  {
    numeroBanco: 633,
    nomeBanco: "Banco Rendimento S.A. (633)",
  },
  {
    numeroBanco: 652,
    nomeBanco: "Itaú Unibanco Holding S.A. (652)",
  },
  {
    numeroBanco: 745,
    nomeBanco: "Banco Citibank S.A. (745)",
  },
  {
    numeroBanco: 246,
    nomeBanco: "Banco ABC Brasil S.A. (246)",
  },
  {
    numeroBanco: 25,
    nomeBanco: "Banco Alfa S.A (025)",
  },
  {
    numeroBanco: 641,
    nomeBanco: "Banco Alvorada S.A. (641))",
  },
  {
    numeroBanco: 29,
    nomeBanco: "Banco Banerj S.A. (029)",
  },
  {
    numeroBanco: 38,
    nomeBanco: "Banco Banestado S.A. (038)",
  },
  {
    numeroBanco: 0,
    nomeBanco: "Banco Bankpar S.A. (000)",
  },
  {
    numeroBanco: 740,
    nomeBanco: "Banco Barclays S.A (740)",
  },
  {
    numeroBanco: 107,
    nomeBanco: "Banco BBM S.A. (107)",
  },
  {
    numeroBanco: 31,
    nomeBanco: "Banco Beg S.A (031)",
  },
  {
    numeroBanco: 96,
    nomeBanco: "Banco BM&F de Serviços de Liquidação e Custódia S.A (096)",
  },
  {
    numeroBanco: 318,
    nomeBanco: "Banco BMG S.A. (318)",
  },
  {
    numeroBanco: 752,
    nomeBanco: "Banco BNP Paribas Brasil S.A. (752)",
  },
  {
    numeroBanco: 248,
    nomeBanco: "Banco Boavista Interatlântico S.A. (248)",
  },
];

export const SlideSix = ({ nextStep, previousStep, submitForm, formik }) => {
  const classes = useStyles();
  const [isCaixa, setIsCaixa] = useState("hidden");

  const handleBank = (event) => {
    if (event.target.value === 104) {
      setIsCaixa("visible");
    } else {
      setIsCaixa("hidden");
    }
    formik.handleChange(event);
  };

  useEffect(() => {
    return () => {};
  });

  return (
    <Grid item md={12}>
      <div style={{ padding: 20 }}>
        <Grid container justify="center" alignItems="center">
          <Hidden only={["xs", "sm"]}>
            <Grid item md={6}>
              <Grid container justify="center" alignItems="center">
                <img src={manPc} className={classes.manPc} alt="logotipo" />
              </Grid>
            </Grid>
          </Hidden>
          <Grid item md={6}>
            <Grid container direction="column" spacing={7}>
              <Grid item>
                <Typography
                  variant="body1"
                  gutterBottom
                  className={classes.label}
                >
                  Ainda sobre o seu negócio, quais os{" "}
                  <span className={classes.labelUser}>
                    dados bancários da sua empresa?
                  </span>
                </Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      id="bancopj"
                      name="bancopj"
                      select
                      label="BANCO"
                      fullWidth
                      value={formik.values.bancopj}
                      onChange={handleBank}
                      required
                      error={Boolean(formik.errors.bancopj)}
                      helperText={formik.errors.bancopj}
                    >
                      {bancos.map(({ nomeBanco, numeroBanco }) => {
                        return (
                          <MenuItem key={numeroBanco} value={numeroBanco}>
                            {nomeBanco}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      id="agenciapj"
                      name="agenciapj"
                      label="AGÊNCIA"
                      value={formik.values.agenciapj}
                      onChange={formik.handleChange}
                      fullWidth
                      inputProps={{
                        maxLength: 14,
                      }}
                      required
                      error={Boolean(formik.errors.agenciapj)}
                      helperText={formik.errors.agenciapj}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      id="contapj"
                      name="contapj"
                      label="CONTA"
                      value={formik.values.contapj}
                      onChange={formik.handleChange}
                      fullWidth
                      required
                      error={Boolean(formik.errors.contapj)}
                      helperText={formik.errors.contapj}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Box visibility={isCaixa}>
                      <TextField
                        id="operacaopj"
                        name="operacaopj"
                        label="OPERAÇÃO"
                        value={formik.values.operacaopj}
                        onChange={formik.handleChange}
                        fullWidth
                        helperText="*Caso tenha conta na Caixa"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TextField
                      id="pixpj"
                      name="pixpj"
                      label="CHAVE PIX"
                      value={formik.values.pixpj}
                      onChange={formik.handleChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={12}>
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
                      id="BTNFIFTHNEXT"
                      size="sm"
                      rel="noopener noreferrer"
                      type="submit"
                      // onClick={() => Register()}
                    >
                      Salvar
                      <Save className={classes.saveIcon} />
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
