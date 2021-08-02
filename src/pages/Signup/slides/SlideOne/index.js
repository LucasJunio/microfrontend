import React, { useState } from "react";
import {
  Grid,
  Hidden,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

import { ArrowForward, Visibility, VisibilityOff } from "@material-ui/icons";
import Button from "../../../../components/CustomButtons/Button";

import manPc from "../../../../assets/images/register.png";
import { useStyles } from "../../styles";


export const SlideOne = ({ nextStep, formik }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid item xs={12} md={12}>
      <Grid container justify="center" alignItems="center">
        <Hidden only={["xs", "sm"]}>
          <Grid item md={6}>
            <Grid container justify="center" alignItems="center">
              <img src={manPc} className={classes.manPc} alt="logotipo" />
            </Grid>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={6}>
          <div className={classes.divCentralization}>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12} sm={12}>
                <Grid container>
                  <Grid item>
                    <Typography
                      variant="body1"
                      gutterBottom
                      className={classes.label}
                    >
                      Informe os dados de{" "}
                      <span className={classes.labelUser}>Usuário</span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="nome"
                  name="nome"
                  label="NOME COMPLETO"
                  value={formik.values.nome}
                  onChange={formik.handleChange}
                  fullWidth
                  required
                  error={Boolean(formik.errors.nome)}
                  helperText={formik.errors.nome}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="email"
                  name="email"
                  label="EMAIL"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  fullWidth
                  required
                  error={Boolean(formik.errors.email)}
                  helperText={formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="senha"
                  name="senha"
                  label="SENHA"
                  value={formik.values.senha}
                  error={Boolean(formik.errors.senha)}
                  helperText={formik.errors.senha}
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="senha2"
                  name="senha2"
                  label="CONFIRME SUA SENHA"
                  value={formik.values.senha2}
                  error={Boolean(formik.errors.senha2)}
                  helperText={formik.errors.senha2}
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item>
                    <Button
                      color="primary"
                      size="sm"
                      id="BTNFIRSTNEXT"
                      rel="noopener noreferrer"
                      onClick={() => {
                        nextStep();
                      }}
                      className={classes.btnStepPostion}
                    >
                      Próximo
                      <ArrowForward className={classes.arrowIconNext} />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};
