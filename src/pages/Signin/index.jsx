import React, { useState, useEffect } from "react";
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
// import { signin } from "../../services/api/api";
import { useDispatch, useSelector } from "react-redux";

// import {
//   signupRequest,
//   signupSuccess,
// } from "../../store3/modules/signup/actions";
// import { signInSuccess } from "../../store3/modules/signin/actions";
import { signin } from "../../store/ducks/Signer/index";
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

  const [open, setOpen] = useState(false);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const state = useSelector((state) => {
    return state;
  });

  const signinStatus = state.signer.status;
  const message = state.signer.message;

  useEffect(() => {
    if (signinStatus === "completed") {
      setOpen(false);
      enqueueSnackbar(message, {
        autoHideDuration: 2000,
        variant: "success",
      });
      history.push("/");
    } else if (signinStatus === "loading") {
      setOpen(true);
    } else if (signinStatus === "failed") {
      setOpen(false);
      enqueueSnackbar(message, {
        variant: "error",
      });
    }
  }, [signinStatus, message]);

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
      email: "lucas.verdine41@gmail.com",
      password: "7e882f971",
    },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      const body = {
        email,
        senha: sha256(password).toString().trim(),
      };
      console.log(body);
      setOpenBackDrop(true);
      dispatch(signin(body));
    },
  });

  const handleRegiterLink = () => {
    history.push("/signup");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} className={classes.logo} alt="logotipo vileve way" />
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
            inputProps={{ tabIndex: "1" }}
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
            inputProps={{ tabIndex: "2" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    inputProps={{ tabIndex: "4" }}
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
            control={<Checkbox value="remember" color="primary" tabIndex="5" />}
            label="Lembrar-me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            tabIndex="3"
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
              <Link href="/signup" variant="body2">
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
