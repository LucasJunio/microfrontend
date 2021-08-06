import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Backdrop,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import sha256 from "crypto-js/sha256";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import logo from "../../assets/images/logo_vileve_way.png";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { signin } from "../../services/api/api";
import { useDispatch, useSelector } from "react-redux";

import {
  signupRequest,
  signupSuccess,
} from "../../store/modules/signup/actions";
import { signInSuccess } from "../../store/modules/signin/actions";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://vileve.com.br/">
        Vileve
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Não é um email valido")
      .required("O campo email é obrigatório"),
    password: yup.string().required("O campo senha é obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      const body = {
        email,
        // senha: sha256(password).toString().trim(),
        senha: password,
      };
      console.log(body);
      setOpenBackDrop(true);

      await signin(body)
        .then((res) => {
          setTimeout(() => {
            setOpenBackDrop(false);
            localStorage.setItem("token", res.token);
            enqueueSnackbar(res.message, {
              variant: "success",
            });

            dispatch(signupSuccess());
            history.push("/");
          }, 1500);
        })
        .catch((error) => {
          setOpenBackDrop(false);
          enqueueSnackbar(`${error}`, { variant: "error" });
        });
    },
  });

  const handleRegiterLink = () => {
    history.push("/signup");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Backdrop className={classes.backdrop} open={openBackDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} className={classes.logo} alt="logotipo vileve way" />
        {/* <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar> */}
        {/* <Typography component="h1" variant="h5">
          Vileve Gateway
        </Typography> */}
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.password)}
            helperText={formik.errors.password}
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar-me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" onClick={handleRegiterLink} variant="body2">
                Não tem uma conta? Cadastre-se
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
