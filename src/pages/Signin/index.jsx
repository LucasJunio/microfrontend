import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CssBaseline,
  TextField,
  Slide,
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
import { signin, sendEmailRecovery } from "../../store/ducks/Signer";
import { useDispatch, useSelector } from "react-redux";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignIn() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const state = useSelector((state) => state);

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
    onSubmit: ({ email, password }) => {
      const body = {
        email,
        // senha: sha256(password).toString().trim(),
        senha: sha256(password).toString().trim(),
      };
      dispatch(signin(body));
    },
  });

  useEffect(() => {
    if (state.signer.status === "completed") {
      setOpen(false);
      enqueueSnackbar(state.signer.message, {
        variant: state.signer.statusMessage,
      });
      if(state.signer.signed) {
        history.push("/");
      }

    } else if (state.signer.status === "loading") {
      setOpen(true);
    } else if (state.signer.status === "failed") {
      setOpen(false);
      enqueueSnackbar(state.signer.message, {
        variant: "error",
      });
    }
  }, [state.signer.status, state.signer.message]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSend = () => {
    const body = {
      email: formik.values.email, 
      product: "sb-vilevewayclient"
    };
    dispatch(sendEmailRecovery(body));
    setOpenDialog(false);
    setOpen(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="primary" />
      </Backdrop>

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Esqueci a senha"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Digite seu e-mail de cadastro abaixo e clique em enviar. <br /> Nós
            lhe enviaremos um e-mail com link para recadastrar sua senha.
            <TextField
              margin="normal"
              fullWidth
              id="outlined-required"
              label="Email"
              name="email"
              autoComplete="email"
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSend}>Enviar</Button>
        </DialogActions>
      </Dialog>

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
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            onBlur={formik.handleBlur}
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
              <Link href="#" variant="body2" onClick={handleClickOpen}>
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
