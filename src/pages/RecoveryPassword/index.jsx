import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
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
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { maskCpf, maskCel } from "../../utils/string/masks";
import { recoveryPassword } from "../../store/ducks/Signer";
import { useParams } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RecoveryPassword() {
  const { base64 } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const state = useSelector((state) => state);
  const decodedData = Buffer.from(base64, "base64");

  const validationSchema = yup.object({
    password: yup
      .string()
      .required("O campo senha é obrigatório")
      .matches(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
        `A senha deve conter mínimo de oito caracteres, pelo menos, uma letra maiúscula, uma letra minúscula, números e um caractere especial`
      )
      .trim(),
    confirmPassword: yup
      .string()
      .required("O campo confirmação de senha é obrigatório")
      .oneOf([yup.ref("password"), null], "Senhas devem ser iguais."),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async ({
      password,
      confirmPassword,
    }) => {
      const body = {
        id : JSON.parse(decodedData).id,
        password: sha256(password).toString().trim(),
        product: "vilevewayclient"        
      };
      dispatch(await recoveryPassword(body));
    },
  });

  useEffect(() => {
    if (state.signer.status === "completed") {
      setOpen(false);

      if (state.signer.statusMessage === "success" && state.signer.type === "recoveryPassword") {
        setOpenDialog(true);
      }
      enqueueSnackbar(state.signer.message, {
        variant: state.signer.statusMessage,
      });
    } else if (state.signer.status === "loading") {
      setOpen(true);
    } else if (state.signer.status === "failed") {
      setOpen(false);
      enqueueSnackbar(state.signer.message, {
        variant: state.signer.statusMessage,
      });
    }
  }, [state.signer.status]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRedirect = () => {
    history.push("/signin");
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
          {"Solicitação de recuperação de senha efetuada:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {state.signer.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRedirect} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <CssBaseline />

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Recuperar senha:
        </Typography>

        <form className={classes.form} onSubmit={formik.handleSubmit}>
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            onBlur={formik.handleBlur}
            label="Senha"
            type={showPassword ? "text" : "password"}
            id="password"
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

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            onBlur={formik.handleBlur}
            label="Confirmação de senha"
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            autoComplete="current-password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Concluir
          </Button>
        </form>
      </div>
    </Container>
  );
}
