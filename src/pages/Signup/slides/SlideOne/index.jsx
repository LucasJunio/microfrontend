import React, { useState, useEffect } from "react";
import {
  Grid,
  Hidden,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";

import { ArrowForward, Visibility, VisibilityOff } from "@material-ui/icons";
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
  useEffect(() => {
    return () => {};
  });
  return (
    <Grid item xs={12} md={12}>
      <Grid container justifyContent="center" alignItems="center" spacing={5}>
        <Hidden only={["xs", "sm"]}>
          <Grid item md={6}>
            <Grid container justifyContent="center" alignItems="center">
              <img src={manPc} className={classes.manPc} alt="logotipo" />
            </Grid>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={6}>
          <div className={classes.divCentralization}>
            <Grid container direction="column" spacing={3}>
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
                  onChange={formik.handleChange}
                  value={formik.values.nome}
                  onBlur={formik.handleBlur}
                  error={formik.touched.nome && Boolean(formik.errors.nome)}
                  helperText={formik.touched.nome && formik.errors.nome}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="email"
                  name="email"
                  label="EMAIL"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="senha"
                  name="senha"
                  label="SENHA"
                  value={formik.values.senha}
                  onChange={formik.handleChange}
                  value={formik.values.senha}
                  onBlur={formik.handleBlur}
                  error={formik.touched.senha && Boolean(formik.errors.senha)}
                  helperText={formik.touched.senha && formik.errors.senha}
                  type={showPassword ? "text" : "password"}
                  required
                  fullWidth
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
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="senha2"
                  name="senha2"
                  label="CONFIRME SUA SENHA"
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  value={formik.values.senha2}
                  onBlur={formik.handleBlur}
                  error={formik.touched.senha2 && Boolean(formik.errors.senha2)}
                  helperText={formik.touched.senha2 && formik.errors.senha2}
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
                <Grid container justifyContent="flex-end" alignItems="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
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
