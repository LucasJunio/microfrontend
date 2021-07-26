import "@fontsource/roboto";
import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { useFormik } from "formik";
// react component for creating beautiful carousel
import { useSnackbar } from "notistack";
import Carousel from "react-slick";
import InputMask from "react-input-mask";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
  Grid,
  Hidden,
  Typography,
  TextField,
  Card as CardM,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

import {
  ArrowForward,
  ArrowBack,
  Save,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import Card from "components/Card/Card.js";
import bg_card_vileve from "../../assets/images/bg_card_assistencia.jpg";
import bg_card_gateway from "../../assets/images/bg_card_vilevepay.jpg";
import logo from "../../assets/images/logo_vileve_way.png";
import manPc from "../../assets/images/register.png";
import Button from "components/CustomButtons/Button.js";
import sha256 from "crypto-js/sha256";
import {
  ClassBackground,
  DescriptionText,
  Loading,
  Spinner,
  useStyles,
} from "./styles";
import * as yup from "yup";
import { getCountries } from "../../services/api/api";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { insertPersonRequest } from "../../store/modules/person/actions";
import {
  insertAddressCPFRequest,
  insertAddressCNPJRequest,
} from "../../store/modules/address/actions";
import { insertEnterpriseRequest } from "../../store/modules/enterprise/actions";
import { signupSuccess } from "../../store/modules/signup/actions";
import "./stylepagination.scss";
import {
  maskCpf,
  maskDate,
  maskCel,
  maskTellPhone,
  maskNumber,
} from "../../utils/string/masks";

import { validateCpf } from "../../utils/string/validateCpf";
export default function SectionCarousel() {
  const slickRef = useRef();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const dotActive = "pagination__link";
  const dotInactive = "pagination__link is_active";

  const [Showloading, setShowloading] = useState("none");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [cpf, setCPF] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [ColorInputClass, setColorInputClass] = useState(false);
  const [ColorInputClass2, setColorInputClass2] = useState(false);
  const [Iconsenha, setIconSenha] = useState("lock_Outline");
  const [cep, setCEP] = useState("");
  const [nascimento, setNASCIMENTO] = useState("");
  const [rg, setRG] = useState("");
  const [emissor, setEMISSOR] = useState("");
  const [emissao, setEMISSAO] = useState("");
  const [sexo, setSEXO] = useState("");
  const [endereco, setENDERECO] = useState("");
  const [numero, setNUMERO] = useState("");
  const [bairro, setBAIRRO] = useState("");
  const [complemento, setCOMPLEMENTO] = useState("");
  const [cidade, setCIDADE] = useState("");
  const [estado, setESTADO] = useState("");
  const [estado_civil, setESTADOCIVIL] = useState("");
  const [naturalidade, setNATURALIDADE] = useState("");
  const [nacionalidade, setNACIONALIDADE] = useState("");
  const [mae, setMAE] = useState("");
  const [pai, setPAI] = useState("");
  const [razaosocial, setRAZAOSOCIAL] = useState("");
  const [nome_fantasia, setNOMEFANTASIA] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [telefone, setTELEFONE] = useState("");
  const [site, setSITE] = useState("");
  const [ceppj, setCEPPJ] = useState("");
  const [cnae, setCNAE] = useState("");
  const [enderecopj, setENDERECOPJ] = useState("");
  const [numeropj, setNUMEROPJ] = useState("");
  const [bairropj, setBAIRROPJ] = useState("");
  const [estadopj, setESTADOPJ] = useState("");
  const [cidadepj, setCIDADEPJ] = useState("");
  const [complementopj, setCOMPLEMENTOPJ] = useState("");
  const [bancopj, setBANCOPJ] = useState("");
  const [agenciapj, setAGENCIAPJ] = useState("");
  const [contapj, setCONTAPJ] = useState("");
  const [pixpj, setPIXPJ] = useState("");
  const [operacaopj, setOPERACAOPJ] = useState("");
  const [countries, setCountries] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [dot1, setDOT1] = useState(dotActive);
  const [dot2, setDOT2] = useState(dotInactive);
  const [dot3, setDOT3] = useState(dotInactive);
  const [dot4, setDOT4] = useState(dotInactive);
  const [dot5, setDOT5] = useState(dotInactive);
  const [dot6, setDOT6] = useState(dotInactive);

  const validationSchema = yup.object({
    nome: yup
      .string()
      .trim()
      .required("Nome é obrigatório")
      .matches(/^[aA-zZ\s]+$/, "Somente letras"),
    email: yup
      .string()
      .trim()
      .email("Não é um e-mail válido")
      .required("Favor informar e-mail"),
    senha: yup
      .string()
      .required("Por favor, insira sua senha")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        `A senha deve conter mínimo de oito caracteres, pelo menos, uma letra maiúscula, uma letra minúscula, números e um caractere especial`
      ),
    senha2: yup
      .string()
      .oneOf([yup.ref("senha")], "A senha não confere")
      .required("Por favor, insira a senha"),
    cpf: yup.string().required("CPF é obrigatório"),
    nascimento: yup.string().required("Data de nascimento é obrigatória"),
    naturalidade: yup.string().required("O campo naturalidade é obrigatório"),
    nacionalidade: yup.string().required("O campo nacionalidade é obrigatório"),
    sexo: yup.string().required("O campo sexo é obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      nome,
      email,
      senha,
      senha2,
      cpf,
      celular,
      nascimento,
      naturalidade,
      nacionalidade,
      sexo,
      estado_civil,
      rg,
      emissor,
      emissao,
      sexo,
      mae,
      pai,
      cep,
      endereco,
      numero,
      bairro,
      complemento,
      cidade,
      estado,
      cnpj,
      telefone,
      site,
      razaosocial,
      cnae,
      nome_fantasia,
      ceppj,
      enderecopj,
      numeropj,
      bairropj,
      cidadepj,
      complementopj,
      cidadepj,
      estadopj,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const countriesNames = async () => {
      setCountries(await getCountries());
    };

    countriesNames();
  }, [countries]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    // fade:true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: false,
    autoplay: false,
    initialSlide: 0,
    touchMove: false,
    draggable: false,
    arrows: false,
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleName = (event) => {
    // let v = event.target.value;

    // setNome(v.replace(/[^a-zA-ZçÇ áéíóúÁÉÍÓÚ]/g, ""));

    // /^[\D]+[A-Za-z-ç.-á-é-í-ó-ú-Á-É-Í-Ó-Ú]+(\s*[A-Za-z-ç.-á-é-í-ó-ú-Á-É-Í-Ó-Ú]+)*$/.test(
    //   v
    // ) || v.length < 1
    //   ? $("#descriptionnome").html("")
    //   : $("#descriptionnome").html("Digite apenas letras no campo nome!");
    formik.handleChange(event);
  };

  const handleEmail = (event) => {
    // let v = event.target.value;
    // setEmail(v);
    // /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) || v.length < 1
    //   ? $("#descriptionemail").html("")
    //   : $("#descriptionemail").html("Digite um email válido");
    formik.handleChange(event);
  };

  const handleCellPhone = (v) => {
    setCelular(maskCel(v));
  };

  // const handleCPF = (event) => {
  //   // setCPF(maskCpf(event.target.value));
  //   formik.setFieldValue(event.target.id, maskCpf(event.target.value));
  //   console.log(
  //     formik.setFieldValue(event.target.id, maskCpf(event.target.value))
  //   );
  //   formik.handleChange(event);
  // };

  const handlePassword = (event) => {
    let v = event.target.value;
    setSenha(v);
    if (
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
        v
      )
    ) {
      setIconSenha("check_Outline");
      setColorInputClass(true);
      $("#descriptionpassword").html("");
    } else {
      setIconSenha("lock_Outline");
      setColorInputClass(false);
      $("#descriptionpassword").html(
        `A senha deve conter mínimo de oito caracteres, <br> pelo menos, uma letra maiúscula, uma letra minúscula, <br> números e um caractere especial`
      );
    }
    formik.handleChange(event);
  };

  const handleConfirmPassword = (v) => {
    setSenha2(v);
    if (senha == v) {
      setColorInputClass2(true);
      $("#descriptionpassword2").html("");
    } else {
      setColorInputClass2(false);
      $("#descriptionpassword2").html(
        `Sua senha não corresponde à anterior, verifique sua digitação!`
      );
    }
  };

  const handleCep = (event) => {
    setCEP(getCep(event.target.value));
    formik.handleChange(event);
  };

  // const OnchangeNASCIMENTO = (v) => {
  //   setNASCIMENTO(maskDate(v));
  // };

  const handleRg = (v) => {
    setRG(v);
  };

  const OnchangeEMISSOR = (v) => {
    setEMISSOR(v);
  };

  const OnchangeEMISSAO = (v) => {
    setEMISSAO(maskDate(v));
  };

  const OnchangeSEXO = (v) => {
    setSEXO(v);
  };

  const OnchangeENDERECO = (v) => {
    setENDERECO(v);
  };

  const handleNumber = (v) => {
    // setNUMERO(maskNumber(v));
  };

  const handleComplement = (v) => {
    setCOMPLEMENTO(v);
  };

  const handleCity = (v) => {
    setCIDADE(v);
  };

  const OnchangeESTADO = (v) => {
    setESTADO(v.replace(/[^a-zA-ZçÇ]/g, ""));
  };

  const OnchangeESTADOCIVIL = (v) => {
    setESTADOCIVIL(v);
  };

  // const handleNaturalness = (event) => {
  //   setNATURALIDADE(event.replace(/[^a-zA-ZçÇ]/g, ""));
  //   formik.handleChange(event);
  // };

  const OnchangeNACIONALIDADE = (v) => {
    setNACIONALIDADE(v.replace(/[^a-zA-ZçÇ]/g, ""));
  };

  const OnchangeMAE = (v) => {
    setMAE(v);
  };

  const OnchangePAI = (v) => {
    setPAI(v);
  };

  const OnchangeRAZAOSOCIAL = (v) => {
    setRAZAOSOCIAL(v);
  };

  const OnchangeNOMEFANTASIA = (v) => {
    setNOMEFANTASIA(v);
  };

  const handleCNPJ = (event) => {
    event.target.value;
    formik.handleChange(event);
  };

  const getCep = (v) => {
    v = v.replace(/\D/g, "");
    if (v.length >= 8) {
      setShowloading("");
      axios
        .get(`https://viacep.com.br/ws/${v}/json`)
        .then((res) => {
          setShowloading("none");
          formik.setFieldValue("endereco", res.data.logradouro);
          formik.setFieldValue("bairro", res.data.bairro);
          formik.setFieldValue("cidade", res.data.localidade);
          formik.setFieldValue("estado", res.data.uf);
        })
        .catch((error) => {
          setShowloading("none");
          alert(error.data);
        });
    } else {
      setShowloading("none");
      formik.setFieldValue("endereco", "");
      formik.setFieldValue("bairro", "");
      formik.setFieldValue("cidade", "");
      formik.setFieldValue("estado", "");
    }
    return v;
  };

  const getCnpj = (v) => {
    v = v.replace(/\D/g, "");
    if (v.length >= 14) {
      setShowloading("");
      axios
        .get(
          `https://consulta-empresa-cnpj-e-socios.p.rapidapi.com/cnpj/${v}`,
          {
            headers: {
              "x-rapidapi-key":
                "bdac259fe4msh125d80880f7225ap14cc31jsn0ee569b9cbfd",
              "x-rapidapi-host":
                "consulta-empresa-cnpj-e-socios.p.rapidapi.com",
            },
          }
        )
        .then((res) => {
          setShowloading("none");
          formik.setFieldValue("razaosocial", res.data.name);
          formik.setFieldValue("nomefantasia", res.data.alias);
          formik.setFieldValue("cidadepj", res.data.city);
          formik.setFieldValue("enderecopj", res.data.street);
          formik.setFieldValue("estadopj", res.data.state);
          formik.setFieldValue("numeropj", res.data.number);
          formik.setFieldValue("bairropj", res.data.neighborhood);
          formik.setFieldValue(
            "telefone",
            maskTellPhone(res.data.phone.phone_1)
          );
          formik.setFieldValue("ceppj", res.data.phone.zip_code);
          formik.setFieldValue("cnae", res.data.legal_nature.code);
          // setRAZAOSOCIAL(res.data.name);
          // setNOMEFANTASIA(res.data.alias);
          // setCIDADEPJ(res.data.address.city);
          // setENDERECOPJ(res.data.address.street);
          // setESTADOPJ(res.data.address.state);
          // setNUMEROPJ(res.data.address.number);
          // setBAIRROPJ(res.data.address.neighborhood);
          // setTELEFONE(maskTellPhone(res.data.phone.phone_1));
          // setCEPPJ(res.data.address.zip_code);
          // setCNAE(res.data.legal_nature.code);
        })
        .catch((error) => {
          setShowloading("none");
          alert(error);
        });
    } else {
      setShowloading("none");
      formik.setFieldValue("razaosocial", "");
      formik.setFieldValue("nomefantasia", "");
      formik.setFieldValue("cidadepj", "");
      formik.setFieldValue("enderecopj", "");
      formik.setFieldValue("estadopj", "");
      formik.setFieldValue("numeropj", "");
      formik.setFieldValue("bairropj", "");
      formik.setFieldValue("telefone", "");
      formik.setFieldValue("ceppj", "");
      formik.setFieldValue("cnae", "");
      // setRAZAOSOCIAL("");
      // setNOMEFANTASIA("");
      // setCIDADEPJ("");
      // setENDERECOPJ("");
      // setESTADOPJ("");
      // setNUMEROPJ("");
      // setBAIRROPJ("");
      // setTELEFONE("");
      // setCEPPJ("");
      // setCNAE("");
    }
    // v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
    // return v;
  };

  const OnchangeTELEFONE = (v) => {
    setTELEFONE(maskTellPhone(v));
  };

  const OnchangeSITE = (v) => {
    setSITE(v);
  };

  const OnchangeCEPPJ = (v) => {
    setCEPPJ(maskNumber(v));
  };

  const OnchangeCNAE = (v) => {
    setCNAE(maskNumber(v));
  };

  const OnchangeENDERECOPJ = (v) => {
    setENDERECOPJ(v);
  };

  const OnchangeNUMEROPJ = (v) => {
    setNUMEROPJ(maskNumber(v));
  };

  const OnchangeBAIRROPJ = (v) => {
    setBAIRROPJ(v);
  };

  const OnchangeESTADOPJ = (v) => {
    setESTADOPJ(v);
  };

  const OnchangeCIDADEPJ = (v) => {
    setCIDADEPJ(v);
  };

  const OnchangeCOMPLEMENTOPJ = (v) => {
    setCOMPLEMENTOPJ(v);
  };

  const OnchangeBANCOPJ = (v) => {
    setBANCOPJ(v);
  };

  const OnchangeAGENCIAPJ = (v) => {
    setAGENCIAPJ(v);
  };

  const OnchangeCONTAPJ = (v) => {
    setCONTAPJ(v);
  };

  const OnchangePIXPJ = (v) => {
    setPIXPJ(v);
  };

  const OnchangeOPERACAOPJ = (v) => {
    setOPERACAOPJ(v);
  };

  const Step1NEXT = () => {
    if (
      !!formik.errors.nome ||
      !!formik.errors.email ||
      !!formik.errors.senha ||
      !!formik.errors.senha2
    ) {
      enqueueSnackbar("Preencha todos os campos como nas instruções", {
        variant: "error",
      });
    } else {
      slickRef.current.slickNext();
      setDOT1(dotInactive);
      setDOT2(dotActive);
    }
  };

  const Step2PJ = () => {
    slickRef.current.slickNext();
    setDOT2(dotInactive);
    setDOT3(dotActive);
  };

  const Step2PF = () => {
    // Pessoa física será implementado
  };

  const Step2PREV = () => {
    slickRef.current.slickPrev();
    setDOT2(dotInactive);
    setDOT1(dotActive);
  };

  const Step3PREV = () => {
    slickRef.current.slickPrev();
    setDOT3(dotInactive);
    setDOT2(dotActive);
  };

  const Step3NEXT = () => {
    if (validateCpf(formik.values.cpf)) {
      if (
        !!formik.values.nascimento &&
        !!formik.values.naturalidade &&
        !!formik.values.nacionalidade &&
        !!formik.values.sexo
      ) {
        slickRef.current.slickNext();
        setDOT3(dotInactive);
        setDOT4(dotActive);
      } else {
        enqueueSnackbar("Campos obrigatórios não preenchidos", {
          variant: "error",
        });
      }
      // insertPersonRequest({
      //   cpf,
      //   celular,
      //   nascimento,
      //   naturalidade,
      //   nacionalidade,
      //   estado_civil,
      //   rg,
      //   emissor,
      //   emissao,
      //   sexo,
      //   mae,
      //   pai,
      // });
    } else {
      enqueueSnackbar("Desculpe, informe um cpf válido!", {
        variant: "error",
      });
    }
  };

  const Step4PREV = () => {
    slickRef.current.slickPrev();
    setDOT4(dotInactive);
    setDOT3(dotActive);
  };

  const Step4NEXT = () => {
    slickRef.current.slickNext();
    setDOT4(dotInactive);
    setDOT5(dotActive);
    insertAddressCPFRequest({
      cep: maskNumber(cep),
      complemento,
      endereco,
      bairro,
    });
  };

  const Step5PREV = () => {
    slickRef.current.slickPrev();
    setDOT5(dotInactive);
    setDOT4(dotActive);
  };

  const Step5NEXT = () => {
    slickRef.current.slickNext();
    setDOT5(dotInactive);
    setDOT6(dotActive);
    insertAddressCNPJRequest({
      cep: maskNumber(ceppj),
      complemento: complementopj,
      endereco: enderecopj,
      numero: maskNumber(numeropj),
      bairro: bairropj,
    });
    insertEnterpriseRequest({
      cnpj: maskNumber(cnpj),
      cnae: cnae,
      razao_social: razaosocial,
      telefone_fixo: maskNumber(telefone),
      celular: maskNumber(celular),
      nome_fantasia: nome_fantasia,
      site: site,
    });
  };

  const Step6PREV = () => {
    slickRef.current.slickPrev();
    setDOT6(dotInactive);
    setDOT5(dotActive);
  };

  const Step6NEXT = () => {
    // slickRef.current.slickNext();setDOT6(dotInactive);setDOT7(dotActive)
  };

  const [openmodal, setOpenmodal] = useState(false);
  const handleClose = () => {
    top.location.href = "/";
    setOpenmodal(false);
  };

  const Register = () => {
    const objectJSONPJ = {
      usuario: {
        nome: nome.trim(),
        email: email.trim(),
        senha: sha256(senha).toString().trim(),
      },
      pessoa: {
        cpf: maskNumber(cpf),
        celular: maskNumber(celular),
        nascimento: nascimento,
        naturalidade: naturalidade.trim(),
        nacionalidade: nacionalidade.trim(),
        estado_civil: estado_civil.trim(),
        rg: rg.trim(),
        emissor: emissor.trim(),
        emissao: emissao,
        sexo: sexo.trim(),
        mae: mae.trim(),
        pai: pai.trim(),
      },
      empresa: {
        cnpj: maskNumber(cnpj),
        cnae: cnae.trim(),
        razao_social: razaosocial.trim(),
        telefone_fixo: maskNumber(telefone),
        celular: maskNumber(celular),
        nome_fantasia: nome_fantasia.trim(),
        site: site.trim(),
      },
      conta: {
        banco: bancopj.trim(),
        agencia: maskNumber(agenciapj),
        conta: maskNumber(contapj),
        operacao: maskNumber(operacaopj),
        pix: pixpj,
      },
      endereco_cnpj: {
        cep: maskNumber(ceppj),
        complemento: complementopj.trim(),
        endereco: enderecopj.trim(),
        numero: maskNumber(numeropj),
        bairro: bairropj.trim(),
        cidadepj: cidadepj.trim(),
        estadopj: estadopj.trim(),
      },
      endereco_cpf: {
        cep: maskNumber(cep),
        complemento: complemento.trim(),
        endereco: endereco.trim(),
        bairro: bairro.trim(),
        cidade: cidade.trim(),
        estado: estado.trim(),
      },
    };

    setShowloading("");
    $.ajax({
      url: "http://3.233.0.255:3001/signup",
      type: "POST",
      data: objectJSONPJ,
      crossDomain: true,
      cache: false,
      success: (result) => {
        console.log(result);
        dispatch(signupSuccess());
        localStorage.setItem("token", result.token);
        setShowloading("none");
        setOpenmodal(true);
        $("#form-dialog-title").html(`Confirme seu e-mail`);
        $("#form-dialog-body").html(
          `<b>Seja bem vindo à Vileve,</b> enviamos um <b>email</b> para você, para continuarmos <b>clique no link enviado</b> para confirmar seu email.`
        );
      },
      error: (error) => {
        console.log(error);
        setShowloading("none");
        setOpenmodal(true);
        $("#form-dialog-title").html(`Erro`);
        $("#form-dialog-body").html(
          `<b>Erro :(</b> Houve um erro no envio: ${error.responseJSON.name}.`
        );
      },
    });
  };
  // console.log(Boolean(formik.errors.nome));
  return (
    <>
      <Grid container direction="column" style={{ position: "absolute" }}>
        <Loading style={{ display: Showloading }}>
          <Spinner />
        </Loading>
        <Dialog
          open={openmodal}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title"></DialogTitle>
          <DialogContent>
            <DialogContentText id="form-dialog-body"></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="success">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Grid item style={{ height: "100px" }}>
          <img src={logo} className={classes.logo} alt="logotipo"></img>
        </Grid>
        <Grid item>
          <Grid container justify="flex-end" alignItems="center">
            <Grid item style={{ height: "5px" }}>
              <ul className="pagination">
                <li className="pagination__item">
                  <a href="#" className={dot1}></a>
                </li>
                <li className="pagination__item">
                  <a href="#" className={dot2}></a>
                </li>
                <li className="pagination__item">
                  <a href="#" className={dot3}></a>
                </li>
                <li className="pagination__item">
                  <a href="#" className={dot4}></a>
                </li>
                <li className="pagination__item">
                  <a href="#" className={dot5}></a>
                </li>
                <li className="pagination__item">
                  <a href="#" className={dot6}></a>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
        <Grid item zeroMinWidth>
          <Grid container>
            <Grid item zeroMinWidth>
              <form onSubmit={formik.handleSubmit}>
                <Card className={classes.cardStyle}>
                  <Carousel ref={slickRef} {...settings}>
                    <Grid item md={12}>
                      <Grid container justify="center" alignItems="center">
                        <Hidden only={["xs", "sm"]}>
                          <Grid item md={6}>
                            <Grid
                              container
                              justify="center"
                              alignItems="center"
                            >
                              <img
                                src={manPc}
                                className={classes.manPc}
                                alt="logotipo"
                              />
                            </Grid>
                          </Grid>
                        </Hidden>
                        <Grid item md={6}>
                          <div className={classes.divCentralization}>
                            <Grid container direction="column" spacing={2}>
                              <Grid item>
                                <Grid container>
                                  <Grid item>
                                    <Typography
                                      variant="body1"
                                      gutterBottom
                                      className={classes.label}
                                    >
                                      Informe os dados de{" "}
                                      <span className={classes.labelUser}>
                                        Usuário
                                      </span>
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item sm={8}>
                                <TextField
                                  id="NOME"
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
                              <Grid item sm={8}>
                                <TextField
                                  id="EMAIL"
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
                              <Grid item sm={8}>
                                <TextField
                                  id="SENHA"
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
                                          {showPassword ? (
                                            <Visibility />
                                          ) : (
                                            <VisibilityOff />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                  onChange={formik.handleChange}
                                  fullWidth
                                />
                              </Grid>
                              <Grid item sm={8}>
                                <TextField
                                  id="SENHA2"
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
                                          {showPassword ? (
                                            <Visibility />
                                          ) : (
                                            <VisibilityOff />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                  onChange={formik.handleChange}
                                  fullWidth
                                />
                              </Grid>
                              <Grid item sm={12}>
                                <Grid
                                  container
                                  justify="flex-end"
                                  alignItems="center"
                                >
                                  <Grid item>
                                    <Button
                                      color="primary"
                                      size="sm"
                                      id="BTNFIRSTNEXT"
                                      rel="noopener noreferrer"
                                      onClick={() => {
                                        Step1NEXT();
                                      }}
                                      className={classes.btnStepPostion}
                                    >
                                      Próximo
                                      <ArrowForward
                                        className={classes.arrowIconNext}
                                      />
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={12}>
                      <div className={classes.divCentralization}>
                        <Grid
                          container
                          justify="center"
                          alignItems="center"
                          // className={classes.columSpace}
                          spacing={2}
                        >
                          <Hidden only={["xs", "sm"]}>
                            <Grid item md={6}>
                              <Grid
                                container
                                justify="center"
                                alignItems="center"
                              >
                                <img
                                  src={manPc}
                                  alt="logotipo"
                                  className={classes.manPc}
                                />
                              </Grid>
                            </Grid>
                          </Hidden>
                          <Grid item md={3}>
                            <Grid
                              container
                              justify="center"
                              alignItems="center"
                            >
                              <Grid item>
                                <CardM className={classes.cardPJPF}>
                                  <CardActionArea>
                                    <CardMedia
                                      className={classes.media}
                                      image={bg_card_gateway}
                                      title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                      <Typography
                                        variant="button"
                                        display="block"
                                        gutterBottom
                                      >
                                        Para Sua Empresa
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                      >
                                        Clique abaixo para contratar o produto
                                        Vileve Assitência.
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                  <CardActions>
                                    <Button
                                      size="sm"
                                      color="primary"
                                      onClick={() => Step2PJ()}
                                    >
                                      Pessoa Jurídica
                                    </Button>
                                  </CardActions>
                                </CardM>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item md={3}>
                            <Grid
                              container
                              justify="center"
                              alignItems="center"
                            >
                              <Grid item>
                                <CardM className={classes.cardPJPF}>
                                  <CardActionArea>
                                    <CardMedia
                                      className={classes.media}
                                      image={bg_card_vileve}
                                      title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                      <Typography
                                        variant="button"
                                        display="block"
                                        gutterBottom
                                      >
                                        Para Você
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                      >
                                        Clique abaixo para contratar o produto
                                        Vileve Assitência.
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                  <CardActions>
                                    <Button
                                      size="sm"
                                      color="success"
                                      onClick={() => Step2PF()}
                                    >
                                      Pessoa Física
                                    </Button>
                                  </CardActions>
                                </CardM>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid container justify="flex-end" alignItems="center">
                          <Grid item>
                            <div>
                              <Button
                                color="warning"
                                size="sm"
                                rel="noopener noreferrer"
                                onClick={() => Step2PREV()}
                                className={classes.btnStepPostion}
                              >
                                <ArrowBack className={classes.arrowIconBack} />
                                Anterior
                              </Button>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <div className={classes.divCentralization}>
                        <Grid container justify="center" alignItems="center">
                          <Hidden only={["xs", "sm"]}>
                            <Grid item md={4}>
                              <Grid
                                container
                                justify="center"
                                alignItems="center"
                              >
                                <img
                                  src={manPc}
                                  className={classes.manPc}
                                  alt="logotipo"
                                />
                              </Grid>
                            </Grid>
                          </Hidden>
                          <Grid item md={8}>
                            <Grid container direction="column" spacing={3}>
                              <Grid item>
                                <Grid container>
                                  <Grid item>
                                    <Typography
                                      variant="body1"
                                      gutterBottom
                                      className={classes.label}
                                    >
                                      Informe os dados de{" "}
                                      <span className={classes.labelUser}>
                                        Representante Legal
                                      </span>
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={4}>
                                    <TextField
                                      id="cpf"
                                      name="cpf"
                                      label="CPF"
                                      value={formik.values.cpf}
                                      onChange={(e) => {
                                        formik.setFieldValue(
                                          e.target.id,
                                          maskCpf(e.target.value)
                                        );
                                      }}
                                      fullWidth
                                      inputProps={{ maxLength: 14 }}
                                      required
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={4}>
                                    <TextField
                                      id="celular"
                                      name="celular"
                                      label="CELULAR"
                                      value={formik.values.celular}
                                      onChange={(e) =>
                                        formik.setFieldValue(
                                          e.target.id,
                                          maskCel(e.target.value)
                                        )
                                      }
                                      fullWidth
                                      inputProps={{ maxLength: 15 }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={4}>
                                    <TextField
                                      id="nascimento"
                                      name="nascimento"
                                      label="NASCIMENTO"
                                      value={formik.values.nascimento}
                                      onChange={(e) =>
                                        formik.setFieldValue(
                                          e.target.id,
                                          maskDate(e.target.value)
                                        )
                                      }
                                      inputProps={{ maxLength: 10 }}
                                      fullWidth
                                      required
                                      error={Boolean(formik.errors.nascimento)}
                                      helperText={formik.errors.nascimento}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={4}>
                                    <TextField
                                      id="naturalidade"
                                      name="naturalidade"
                                      label="NATURALIDADE"
                                      value={formik.values.naturalidade}
                                      onChange={(e) =>
                                        formik.setFieldValue(
                                          e.target.id,
                                          e.target.value.replace(
                                            /[^a-zA-ZçÇ]/g,
                                            ""
                                          )
                                        )
                                      }
                                      fullWidth
                                      required
                                      error={Boolean(
                                        formik.errors.naturalidade
                                      )}
                                      helperText={formik.errors.naturalidade}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={4}>
                                    <TextField
                                      id="nacionalidade"
                                      name="nacionalidade"
                                      select
                                      label="NACIONALIDADE"
                                      value={formik.values.nacionalidade}
                                      onChange={formik.handleChange}
                                      fullWidth
                                      required
                                      error={Boolean(
                                        formik.errors.nacionalidade
                                      )}
                                      helperText={formik.errors.nacionalidade}
                                    >
                                      {countries.map((country) => {
                                        return (
                                          <MenuItem
                                            key={country}
                                            value={country}
                                          >
                                            {country}
                                          </MenuItem>
                                        );
                                      })}
                                    </TextField>
                                  </Grid>
                                  <Grid item xs={12} md={4}>
                                    <TextField
                                      id="estado_civil"
                                      name="estado_civil"
                                      select
                                      label="ESTADOCIVIL"
                                      value={formik.values.estado_civil}
                                      fullWidth
                                      onChange={formik.handleChange}
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
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={3}>
                                    <TextField
                                      id="rg"
                                      name="rg"
                                      label="RG"
                                      value={formik.values.rg}
                                      onChange={formik.handleChange}
                                      fullWidth
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={3}>
                                    <TextField
                                      id="emissor"
                                      name="emissor"
                                      label="ORGÃO EMISSOR"
                                      value={formik.values.emissor}
                                      onChange={formik.handleChange}
                                      fullWidth
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={3}>
                                    <TextField
                                      id="EMISSAO"
                                      name="EMISSAO"
                                      label="DATA EMISSAO"
                                      value={formik.values.emissao}
                                      onChange={formik.handleChange}
                                      fullWidth
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={3}>
                                    <TextField
                                      id="sexo"
                                      name="sexo"
                                      select
                                      label="SEXO"
                                      fullWidth
                                      value={formik.values.sexo}
                                      onChange={formik.handleChange}
                                      required
                                      error={Boolean(formik.errors.sexo)}
                                      helperText={formik.errors.sexo}
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
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={12}>
                                    <TextField
                                      id="nomemae"
                                      name="mae"
                                      label="NOME DA MÃE"
                                      value={formik.values.mae}
                                      onChange={formik.handleChange}
                                      fullWidth
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={12}>
                                    <TextField
                                      id="nomepai"
                                      name="pai"
                                      label="NOME DO PAI"
                                      value={formik.values.pai}
                                      onChange={formik.handleChange}
                                      fullWidth
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
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
                                      onClick={() => Step3PREV()}
                                    >
                                      <ArrowBack
                                        className={classes.arrowIconBack}
                                      />
                                      Anterior
                                    </Button>
                                  </Grid>
                                  <Grid item>
                                    <Button
                                      color="primary"
                                      size="sm"
                                      id="BTNSECONDNEXT"
                                      rel="noopener noreferrer"
                                      onClick={() => Step3NEXT()}
                                    >
                                      Próximo
                                      <ArrowForward
                                        className={classes.arrowIconNext}
                                      />
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                    <Grid item md={12}>
                      <div className={classes.divCentralization}>
                        <Grid container justify="center" alignItems="center">
                          <Hidden only={["xs", "sm"]}>
                            <Grid item md={6}>
                              <Grid
                                container
                                justify="center"
                                alignItems="center"
                              >
                                <img
                                  src={manPc}
                                  className={classes.manPc}
                                  alt="logotipo"
                                />
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
                                  Informe os dados de{" "}
                                  <span className={classes.labelUser}>
                                    Endereço do Representante Legal
                                  </span>
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={3}>
                                  <Grid item md={3}>
                                    <TextField
                                      id="cep"
                                      name="cep"
                                      label="CEP"
                                      value={formik.values.cep}
                                      onChange={(e) => handleCep(e)}
                                      fullWidth
                                      inputProps={{
                                        maxLength: 8,
                                      }}
                                      required
                                    />
                                  </Grid>
                                  <Grid item md={7}>
                                    <TextField
                                      id="endereco"
                                      name="endereco"
                                      label="ENDEREÇO"
                                      value={formik.values.endereco}
                                      onChange={formik.handleChange}
                                      fullWidth
                                      required
                                    />
                                  </Grid>
                                  <Grid item md={2}>
                                    <TextField
                                      id="numero"
                                      name="numero"
                                      label="NÚMERO"
                                      value={formik.values.numero}
                                      onChange={(e) =>
                                        formik.setFieldValue(
                                          e.target.id,
                                          maskNumber(e.target.value)
                                        )
                                      }
                                      fullWidth
                                      required
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={3}>
                                  <Grid item md={6}>
                                    <TextField
                                      id="bairro"
                                      name="bairro"
                                      label="BAIRRO"
                                      value={formik.values.bairro}
                                      onChange={formik.handleChange}
                                      fullWidth
                                      required
                                    />
                                  </Grid>
                                  <Grid item md={6}>
                                    <TextField
                                      id="complemento"
                                      name="complemento"
                                      label="COMPLEMENTO"
                                      value={formik.values.complemento}
                                      onChange={formik.handleChange}
                                      fullWidth
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={3}>
                                  <Grid item>
                                    <TextField
                                      id="cidade"
                                      name="cidade"
                                      label="CIDADE"
                                      value={formik.values.cidade}
                                      onChange={formik.handleChange}
                                      fullWidth
                                      required
                                    />
                                  </Grid>
                                  <Grid item>
                                    <TextField
                                      id="estado"
                                      name="estado"
                                      label="ESTADO"
                                      value={formik.values.estado}
                                      onChange={(e) =>
                                        formik.setFieldValue(
                                          e.target.id,
                                          e.target.value.replace(
                                            /[^a-zA-ZçÇ]/g,
                                            ""
                                          )
                                        )
                                      }
                                      fullWidth
                                      required
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
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
                                      onClick={() => Step4PREV()}
                                    >
                                      <ArrowBack
                                        className={classes.arrowIconBack}
                                      />
                                      Anterior
                                    </Button>
                                  </Grid>
                                  <Button
                                    color="primary"
                                    size="sm"
                                    id="BTNTHIRDNEXT"
                                    rel="noopener noreferrer"
                                    onClick={() => Step4NEXT()}
                                  >
                                    Próximo
                                    <ArrowForward
                                      className={classes.arrowIconNext}
                                    />
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                    <Grid item md={12}>
                      <div style={{ padding: 20 }}>
                        <Grid container justify="center" alignItems="center">
                          <Hidden only={["xs", "sm"]}>
                            <Grid item md={6}>
                              <Grid
                                container
                                justify="center"
                                alignItems="center"
                              >
                                <img
                                  src={manPc}
                                  className={classes.manPc}
                                  alt="logotipo"
                                />
                              </Grid>
                            </Grid>
                          </Hidden>
                          <Grid item md={6}>
                            <Grid container direction="column" spacing={4}>
                              <Grid item>
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  className={classes.label}
                                >
                                  Informe os dados da{" "}
                                  <span className={classes.labelUser}>
                                    Sua Empresa
                                  </span>
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={3}>
                                  <Grid item md={4}>
                                    <TextField
                                      id="cnpj"
                                      name="cnpj"
                                      label="CNPJ"
                                      value={formik.values.cnpj}
                                      onChange={(e) => handleCNPJ(e)}
                                      fullWidth
                                      inputProps={{ maxLength: 18 }}
                                      required
                                    />
                                  </Grid>
                                  <Grid item md={4}>
                                    <TextField
                                      id="telefone"
                                      name="telefone"
                                      label="TELEFONE"
                                      value={formik.values.telefone}
                                      onChange={
                                        (e) =>
                                          formik.setFieldValue(
                                            e.target.id,
                                            maskTellPhone(e.target.value)
                                          )
                                        // OnchangeTELEFONE(e.target.value)
                                      }
                                      fullWidth
                                      inputProps={{ maxLength: 14 }}
                                      required
                                    />
                                  </Grid>
                                  <Grid item md={4}>
                                    <TextField
                                      id="site"
                                      name="site"
                                      label="SITE"
                                      value={formik.values.site}
                                      onChange={formik.handleChange}
                                      fullWidth
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={3}>
                                  <Grid item md={4}>
                                    <TextField
                                      id="razaosocial"
                                      name="razaosocial"
                                      label="RAZÃO SOCIAL"
                                      value={formik.values.razaosocial}
                                      onChange={formik.handleChange}
                                      fullWidth
                                      required
                                    />
                                  </Grid>
                                  <Grid item md={4}>
                                    <TextField
                                      id="cnae"
                                      name="cnae"
                                      label="CNAE"
                                      value={formik.values.cnae}
                                      onChange={(e) =>
                                        formik.setFieldValue(
                                          e.target.id,
                                          maskNumber(e.target.value)
                                        )
                                      }
                                      fullWidth
                                      required
                                    />
                                  </Grid>
                                  <Grid item md={4}>
                                    <TextField
                                      id="nomefantasia "
                                      name="nomefantasia "
                                      label="NOME FANTASIA"
                                      value={formik.values.nome_fantasia}
                                      onChange={formik.handleChange}
                                      fullWidth
                                      required
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={3}>
                                  <Grid item md={3}>
                                    <TextField
                                      id="ceppj"
                                      name="ceppj"
                                      label="CEP"
                                      value={formik.values.ceppj}
                                      onChange={(e) =>
                                        formik.setFieldValue(
                                          e.target.id,
                                          maskNumber(e.target.value)
                                        )
                                      }
                                      fullWidth
                                      required
                                    />
                                  </Grid>
                                  <Grid item md={6}>
                                    <TextField
                                      id="enderecopj"
                                      name="enderecopj"
                                      label="ENDEREÇO"
                                      value={formik.values.enderecopj}
                                      onChange={formik.handleChange}
                                      fullWidth
                                      required
                                    />
                                  </Grid>
                                  <Grid item md={3}>
                                    <TextField
                                      id="numeropj"
                                      name="numeropj"
                                      label="NUMERO"
                                      value={formik.values.numeropj}
                                      onChange={(e) =>
                                        formik.setFieldValue(
                                          e.target.id,
                                          maskNumber(e.target.value)
                                        )
                                      }
                                      fullWidth
                                      required
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={3}>
                                  <Grid item md={6}>
                                    <TextField
                                      id="bairropj"
                                      name="bairropj"
                                      label="BAIRRO"
                                      value={formik.values.bairropj}
                                      onChange={formik.handleChange}
                                      fullWidth
                                      required
                                    />
                                  </Grid>
                                  <Grid item md={6}>
                                    <TextField
                                      id="complementopj"
                                      name="complementopj"
                                      label="COMPLEMENTO"
                                      value={formik.values.complementopj}
                                      onChange={formik.handleChange}
                                      fullWidth
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={3}>
                                  <Grid item md={6}>
                                    <TextField
                                      id="cidadepj"
                                      name="cidadepj"
                                      label="CIDADE"
                                      value={formik.values.cidadepj}
                                      onChange={formik.handleChange}
                                      fullWidth
                                      required
                                    />
                                  </Grid>
                                  <Grid item md={6}>
                                    <TextField
                                      id="estadopj"
                                      name="estadopj"
                                      label="ESTADO"
                                      value={formik.values.estadopj}
                                      onChange={formik.handleChange}
                                      fullWidth
                                      required
                                    />
                                  </Grid>
                                </Grid>
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
                                  onClick={() => Step5PREV()}
                                >
                                  <ArrowBack
                                    className={classes.arrowIconBack}
                                  />
                                  Anterior
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  color="primary"
                                  size="sm"
                                  id="BTNFOURTHNEXT"
                                  rel="noopener noreferrer"
                                  onClick={() => Step5NEXT()}
                                >
                                  Próximo
                                  <ArrowForward
                                    className={classes.arrowIconBack}
                                  />
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                    <Grid item md={12}>
                      <div style={{ padding: 20 }}>
                        <Grid container justify="center" alignItems="center">
                          <Hidden only={["xs", "sm"]}>
                            <Grid item md={6}>
                              <Grid
                                container
                                justify="center"
                                alignItems="center"
                              >
                                <img
                                  src={manPc}
                                  className={classes.manPc}
                                  alt="logotipo"
                                />
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
                                  <Grid item sm={4}>
                                    <TextField
                                      id="BANCOPJ"
                                      name="BANCOPJ"
                                      label="BANCO"
                                      value={bancopj}
                                      onChange={(e) =>
                                        OnchangeBANCOPJ(e.target.value)
                                      }
                                      fullWidth
                                      inputProps={{
                                        maxLength: 18,
                                      }}
                                    />
                                  </Grid>
                                  <Grid item sm={4}>
                                    <TextField
                                      id="AGENCIAPJ"
                                      name="AGENCIAPJ"
                                      label="AGÊNCIA"
                                      value={agenciapj}
                                      onChange={(e) =>
                                        OnchangeAGENCIAPJ(e.target.value)
                                      }
                                      fullWidth
                                      inputProps={{
                                        maxLength: 14,
                                      }}
                                      required
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={3}>
                                  <Grid item sm={4}>
                                    <TextField
                                      id="CONTAPJ"
                                      name="CONTAPJ"
                                      label="CONTA"
                                      value={contapj}
                                      onChange={(e) =>
                                        OnchangeCONTAPJ(e.target.value)
                                      }
                                      fullWidth
                                      required
                                    />
                                  </Grid>
                                  <Grid item sm={4}>
                                    <TextField
                                      id="OPERACAOPJ"
                                      name="OPERACAOPJ"
                                      label="OPERAÇÃO"
                                      value={operacaopj}
                                      onChange={(e) =>
                                        OnchangeOPERACAOPJ(e.target.value)
                                      }
                                      fullWidth
                                      helperText="*Caso tenha conta na Caixa"
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={3}>
                                  <Grid item>
                                    <TextField
                                      id="PIXPJ"
                                      name="PIXPJ"
                                      label="CHAVE PIX"
                                      value={pixpj}
                                      onChange={(e) =>
                                        OnchangePIXPJ(e.target.value)
                                      }
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
                                      onClick={() => Step6PREV()}
                                    >
                                      <ArrowBack
                                        className={classes.arrowIconBack}
                                      />
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
                  </Carousel>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ClassBackground />
    </>
  );
}
