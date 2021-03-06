import "@fontsource/roboto";
import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { CustomTabs } from "../../components/CustomTabs";
import {
  Backdrop,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Container,
  Tab,
  Box,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import TabPanel from "./TabPanel";
import { useHistory } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { SlideOne } from "./slides/SlideOne/index";
import { SlideTwo } from "./slides/SlideTwo/index";
import { SlideThree } from "./slides/SlideThree/index";
import { SlideFour } from "./slides/SlideFour/index";
import { SlideFive } from "./slides/SlideFive/index";
import { SlideSix } from "./slides/SlideSix/index";
import { SlideSeven } from "./slides/SlideSeven";
import { SlideEight } from "./slides/SlideEight";
import PropTypes from "prop-types";
import logo from "../../assets/images/logo_vileve_way.png";
import sha256 from "crypto-js/sha256";
import { useStyles } from "./styles";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import "./stylepagination.scss";
import { maskNumber, formatDate } from "../../utils/string/masks";
import { validateCpf } from "../../utils/string/validateCpf";
import { createCnpj, createPf } from "store/ducks/Signup";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function SectionCarousel() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const { message, status } = useSelector((state) => state.signup);
  const dotActive = "pagination__link";
  const dotInactive = "pagination__link is_active";
  const [dot1, setDOT1] = useState(dotInactive);
  const [dot2, setDOT2] = useState(dotInactive);
  const [dot3, setDOT3] = useState(dotInactive);
  const [dot4, setDOT4] = useState(dotInactive);
  const [dot5, setDOT5] = useState(dotInactive);
  const [dot6, setDOT6] = useState(dotInactive);
  const [dot7, setDOT7] = useState(dotInactive);
  const [open, setOpen] = useState(false);
  const [isCnpj, setIsCnpj] = useState(false);
  const [showDot, setShowDot] = useState(false);
  const [value, setValue] = useState(0);

  const elevation = 5;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const validationSchema = yup.object({
    nome: yup
      .string()
      .required("Nome ?? obrigat??rio")
      .matches(/^[aA-zZ??????????????????????????????????????????????????????????????\s]+$/, "Somente letras")
      .min(10, "Nome completo deve conter no minimo 10 caract??ries")
      .max(40, "M??ximo de 40 caract??ries")
      .trim(),
    email: yup
      .string()
      .trim()
      .email("N??o ?? um e-mail v??lido")
      .required("Favor informar e-mail")
      .trim(),
    senha: yup
      .string()
      .required("Por favor, insira sua senha")
      .matches(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
        `A senha deve conter m??nimo de oito caracteres, pelo menos, uma letra mai??scula, uma letra min??scula, n??meros e um caractere especial`
      )
      .trim(),
    senha2: yup
      .string()
      .oneOf([yup.ref("senha")], "A senha n??o confere")
      .required("Por favor, insira a senha")
      .trim(),
    cpf: yup.string().required("CPF ?? obrigat??rio").trim(),
    celular: yup.string().required("O campo celular ?? obrigat??rio").trim(),
    nascimento: yup
      .string()
      .required("Data de nascimento ?? obrigat??ria")
      .trim()
      .nullable(),
    naturalidade: yup
      .string()
      .required("O campo naturalidade ?? obrigat??rio")
      .trim(),
    nacionalidade: yup.string().required("O campo nacionalidade ?? obrigat??rio"),
    estado_civil: yup.string().required("O campo estado civil ?? obrigat??rio"),
    rg: yup
      .string()
      .required("O campo RG ?? obrigat??rio")
      .trim()
      .min(5, "Rg deve ter no minimo 5 caracteries"),
    emissor: yup.string().required("O campo emissor ?? obrigat??rio").trim(),
    emissao: yup.string().required("O campo emissao ?? obrigat??rio").nullable(),
    sexo: yup.string().required("O campo sexo ?? obrigat??rio"),
    mae: yup.string().required("Campo m??e ?? obrigat??rio").trim(),
    pai: yup.string().required("Campo pai ?? obrigat??rio").trim(),
    cep: yup.string().required("O campo CEP ?? obrigat??rio"),
    endereco: yup.string().required("O campo endere??o ?? obrigat??rio").trim(),
    numero: yup.string().required("O campo n??mero ?? obrigat??rio").trim(),
    bairro: yup.string().required("O campo bairro ?? obrigat??rio").trim(),
    cidade: yup.string().required("O campo cidade ?? obrigat??rio").trim(),
    estado: yup.string().required("O campo estado ?? obrigat??rio").trim(),

    cepPf: yup.string().required("O campo CEP ?? obrigat??rio"),
    enderecoPf: yup.string().required("O campo endere??o ?? obrigat??rio").trim(),
    numeroPf: yup.string().required("O campo n??mero ?? obrigat??rio").trim(),
    bairroPf: yup.string().required("O campo bairro ?? obrigat??rio").trim(),
    cidadePf: yup.string().required("O campo cidade ?? obrigat??rio").trim(),
    estadoPf: yup.string().required("O campo estado ?? obrigat??rio").trim(),

    cnpj: yup.string().required("Campo CNPJ ?? obrigat??rio"),
    nome_fantasia: yup
      .string()
      .required("Campo nome fantasia ?? obrigat??rio")
      .trim(),
    telefone: yup.string().required("Campo telefone ?? obrigat??rio"),
    razaosocial: yup
      .string()
      .required("Campo Raz??o Social ?? obrigat??rio")
      .trim(),
    cnae: yup.number().required("Campo CNAE ?? obrigat??rio"),
    ceppj: yup.number().required("Campo CEP ?? obrigat??rio"),
    enderecopj: yup.string().required("Campo Endere??o ?? obrigat??rio").trim(),
    numeropj: yup.number().required("Campo n??mero ?? obrigat??rio"),
    bairropj: yup.string().required("Campo Bairro ?? obrigat??rio").trim(),
    cidadepj: yup.string().required("Campo cidade ?? obrigat??rio").trim(),
    estadopj: yup.string().required("Campo estado ?? obrigat??rio").trim(),
    bancopj: yup.string().required("Campo banco ?? obrigat??rio"),
    agenciapj: yup
      .number()
      .typeError("Agencia deve ser n??mero")
      .required("Campo ag??ncia ?? obrigat??rio"),
    contapj: yup.number().required("Campo conta ?? obrigat??rio"),
    site: yup
      .string()
      .required("Campo Site ?? obrigat??rio")
      .url("Insira um site valido ex: 'https://www.google.com'"),
    cpfPf: yup.string().required("CPF ?? obrigat??rio").trim(),
    celularPf: yup.string().required("O campo celular ?? obrigat??rio").trim(),
    nascimentoPf: yup
      .string()
      .required("Data de nascimento ?? obrigat??ria")
      .trim()
      .nullable(),
    naturalidadePf: yup
      .string()
      .required("O campo naturalidade ?? obrigat??rio")
      .trim(),
    nacionalidadePf: yup
      .string()
      .required("O campo nacionalidade ?? obrigat??rio"),
    estadoCivilPf: yup.string().required("O campo estado civil ?? obrigat??rio"),
    rgPf: yup
      .string()
      .required("O campo RG ?? obrigat??rio")
      .trim()
      .min(5, "Rg deve ter no minimo 5 caracteries"),
    emissorPf: yup.string().required("O campo emissor ?? obrigat??rio").trim(),
    emissaoPf: yup
      .string()
      .required("O campo emissao ?? obrigat??rio")
      .nullable(),
    sexoPf: yup.string().required("O campo sexo ?? obrigat??rio"),
    maePf: yup.string().required("Campo m??e ?? obrigat??rio").trim(),
    paiPf: yup.string().required("Campo pai ?? obrigat??rio").trim(),
    sitePf: yup
      .string()
      .required("Campo Site ?? obrigat??rio")
      .url("Insira um site valido ex: 'https://www.google.com'"),
  });

  useEffect(() => {
    if (status === "loading") {
      setOpen(true);
    } else if (status === "completed") {
      setOpen(false);
      enqueueSnackbar(message, {
        variant: "success",
      });
      history.push("/documents");
    } else if (status === "failed") {
      setOpen(false);
      enqueueSnackbar(message, {
        variant: "error",
      });
    }
    return () => {};
  }, [status, message]);

  useEffect(() => {
    return () => {};
  });

  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      senha: "",
      senha2: "",
      cpf: "",
      celular: "",
      nascimento: "",
      naturalidade: "",
      nacionalidade: "",
      sexo: "",
      estado_civil: "",
      rg: "",
      emissor: "",
      emissao: "",
      sexo: "",
      mae: "",
      pai: "",
      cpfPf: "",
      celularPf: "",
      nascimentoPf: "",
      naturalidadePf: "",
      nacionalidadePf: "",
      sexoPf: "",
      estadoCivilPf: "",
      rgPf: "",
      emissorPf: "",
      emissaoPf: "",
      sexoPf: "",
      maePf: "",
      paiPf: "",
      sitePf: "",
      cepPf: "",
      enderecoPf: "",
      numeroPf: "",
      bairroPf: "",
      complementoPf: "",
      cidadePf: "",
      estadoPf: "",
      cep: "",
      endereco: "",
      numero: "",
      bairro: "",
      complemento: "",
      cidade: "",
      estado: "",
      cnpj: "",
      telefone: "",
      site: "",
      razaosocial: "",
      cnae: "",
      nome_fantasia: "",
      ceppj: "",
      enderecopj: "",
      numeropj: "",
      bairropj: "",
      cidadepj: "",
      complementopj: "",
      cidadepj: "",
      estadopj: "",
      bancopj: "",
      agenciapj: "",
      contapj: "",
      operacaopj: "",
      pixpj: "",
    },
    validationSchema,
    onSubmit: (values) => {},
  });

  const handleBackdrop = (isOpen) => {
    setOpen(isOpen);
  };

  const Step1NEXT = () => {
    if (
      !!formik.errors.nome ||
      !!formik.errors.email ||
      !!formik.errors.senha ||
      !!formik.errors.senha2
    ) {
      enqueueSnackbar("Preencha todos os campos como nas instru????es", {
        variant: "error",
      });
    } else {
      if (
        !!formik.values.nome &&
        !!formik.values.email &&
        !!formik.values.senha &&
        !!formik.values.senha2
      ) {
        setValue(1);
      } else {
        enqueueSnackbar("Campos obrigat??rios n??o preenchidos", {
          variant: "error",
        });
      }
    }
  };

  const Step2PJ = () => {
    setValue(2);
    setIsCnpj(true);
    setShowDot(true);
    setDOT1(dotActive);
  };

  const Step2PF = () => {
    setValue(6);
    setIsCnpj(false);
    setShowDot(true);
    setDOT5(dotActive);
  };

  const Step3NEXT = () => {
    if (validateCpf(formik.values.cpf)) {
      if (
        !!formik.values.celular &&
        !!formik.values.nascimento &&
        !!formik.values.naturalidade &&
        !!formik.values.nacionalidade &&
        !!formik.values.estado_civil &&
        !!formik.values.rg &&
        !!formik.values.emissor &&
        !!formik.values.emissao &&
        !!formik.values.sexo &&
        !!formik.values.mae &&
        !!formik.values.pai
      ) {
        setValue(3);
        setDOT1(dotInactive);
        setDOT2(dotActive);
      } else {
        enqueueSnackbar("Campos obrigat??rios n??o preenchidos", {
          variant: "error",
        });
      }
    } else {
      enqueueSnackbar("Desculpe, informe um cpf v??lido!", {
        variant: "error",
      });
    }
  };

  const Step4NEXT = () => {
    if (
      !!formik.values.cep &&
      !!formik.values.endereco &&
      !!formik.values.numero &&
      !!formik.values.bairro &&
      !!formik.values.cidade &&
      !!formik.values.estado
    ) {
      setValue(4);
      setDOT2(dotInactive);
      setDOT3(dotActive);
    } else {
      enqueueSnackbar("Campos obrigat??rios n??o preenchidos", {
        variant: "error",
      });
    }
  };

  const Step5NEXT = () => {
    if (
      !!formik.values.cnpj &&
      !!formik.values.telefone &&
      !!formik.values.razaosocial &&
      !!formik.values.cnae &&
      !!formik.values.nome_fantasia &&
      !!formik.values.ceppj &&
      !!formik.values.enderecopj &&
      !!formik.values.numeropj &&
      !!formik.values.bairropj &&
      !!formik.values.cidadepj &&
      !!formik.values.estadopj &&
      !!formik.values.site
    ) {
      setValue(5);
      setDOT3(dotInactive);
      setDOT4(dotActive);
    } else {
      enqueueSnackbar("Campos obrigat??rios n??o preenchidos", {
        variant: "error",
      });
    }
  };

  const Step7NEXT = () => {
    if (validateCpf(formik.values.cpfPf)) {
      if (
        !!formik.values.celularPf &&
        !!formik.values.nascimentoPf &&
        !!formik.values.naturalidadePf &&
        !!formik.values.nacionalidadePf &&
        !!formik.values.estadoCivilPf &&
        !!formik.values.rgPf &&
        !!formik.values.emissorPf &&
        !!formik.values.emissaoPf &&
        !!formik.values.sexoPf &&
        !!formik.values.maePf &&
        !!formik.values.paiPf &&
        !!formik.values.sitePf
      ) {
        setValue(7);
        setDOT5(dotInactive);
        setDOT6(dotActive);
      } else {
        enqueueSnackbar("Campos obrigat??rios n??o preenchidos", {
          variant: "error",
        });
      }
    } else {
      enqueueSnackbar("Desculpe, informe um cpf v??lido!", {
        variant: "error",
      });
    }
  };

  const Step8NEXT = () => {
    if (
      !!formik.values.cepPf &&
      !!formik.values.enderecoPf &&
      !!formik.values.numeroPf &&
      !!formik.values.bairroPf &&
      !!formik.values.cidadePf &&
      !!formik.values.estadoPf
    ) {
      setValue(8);
      setDOT6(dotInactive);
      setDOT7(dotActive);
    } else {
      enqueueSnackbar("Campos obrigat??rios n??o preenchidos", {
        variant: "error",
      });
    }
  };

  const Step2PREV = () => {
    setValue(0);
    setDOT2(dotInactive);
    setDOT1(dotActive);
  };

  const Step3PREV = () => {
    setValue(1);
    setIsCnpj(false);
    setShowDot(false);
    setDOT1(dotInactive);
    setDOT2(dotInactive);
    setDOT3(dotInactive);
    setDOT4(dotInactive);
  };

  const Step4PREV = () => {
    setValue(2);
    setDOT2(dotInactive);
    setDOT1(dotActive);
  };

  const Step5PREV = () => {
    setValue(3);
    setDOT3(dotInactive);
    setDOT2(dotActive);
  };

  const Step6PREV = () => {
    setValue(4);
    setDOT4(dotInactive);
    setDOT3(dotActive);
  };

  const Step7PREV = () => {
    setValue(1);
    setShowDot(false);
    setDOT5(dotInactive);
    setDOT6(dotInactive);
    setDOT7(dotInactive);
  };

  const Step8PREV = () => {
    setValue(6);
    setDOT6(dotInactive);
    setDOT5(dotActive);
  };

  const Step9PREV = () => {
    setValue(7);
    setDOT7(dotInactive);
    setDOT6(dotActive);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container direction="column" justify="center">
        <Grid item style={{ height: "80px" }}>
          <Grid container justifyContent="flex-start">
            <Grid item>
              <img src={logo} className={classes.logo} alt="logotipo"></img>
            </Grid>
          </Grid>
        </Grid>
        <form
          onSubmit={(e) => {
            const { values } = formik;
            if (
              !!formik.values.bancopj &&
              !!formik.values.agenciapj &&
              !!formik.values.contapj
            ) {
              let body = undefined;
              if (isCnpj) {
                body = {
                  usuario: {
                    nome: values.nome,
                    email: values.email,
                    senha: sha256(values.senha).toString().trim(),
                  },
                  pessoa: {
                    cpf: maskNumber(values.cpf),
                    celular: maskNumber(values.celular),
                    nascimento: formatDate(values.nascimento),
                    naturalidade: values.naturalidade,
                    nacionalidade: values.nacionalidade,
                    estado_civil: values.estado_civil,
                    rg: values.rg,
                    emissor: values.emissor,
                    emissao: formatDate(values.emissao),
                    sexo: values.sexo,
                    mae: values.mae,
                    pai: values.pai,
                  },
                  empresa: {
                    cnpj: maskNumber(values.cnpj),
                    cnae: values.cnae,
                    razao_social: values.razaosocial,
                    telefone_fixo: maskNumber(values.telefone),
                    celular: maskNumber(values.celular),
                    nome_fantasia: values.nome_fantasia,
                    site: values.site,
                  },
                  conta: {
                    banco: values.bancopj.toString(),
                    agencia: maskNumber(values.agenciapj),
                    conta: maskNumber(values.contapj),
                    operacao: maskNumber(values.operacaopj),
                    pix: values.pixpj,
                  },
                  endereco_cnpj: {
                    cep: maskNumber(values.cep),
                    complemento: values.complementopj,
                    endereco: values.enderecopj,
                    numero: maskNumber(values.numeropj),
                    bairro: values.bairropj,
                    cidade: values.cidadepj,
                    estado: values.estadopj,
                  },
                  endereco_cpf: {
                    cep: maskNumber(values.cep),
                    complemento: values.complemento,
                    endereco: values.endereco,
                    numero: values.numeropj,
                    bairro: values.bairro,
                    cidade: values.cidade,
                    estado: values.estado,
                  },
                };

                dispatch(createCnpj(body));
              } else {
                body = {
                  usuario: {
                    nome: values.nome,
                    email: values.email,
                    senha: sha256(values.senha).toString().trim(),
                  },
                  pessoa: {
                    cpf: maskNumber(values.cpfPf),
                    celular: maskNumber(values.celularPf),
                    nascimento: formatDate(values.nascimentoPf),
                    naturalidade: values.naturalidadePf,
                    nacionalidade: values.nacionalidadePf,
                    estado_civil: values.estadoCivilPf,
                    rg: values.rgPf,
                    emissor: values.emissorPf,
                    emissao: formatDate(values.emissaoPf),
                    sexo: values.sexoPf,
                    mae: values.maePf,
                    pai: values.paiPf,
                  },
                  conta: {
                    banco: values.bancopj.toString(),
                    agencia: maskNumber(values.agenciapj),
                    conta: maskNumber(values.contapj),
                    operacao: maskNumber(values.operacaopj),
                    pix: values.pixpj,
                  },
                  endereco_cpf: {
                    cep: maskNumber(values.cepPf),
                    complemento: values.complementoPf,
                    endereco: values.enderecoPf,
                    numero: values.numeroPf,
                    bairro: values.bairroPf,
                    cidade: values.cidadePf,
                    estado: values.estadoPf,
                  },
                };
                dispatch(createPf(body));
              }
            } else {
              enqueueSnackbar("Campos obrigat??rios n??o preenchidos", {
                variant: "error",
              });
            }
            formik.handleSubmit(e);
          }}
        >
          <Grid item xs={12} md={12} style={{ height: "30px" }}>
            <Box
              display="flex"
              justifyContent="flex-end"
              // m={1}
              p={1}
              // bgcolor="background.paper"
            >
              <CustomTabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                aria-label="Tabs Dot"
              >
                {isCnpj && showDot && (
                  <div>
                    <Tab
                      label=""
                      {...a11yProps(0)}
                      style={{ minWidth: "2px" }}
                      disabled
                    />
                    <Tab
                      label=""
                      {...a11yProps(1)}
                      style={{ minWidth: "2px" }}
                      disabled
                    />
                    <Tab
                      label={<a href="#" className={dot1} />}
                      {...a11yProps(2)}
                      style={{ minWidth: "2px" }}
                      disabled
                    />
                    <Tab
                      label={<a href="#" className={dot2} />}
                      {...a11yProps(3)}
                      style={{ minWidth: "2px" }}
                      disabled
                    />
                    <Tab
                      label={<a href="#" className={dot3} />}
                      {...a11yProps(4)}
                      style={{ minWidth: "2px" }}
                      disabled
                    />
                    <Tab
                      label={<a href="#" className={dot4} />}
                      {...a11yProps(5)}
                      style={{ minWidth: "2px" }}
                      disabled
                    />{" "}
                  </div>
                )}
                {!isCnpj && showDot && (
                  <div>
                    <Tab
                      label={<a href="#" className={dot5} />}
                      {...a11yProps(6)}
                      style={{ minWidth: "2px" }}
                      disabled
                    />
                    <Tab
                      label={<a href="#" className={dot6} />}
                      {...a11yProps(7)}
                      style={{ minWidth: "2px" }}
                      disabled
                    />

                    <Tab
                      label={<a href="#" className={dot7} />}
                      {...a11yProps(8)}
                      style={{ minWidth: "2px" }}
                      disabled
                    />
                  </div>
                )}
              </CustomTabs>
            </Box>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" justify="center">
              <Grid item xs={12} md={12} lg={12}>
                <div
                  style={{
                    transform: "scale(0.80)",
                    position: "sticky",
                    height: 300,
                  }}
                >
                  <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                  >
                    <TabPanel value={value} index={0}>
                      <Card elevation={elevation}>
                        <CardContent>
                          <SlideOne nextStep={Step1NEXT} formik={formik} />
                        </CardContent>
                      </Card>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <Card elevation={elevation}>
                        <CardContent>
                          <SlideTwo
                            nextStep={Step2PJ}
                            StepPF={Step2PF}
                            previousStep={Step2PREV}
                          />
                        </CardContent>
                      </Card>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <Card elevation={elevation}>
                        <CardContent>
                          <SlideThree
                            nextStep={Step3NEXT}
                            previousStep={Step3PREV}
                            formik={formik}
                          />
                        </CardContent>
                      </Card>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                      <Card elevation={elevation}>
                        <CardContent>
                          <SlideFour
                            nextStep={Step4NEXT}
                            previousStep={Step4PREV}
                            formik={formik}
                            waitCep={handleBackdrop}
                          />
                        </CardContent>
                      </Card>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                      <Card elevation={elevation}>
                        <CardContent>
                          <SlideFive
                            nextStep={Step5NEXT}
                            previousStep={Step5PREV}
                            formik={formik}
                            waitCnpj={handleBackdrop}
                          />
                        </CardContent>
                      </Card>
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                      <Card elevation={elevation}>
                        <CardContent>
                          <SlideSix previousStep={Step6PREV} formik={formik} />
                        </CardContent>
                      </Card>
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                      <Card elevation={elevation}>
                        <CardContent>
                          <SlideSeven
                            nextStep={Step7NEXT}
                            previousStep={Step7PREV}
                            formik={formik}
                          />
                        </CardContent>
                      </Card>
                    </TabPanel>
                    <TabPanel value={value} index={7}>
                      <Card elevation={elevation}>
                        <CardContent>
                          <SlideEight
                            nextStep={Step8NEXT}
                            previousStep={Step8PREV}
                            formik={formik}
                            waitCep={handleBackdrop}
                          />
                        </CardContent>
                      </Card>
                    </TabPanel>
                    <TabPanel value={value} index={8}>
                      <Card elevation={elevation}>
                        <CardContent>
                          <SlideSix previousStep={Step9PREV} formik={formik} />
                        </CardContent>
                      </Card>
                    </TabPanel>
                  </SwipeableViews>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}
