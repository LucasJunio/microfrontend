import "@fontsource/roboto";
import React, { useState, useRef } from "react";
import $ from "jquery";
import axios from "axios";
// react component for creating beautiful carousel
import Carousel from "react-slick";
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
} from "@material-ui/core";

import { ArrowForward, ArrowBack, Save } from "@material-ui/icons";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import bg_card_vileve from "../../assets/images/bg_card_assistencia.jpg";
import bg_card_gateway from "../../assets/images/bg_card_vilevepay.jpg";
import logo from "../../assets/images/logo_vileve_way.png";
import manPc from "../../assets/images/register.png";
import Button from "components/CustomButtons/Button.js";
import sha256 from "crypto-js/sha256";
import {
  ClassBackground,
  ContainerCard,
  TitleWelcome,
  Classlogotipo,
  Containerform,
  Containerleft,
  Imageleft1,
  Imageleft2,
  Containerright,
  PositionButton,
  MarginField,
  DescriptionText,
  Pagination,
  Loading,
  Spinner,
  useStyles,
} from "./styles";
// import * as yup from "yup";

import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { insertPersonRequest } from "../../store/modules/person/actions";
import {
  insertAddressCPFRequest,
  insertAddressCNPJRequest,
} from "../../store/modules/address/actions";
import { insertEnterpriseRequest } from "../../store/modules/enterprise/actions";
import { signupSuccess } from "../../store/modules/signup/actions";
//teste
import "./stylepagination.scss";
import { maskCpf } from "../../utils/string/maskCPF";

export default function SectionCarousel() {
  const slickRef = useRef();
  const classes = useStyles();

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

  const dispatch = useDispatch();

  let loading = useSelector((state) => state.signup.loading);
  let modal = useSelector((state) => state.signup.modal);

  let usuario = useSelector((state) => state.user.usuario, shallowEqual);
  let pessoa = useSelector((state) => state.person.pessoa, shallowEqual);
  let conta = useSelector((state) => state.account.conta, shallowEqual);
  let empresa = useSelector((state) => state.enterprise.empresa, shallowEqual);
  let endereco_cpf = useSelector(
    (state) => state.address.endereco_cpf,
    shallowEqual
  );
  let endereco_cnpj = useSelector(
    (state) => state.address.endereco_cnpj,
    shallowEqual
  );

  const [Showloading, setShowloading] = useState("none");

  const [selectedEnabled, setSelectedEnabled] = useState(false);
  const [disabledfields, setdisabledfields] = useState(false);
  const [enablepj, setenablepj] = useState("none");
  const [enablepf, setenablepf] = useState("none");
  const [choicemodule, setchoice] = useState("");

  const maskdate = (v) => {
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "$1/$2");
    v = v.replace(/(\d)(\d{4})$/, "$1/$2");
    return v;
  };

  const maskcel = (v) => {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
  };

  const masktelefone = (v) => {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
  };

  const getcep = (v) => {
    v = v.replace(/\D/g, "");
    if (v.length >= 8) {
      setShowloading("");
      axios
        .get(`https://viacep.com.br/ws/${v}/json`)
        .then((res) => {
          setShowloading("none");
          setENDERECO(res.data.logradouro);
          setBAIRRO(res.data.bairro);
          setCIDADE(res.data.localidade);
          setESTADO(res.data.uf);
        })
        .catch((error) => {
          setShowloading("none");
          alert(error.data);
        });
    } else {
      setShowloading("none");
      setENDERECO("");
      setBAIRRO("");
      setCIDADE("");
      setESTADO("");
    }
    return v;
  };

  const masknumero = (v) => {
    v = v.replace(/\D/g, "");
    return v;
  };

  const TestCPF = (strCPF) => {
    var Soma;
    var Resto;
    var i;
    Soma = 0;
    strCPF = strCPF.replace(/\D/g, "");
    if (strCPF == "00000000000") return false;
    for (i = 1; i <= 9; i++)
      Soma = Soma + parseInt(strCPF.toString().substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.toString().substring(9, 10))) return false;
    Soma = 0;
    for (i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.toString().substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.toString().substring(10, 11))) return false;
    return true;
  };

  const [nome, setNome] = useState("");
  const OnchangeNOME = (v) => {
    setNome(v.replace(/[^a-zA-ZçÇ áéíóúÁÉÍÓÚ]/g, ""));

    /^[\D]+[A-Za-z-ç.-á-é-í-ó-ú-Á-É-Í-Ó-Ú]+(\s*[A-Za-z-ç.-á-é-í-ó-ú-Á-É-Í-Ó-Ú]+)*$/.test(
      v
    ) || v.length < 1
      ? $("#descriptionnome").html("")
      : $("#descriptionnome").html("Digite apenas letras no campo nome!");
  };

  const [email, setEmail] = useState("");
  const OnchangeEMAIL = (v) => {
    setEmail(v);
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) || v.length < 1
      ? $("#descriptionemail").html("")
      : $("#descriptionemail").html("Digite um email válido");
  };

  const [celular, setCelular] = useState("");
  const OnchangeCELULAR = (v) => {
    setCelular(maskcel(v));
  };

  const [cpf, setCPF] = useState("");
  const handleCPF = (v) => {
    setCPF(maskCpf(v));
  };

  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [Iconsenha, setIconSenha] = useState("lock_Outline");
  const [ColorInputClass, setColorInputClass] = useState(false);
  const [ColorInputClass2, setColorInputClass2] = useState(false);

  const OnchangeSENHA = (v) => {
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
  };

  const OnchangeSENHA2 = (v) => {
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

  const [cep, setCEP] = useState("");
  const OnchangeCEP = (v) => {
    setCEP(getcep(v));
  };

  const [nascimento, setNASCIMENTO] = useState("");
  const OnchangeNASCIMENTO = (v) => {
    setNASCIMENTO(maskdate(v));
  };

  const [rg, setRG] = useState("");
  const OnchangeRG = (v) => {
    setRG(v);
  };

  const [emissor, setEMISSOR] = useState("");
  const OnchangeEMISSOR = (v) => {
    setEMISSOR(v);
  };

  const [emissao, setEMISSAO] = useState("");
  const OnchangeEMISSAO = (v) => {
    setEMISSAO(maskdate(v));
  };

  const [sexo, setSEXO] = useState("");
  const OnchangeSEXO = (v) => {
    setSEXO(v);
  };

  const [endereco, setENDERECO] = useState("");
  const OnchangeENDERECO = (v) => {
    setENDERECO(v);
  };

  const [numero, setNUMERO] = useState("");
  const OnchangeNUMERO = (v) => {
    setNUMERO(masknumero(v));
  };

  const [bairro, setBAIRRO] = useState("");
  const OnchangeBAIRRO = (v) => {
    setBAIRRO(v);
  };

  const [complemento, setCOMPLEMENTO] = useState("");
  const OnchangeCOMPLEMENTO = (v) => {
    setCOMPLEMENTO(v);
  };

  const [cidade, setCIDADE] = useState("");
  const OnchangeCIDADE = (v) => {
    setCIDADE(v);
  };

  const [estado, setESTADO] = useState("");
  const OnchangeESTADO = (v) => {
    setESTADO(v.replace(/[^a-zA-ZçÇ]/g, ""));
  };

  const [estado_civil, setESTADOCIVIL] = useState("");
  const OnchangeESTADOCIVIL = (v) => {
    setESTADOCIVIL(v);
  };

  const [naturalidade, setNATURALIDADE] = useState("");
  const OnchangeNATURALIDADE = (v) => {
    setNATURALIDADE(v.replace(/[^a-zA-ZçÇ]/g, ""));
  };

  const [nacionalidade, setNACIONALIDADE] = useState("");
  const OnchangeNACIONALIDADE = (v) => {
    setNACIONALIDADE(v.replace(/[^a-zA-ZçÇ]/g, ""));
  };

  const [mae, setMAE] = useState("");
  const OnchangeMAE = (v) => {
    setMAE(v);
  };

  const [pai, setPAI] = useState("");
  const OnchangePAI = (v) => {
    setPAI(v);
  };

  const [razaosocial, setRAZAOSOCIAL] = useState("");
  const OnchangeRAZAOSOCIAL = (v) => {
    setRAZAOSOCIAL(v);
  };

  const [nome_fantasia, setNOMEFANTASIA] = useState("");
  const OnchangeNOMEFANTASIA = (v) => {
    setNOMEFANTASIA(v);
  };

  const [cnpj, setCNPJ] = useState("");
  const OnchangeCNPJ = (v) => {
    setCNPJ(getcnpj(v));
  };

  const getcnpj = (v) => {
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
          setRAZAOSOCIAL(res.data.name);
          setNOMEFANTASIA(res.data.alias);
          setCIDADEPJ(res.data.address.city);
          setENDERECOPJ(res.data.address.street);
          setESTADOPJ(res.data.address.state);
          setNUMEROPJ(res.data.address.number);
          setBAIRROPJ(res.data.address.neighborhood);
          setTELEFONE(masktelefone(res.data.phone.phone_1));
          setCEPPJ(res.data.address.zip_code);
          setCNAE(res.data.legal_nature.code);
        })
        .catch((error) => {
          setShowloading("none");
          alert(error);
        });
    } else {
      setShowloading("none");
      setRAZAOSOCIAL("");
      setNOMEFANTASIA("");
      setCIDADEPJ("");
      setENDERECOPJ("");
      setESTADOPJ("");
      setNUMEROPJ("");
      setBAIRROPJ("");
      setTELEFONE("");
      setCEPPJ("");
      setCNAE("");
    }
    v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
    return v;
  };

  const [telefone, setTELEFONE] = useState("");
  const OnchangeTELEFONE = (v) => {
    setTELEFONE(masktelefone(v));
  };

  const [site, setSITE] = useState("");
  const OnchangeSITE = (v) => {
    setSITE(v);
  };

  const [ceppj, setCEPPJ] = useState("");
  const OnchangeCEPPJ = (v) => {
    setCEPPJ(masknumero(v));
  };

  const [cnae, setCNAE] = useState("");
  const OnchangeCNAE = (v) => {
    setCNAE(masknumero(v));
  };

  const [enderecopj, setENDERECOPJ] = useState("");
  const OnchangeENDERECOPJ = (v) => {
    setENDERECOPJ(v);
  };

  const [numeropj, setNUMEROPJ] = useState("");
  const OnchangeNUMEROPJ = (v) => {
    setNUMEROPJ(masknumero(v));
  };

  const [bairropj, setBAIRROPJ] = useState("");
  const OnchangeBAIRROPJ = (v) => {
    setBAIRROPJ(v);
  };

  const [estadopj, setESTADOPJ] = useState("");
  const OnchangeESTADOPJ = (v) => {
    setESTADOPJ(v);
  };

  const [cidadepj, setCIDADEPJ] = useState("");
  const OnchangeCIDADEPJ = (v) => {
    setCIDADEPJ(v);
  };

  const [complementopj, setCOMPLEMENTOPJ] = useState("");
  const OnchangeCOMPLEMENTOPJ = (v) => {
    setCOMPLEMENTOPJ(v);
  };

  const [bancopj, setBANCOPJ] = useState("");
  const OnchangeBANCOPJ = (v) => {
    setBANCOPJ(v);
  };

  const [agenciapj, setAGENCIAPJ] = useState("");
  const OnchangeAGENCIAPJ = (v) => {
    setAGENCIAPJ(v);
  };

  const [contapj, setCONTAPJ] = useState("");
  const OnchangeCONTAPJ = (v) => {
    setCONTAPJ(v);
  };

  const [pixpj, setPIXPJ] = useState("");
  const OnchangePIXPJ = (v) => {
    setPIXPJ(v);
  };

  const [operacaopj, setOPERACAOPJ] = useState("");
  const OnchangeOPERACAOPJ = (v) => {
    setOPERACAOPJ(v);
  };

  // const [nickname, setNICKNAME] = useState('');
  // const OnchangeNICKNAME = v => { setNICKNAME(v) }

  const dotActive = "pagination__link";
  const dotInactive = "pagination__link is_active";
  const [dot1, setDOT1] = useState(dotActive);
  const [dot2, setDOT2] = useState(dotInactive);
  const [dot3, setDOT3] = useState(dotInactive);
  const [dot4, setDOT4] = useState(dotInactive);
  const [dot5, setDOT5] = useState(dotInactive);
  const [dot6, setDOT6] = useState(dotInactive);

  const Step1NEXT = () => {
    if (
      nome.length < 5 ||
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email) ||
      !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
        senha
      )
    ) {
      alert("Todos os campos são obrigatórios, favor revise seu formulário!");
    } else {
      //vai para o próximo slide depois coloca o marcardo1 como inativo e o marcador2 como ativo
      slickRef.current.slickNext();
      setDOT1(dotInactive);
      setDOT2(dotActive);
      // insertUserRequest({ nome, email, senha })
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
    if (TestCPF(cpf)) {
      slickRef.current.slickNext();
      setDOT3(dotInactive);
      setDOT4(dotActive);
      insertPersonRequest({
        cpf,
        celular,
        nascimento,
        naturalidade,
        nacionalidade,
        estado_civil,
        rg,
        emissor,
        emissao,
        sexo,
        mae,
        pai,
      });
    } else {
      alert("Desculpe, informe um cpf válido!");
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
      cep: masknumero(cep),
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
      cep: masknumero(ceppj),
      complemento: complementopj,
      endereco: enderecopj,
      numero: masknumero(numeropj),
      bairro: bairropj,
    });
    insertEnterpriseRequest({
      cnpj: masknumero(cnpj),
      cnae: cnae,
      razao_social: razaosocial,
      telefone_fixo: masknumero(telefone),
      celular: masknumero(celular),
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
    // insertAccountRequest({
    //   banco: bancopj,
    //   agencia: masknumero(agenciapj),
    //   conta: masknumero(contapj),
    //   operacao: masknumero(operacaopj),
    //   pix: pixpj
    // })

    // const submit = () => {
    const objectJSONPJ = {
      usuario: {
        nome: nome.trim(),
        email: email.trim(),
        senha: sha256(senha).toString().trim(),
      },
      pessoa: {
        cpf: masknumero(cpf),
        celular: masknumero(celular),
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
        cnpj: masknumero(cnpj),
        cnae: cnae.trim(),
        razao_social: razaosocial.trim(),
        telefone_fixo: masknumero(telefone),
        celular: masknumero(celular),
        nome_fantasia: nome_fantasia.trim(),
        site: site.trim(),
      },
      conta: {
        banco: bancopj.trim(),
        agencia: masknumero(agenciapj),
        conta: masknumero(contapj),
        operacao: masknumero(operacaopj),
        pix: pixpj,
      },
      endereco_cnpj: {
        cep: masknumero(ceppj),
        complemento: complementopj.trim(),
        endereco: enderecopj.trim(),
        numero: masknumero(numeropj),
        bairro: bairropj.trim(),
        cidadepj: cidadepj.trim(),
        estadopj: estadopj.trim(),
      },
      endereco_cpf: {
        cep: masknumero(cep),
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

    // dispatch(signupRequest({ usuario, pessoa, conta, empresa, endereco_cnpj, endereco_cpf }));
    // dispatch(signupRequest({ nome, email, celular, senha }));
    // }
  };

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
              <Card className={classes.cardStyle}>
                <Carousel ref={slickRef} {...settings}>
                  <Grid item md={12}>
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      className={classes.columSpace}
                    >
                      <Hidden xsDown smDown>
                        <Grid item md={6}>
                          <Grid container justify="center" alignItems="center">
                            <img
                              src={manPc}
                              className={classes.manPc}
                              alt="logotipo"
                            />
                          </Grid>
                        </Grid>
                      </Hidden>
                      <Grid item md={6}>
                        <div style={{ padding: 20 }}>
                          <Grid
                            container
                            direction="column"
                            alignContent="center"
                            spacing={2}
                          >
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
                                name="NOME"
                                label="NOME COMPLETO"
                                value={nome}
                                onChange={(e) => OnchangeNOME(e.target.value)}
                                fullWidth
                              />
                              <DescriptionText>
                                <div id="descriptionnome"></div>
                              </DescriptionText>
                            </Grid>
                            <Grid item sm={8}>
                              <TextField
                                id="EMAIL"
                                name="EMAIL"
                                label="EMAIL"
                                value={email}
                                onChange={(e) => OnchangeEMAIL(e.target.value)}
                                fullWidth
                              />
                              <DescriptionText>
                                <div id="descriptionemail"></div>
                              </DescriptionText>
                            </Grid>
                            <Grid item sm={8}>
                              <TextField
                                id="SENHA"
                                name="SENHA"
                                label="SENHA"
                                value={senha}
                                type="password"
                                onChange={(e) => OnchangeSENHA(e.target.value)}
                                fullWidth
                              />
                              <DescriptionText>
                                <div id="descriptionpassword">
                                  A senha deve conter mínimo de oito caracteres,
                                  pelo menos, uma letra maiúscula, uma letra
                                  minúscula, um número e um caractere especial{" "}
                                </div>
                              </DescriptionText>
                            </Grid>
                            <Grid item sm={8}>
                              <TextField
                                id="SENHA2"
                                name="SENHA2"
                                label="CONFIRME SUA SENHA"
                                value={senha2}
                                type="password"
                                onChange={(e) => OnchangeSENHA2(e.target.value)}
                                fullWidth
                              />
                            </Grid>
                            <Grid item sm={12}>
                              <Grid
                                container
                                justify="center"
                                alignItems="center"
                              >
                                <Grid item>
                                  <Button
                                    color="primary"
                                    size="sm"
                                    id="BTNFIRSTNEXT"
                                    rel="noopener noreferrer"
                                    onClick={() => Step1NEXT()}
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
                    <div style={{ padding: 20 }}>
                      <Grid
                        container
                        justify="center"
                        alignItems="center"
                        className={classes.columSpace}
                        spacing={2}
                      >
                        <Hidden only={["xs", "sm"]}>
                          <Grid item md={4}>
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
                        <Grid item md={4}>
                          <Grid container justify="center" alignItems="center">
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
                        <Grid item md={4}>
                          <Grid container justify="center" alignItems="center">
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
                    </div>
                    <Grid container justify="flex-end" alignItems="center">
                      <Grid item>
                        <Button
                          color="warning"
                          size="sm"
                          rel="noopener noreferrer"
                          onClick={() => Step2PREV()}
                        >
                          <ArrowBack className={classes.arrowIconBack} />
                          Anterior
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: 20 }}>
                      <Grid
                        container
                        justify="center"
                        alignItems="center"
                        className={classes.columSpace}
                      >
                        <Hidden xsDown>
                          <Grid item md={4}>
                            <Grid
                              container
                              justify="center"
                              alignItems="center"
                            >
                              <img
                                src={manPc}
                                className={classes.logo}
                                alt="logotipo"
                              />
                            </Grid>
                          </Grid>
                        </Hidden>
                        <Grid item md={8}>
                          <Grid container direction="column">
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
                                    id="CPF"
                                    name="CPF"
                                    label="CPF"
                                    value={cpf}
                                    onChange={(e) => handleCPF(e.target.value)}
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    id="CELULAR"
                                    name="CELULAR"
                                    label="CELULAR"
                                    value={celular}
                                    onChange={(e) =>
                                      OnchangeCELULAR(e.target.value)
                                    }
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    id="NASCIMENTO"
                                    name="NASCIMENTO"
                                    label="NASCIMENTO"
                                    value={nascimento}
                                    onChange={(e) =>
                                      OnchangeNASCIMENTO(e.target.value)
                                    }
                                    fullWidth
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    id="NATURALIDADE"
                                    name="NATURALIDADE"
                                    label="NATURALIDADE"
                                    value={naturalidade}
                                    onChange={(e) =>
                                      OnchangeNATURALIDADE(e.target.value)
                                    }
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    id="NACIONALIDADE"
                                    name="NACIONALIDADE"
                                    label="NACIONALIDADE"
                                    value={nacionalidade}
                                    onChange={(e) =>
                                      OnchangeNACIONALIDADE(e.target.value)
                                    }
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    id="ESTADOCIVIL"
                                    name="estado_civil"
                                    select
                                    label="ESTADOCIVIL"
                                    fullWidth
                                    value={estado_civil}
                                    onChange={(e) =>
                                      OnchangeESTADOCIVIL(e.target.value)
                                    }
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
                                    id="RG"
                                    name="RG"
                                    label="RG"
                                    value={rg}
                                    onChange={(e) => OnchangeRG(e.target.value)}
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                  <TextField
                                    id="EMISSOR"
                                    name="EMISSOR"
                                    label="ORGÃO EMISSOR"
                                    value={emissor}
                                    onChange={(e) =>
                                      OnchangeEMISSOR(e.target.value)
                                    }
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                  <TextField
                                    id="EMISSAO"
                                    name="EMISSAO"
                                    label="DATA EMISSAO"
                                    value={emissao}
                                    onChange={(e) =>
                                      OnchangeEMISSAO(e.target.value)
                                    }
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                  <TextField
                                    id="SEXO"
                                    name="sexo"
                                    select
                                    label="SEXO"
                                    fullWidth
                                    value={sexo}
                                    onChange={(e) =>
                                      OnchangeSEXO(e.target.value)
                                    }
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
                                    id="NOMEMAE"
                                    name="MAE"
                                    label="NOME DA MÃE"
                                    value={mae}
                                    onChange={(e) =>
                                      OnchangeMAE(e.target.value)
                                    }
                                    fullWidth
                                    maxLength={2}
                                    inputProps={{
                                      maxLength: 5,
                                      // inputProps: { maxLength: 2 },
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid container spacing={3}>
                                <Grid item xs={12} md={12}>
                                  <TextField
                                    id="NOMEPAI"
                                    name="PAI"
                                    label="NOME DO PAI"
                                    value={pai}
                                    onChange={(e) =>
                                      OnchangePAI(e.target.value)
                                    }
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
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      className={classes.columSpace}
                    >
                      <Hidden xsDown>
                        <Grid item md={6}>
                          <Grid container justify="center" alignItems="center">
                            <img
                              src={manPc}
                              className={classes.logo}
                              alt="logotipo"
                            />
                          </Grid>
                        </Grid>
                      </Hidden>
                      <Grid item md={6}>
                        <Grid container direction="column" spacing={2}>
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
                                  id="CEP"
                                  name="CEP"
                                  label="CEP"
                                  value={cep}
                                  onChange={(e) => OnchangeCEP(e.target.value)}
                                  fullWidth
                                  inputProps={{
                                    maxLength: 8,
                                  }}
                                />
                              </Grid>
                              <Grid item md={7}>
                                <TextField
                                  id="ENDERECO"
                                  name="ENDERECO"
                                  label="ENDEREÇO"
                                  value={endereco}
                                  onChange={(e) =>
                                    OnchangeENDERECO(e.target.value)
                                  }
                                  fullWidth
                                />
                              </Grid>
                              <Grid item md={2}>
                                <TextField
                                  id="NUMERO"
                                  name="NUMERO"
                                  label="NÚMERO"
                                  value={numero}
                                  onChange={(e) =>
                                    OnchangeNUMERO(e.target.value)
                                  }
                                  fullWidth
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={3}>
                              <Grid item md={6}>
                                <TextField
                                  id="BAIRRO"
                                  name="BAIRRO"
                                  label="BAIRRO"
                                  value={bairro}
                                  onChange={(e) =>
                                    OnchangeBAIRRO(e.target.value)
                                  }
                                  fullWidth
                                />
                              </Grid>
                              <Grid item md={6}>
                                <TextField
                                  id="COMPLEMENTO"
                                  name="COMPLEMENTO"
                                  label="COMPLEMENTO"
                                  value={complemento}
                                  onChange={(e) =>
                                    OnchangeCOMPLEMENTO(e.target.value)
                                  }
                                  fullWidth
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={3}>
                              <Grid item>
                                <TextField
                                  id="CIDADE"
                                  name="CIDADE"
                                  label="CIDADE"
                                  value={cidade}
                                  onChange={(e) =>
                                    OnchangeCIDADE(e.target.value)
                                  }
                                  fullWidth
                                />
                              </Grid>
                              <Grid item>
                                <TextField
                                  id="ESTADO"
                                  name="ESTADO"
                                  label="ESTADO"
                                  value={estado}
                                  onChange={(e) =>
                                    OnchangeESTADO(e.target.value)
                                  }
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
                  </Grid>
                  <Grid item md={12}>
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      className={classes.columSpace}
                    >
                      <Hidden xsDown>
                        <Grid item md={6}>
                          <Grid container justify="center" alignItems="center">
                            <img
                              src={manPc}
                              className={classes.logo}
                              alt="logotipo"
                            />
                          </Grid>
                        </Grid>
                      </Hidden>
                      <Grid item md={6}>
                        <Grid container direction="column" spacing={2}>
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
                                  id="CNPJ"
                                  name="CNPJ"
                                  label="CNPJ"
                                  value={cnpj}
                                  onChange={(e) => OnchangeCNPJ(e.target.value)}
                                  fullWidth
                                  inputProps={{ maxLength: 18 }}
                                  disabled={disabledfields}
                                />
                              </Grid>
                              <Grid item md={4}>
                                <TextField
                                  id="TELEFONE"
                                  name="TELEFONE"
                                  label="TELEFONE"
                                  value={telefone}
                                  onChange={(e) =>
                                    OnchangeTELEFONE(e.target.value)
                                  }
                                  fullWidth
                                  inputProps={{ maxLength: 14 }}
                                  disabled={disabledfields}
                                />
                              </Grid>
                              <Grid item md={4}>
                                <TextField
                                  id="SITE"
                                  name="SITE"
                                  label="SITE"
                                  value={site}
                                  onChange={(e) => OnchangeSITE(e.target.value)}
                                  fullWidth
                                  disabled={disabledfields}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={3}>
                              <Grid item md={4}>
                                <TextField
                                  id="RAZAOSOCIAL"
                                  name="RAZAOSOCIAL"
                                  label="RAZÃO SOCIAL"
                                  value={razaosocial}
                                  onChange={(e) =>
                                    OnchangeRAZAOSOCIAL(e.target.value)
                                  }
                                  fullWidth
                                  disabled={disabledfields}
                                />
                              </Grid>
                              <Grid item md={4}>
                                <TextField
                                  id="CNAE"
                                  name="CNAE"
                                  label="CNAE"
                                  value={cnae}
                                  onChange={(e) => OnchangeCNAE(e.target.value)}
                                  fullWidth
                                  disabled={disabledfields}
                                />
                              </Grid>
                              <Grid item md={4}>
                                <TextField
                                  id="NOMEFANTASIA"
                                  name="NOMEFANTASIA"
                                  label="NOME FANTASIA"
                                  value={nome_fantasia}
                                  onChange={(e) =>
                                    OnchangeNOMEFANTASIA(e.target.value)
                                  }
                                  fullWidth
                                  disabled={disabledfields}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={3}>
                              <Grid item md={3}>
                                <TextField
                                  id="CEPPJ"
                                  name="CEPPJ"
                                  label="CEP"
                                  value={ceppj}
                                  onChange={(e) =>
                                    OnchangeCEPPJ(e.target.value)
                                  }
                                  fullWidth
                                  disabled={disabledfields}
                                />
                              </Grid>
                              <Grid item md={6}>
                                <TextField
                                  id="ENDERECOPJ"
                                  name="ENDERECOPJ"
                                  label="ENDEREÇO"
                                  value={enderecopj}
                                  onChange={(e) =>
                                    OnchangeENDERECOPJ(e.target.value)
                                  }
                                  fullWidth
                                  disabled={disabledfields}
                                />
                              </Grid>
                              <Grid item md={3}>
                                <TextField
                                  id="NUMEROPJ"
                                  name="NUMEROPJ"
                                  label="NUMERO"
                                  value={numeropj}
                                  onChange={(e) =>
                                    OnchangeNUMEROPJ(e.target.value)
                                  }
                                  fullWidth
                                  disabled={disabledfields}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={3}>
                              <Grid item md={6}>
                                <TextField
                                  id="BAIRROPJ"
                                  name="BAIRROPJ"
                                  label="BAIRRO"
                                  value={bairropj}
                                  onChange={(e) =>
                                    OnchangeBAIRROPJ(e.target.value)
                                  }
                                  fullWidth
                                  disabled={disabledfields}
                                />
                              </Grid>
                              <Grid item md={6}>
                                <TextField
                                  id="COMPLEMENTOPJ"
                                  name="COMPLEMENTOPJ"
                                  label="COMPLEMENTO"
                                  value={complementopj}
                                  onChange={(e) =>
                                    OnchangeCOMPLEMENTOPJ(e.target.value)
                                  }
                                  fullWidth
                                  disabled={disabledfields}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container spacing={3}>
                              <Grid item md={6}>
                                <TextField
                                  id="CIDADEPJ"
                                  name="CIDADEPJ"
                                  label="CIDADE"
                                  value={cidadepj}
                                  onChange={(e) =>
                                    OnchangeCIDADEPJ(e.target.value)
                                  }
                                  fullWidth
                                  disabled
                                />
                              </Grid>
                              <Grid item md={6}>
                                <TextField
                                  id="ESTADOPJ"
                                  name="ESTADOPJ"
                                  label="ESTADO"
                                  value={estadopj}
                                  onChange={(e) =>
                                    OnchangeESTADOPJ(e.target.value)
                                  }
                                  fullWidth
                                  disabled
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
                              <ArrowBack className={classes.arrowIconBack} />
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
                              <ArrowForward className={classes.arrowIconBack} />
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={12}>
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      className={classes.columSpace}
                    >
                      <Hidden xsDown>
                        <Grid item md={6}>
                          <Grid container justify="center" alignItems="center">
                            <img
                              src={manPc}
                              className={classes.logo}
                              alt="logotipo"
                            />
                          </Grid>
                        </Grid>
                      </Hidden>
                      <Grid item md={6}>
                        <Grid container direction="column" spacing={2}>
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
                                  disabled={disabledfields}
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
                                  disabled={disabledfields}
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
                                  disabled={disabledfields}
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
                                  disabled={disabledfields}
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
                                  disabled={disabledfields}
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
                                  onClick={() => Register()}
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
                  </Grid>
                </Carousel>
              </Card>
              {/* </div> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ClassBackground />
    </>
  );
}
