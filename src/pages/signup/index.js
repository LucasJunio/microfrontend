import React, { useEffect, useRef } from "react";
import $ from "jquery";
// eslint-disable-next-line no-use-before-define
import axios from "axios"
// react component for creating beautiful carousel
import Carousel from "react-slick";
// material-ui components
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import bg_card_vileve from '../../assets/images/bg_card_assistencia.jpg'
import bg_card_gateway from '../../assets/images/bg_card_vilevepay.jpg'

import image1 from "assets/img/bg.jpg";
import image2 from "assets/img/bg2.jpg";
import image3 from "assets/img/bg3.jpg";

import CustomInput from "components/CustomInput/CustomInput.js";
import People from "@material-ui/icons/PeopleAltOutlined";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';

import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import logo from '../../assets/images/logo_vileve_way.png'
import Button from "components/CustomButtons/Button.js";

import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

import sha256 from 'crypto-js/sha256';

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
  Spinner
} from './styles'

import styles2 from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { insertUserRequest } from '../../store/modules/user/actions';
import { insertPersonRequest } from '../../store/modules/person/actions';
import { insertAddressCPFRequest, insertAddressCNPJRequest } from '../../store/modules/address/actions';
import { insertEnterpriseRequest } from '../../store/modules/enterprise/actions';
import { insertAccountRequest } from '../../store/modules/account/actions';
import { signupRequest } from '../../store/modules/signup/actions';
import { signupSuccess } from '../../store/modules/signup/actions';

import "./stylepagination.scss";

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);



export default function SectionCarousel() {

  const slickRef = useRef();
  const classes = useStyles();
  const classes2 = useStyles2();


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
    arrows: false
  };


  const dispatch = useDispatch();

  let loading = useSelector(state => state.signup.loading);
  let modal = useSelector(state => state.signup.modal);

  let usuario = useSelector(state => state.user.usuario, shallowEqual);
  let pessoa = useSelector(state => state.person.pessoa, shallowEqual);
  let conta = useSelector(state => state.account.conta, shallowEqual);
  let empresa = useSelector(state => state.enterprise.empresa, shallowEqual);
  let endereco_cpf = useSelector(state => state.address.endereco_cpf, shallowEqual);
  let endereco_cnpj = useSelector(state => state.address.endereco_cnpj, shallowEqual);

  const [Showloading, setShowloading] = React.useState('none');

  const [selectedEnabled, setSelectedEnabled] = React.useState(false);
  const [disabledfields, setdisabledfields] = React.useState(false)
  const [enablepj, setenablepj] = React.useState('none')
  const [enablepf, setenablepf] = React.useState('none')
  const [choicemodule, setchoice] = React.useState('')


  const maskdate = (v) => {
    v = v.replace(/\D/g, '');
    v = v.replace(/^(\d{2})(\d)/g, "$1/$2");
    v = v.replace(/(\d)(\d{4})$/, "$1/$2");
    return v;
  }

  const maskcel = (v) => {
    v = v.replace(/\D/g, '');             //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
  }

  const maskcpf = (v) => {
    v = v.replace(/\D/g, '');
    v = v.replace(/^(\d{3})/g, "$1.");
    v = v.replace(/(\d{3})(\d{3})/g, "$1.$2-");
    return v;
  }



  const masktelefone = (v) => {
    v = v.replace(/\D/g, '');             //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
  }

  const getcep = (v) => {
    v = v.replace(/\D/g, '');
    if (v.length >= 8) {
      setShowloading('')
      axios.get(`https://viacep.com.br/ws/${v}/json`)
        .then(res => {
          setShowloading('none');
          setENDERECO(res.data.logradouro);
          setBAIRRO(res.data.bairro);
          setCIDADE(res.data.localidade);
          setESTADO(res.data.uf)
        })
        .catch(error =>{
          setShowloading('none');
          alert(error.data)
        })
    } else {
      setShowloading('none');
      setENDERECO('');
      setBAIRRO('');
      setCIDADE('');
      setESTADO('')
    }
    return v;
  }

  const masknumero = (v) => {
    v = v.replace(/\D/g, '');
    return v;
  }

  const TestCPF=(strCPF)=> {
    var Soma;
    var Resto;
    var i;
    Soma = 0;
    strCPF = strCPF.replace(/\D/g, '')
  if (strCPF == "00000000000") return false;
  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.toString().substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.toString().substring(9, 10)) ) return false;
  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.toString().substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.toString().substring(10, 11) ) ) return false;
    return true;
  }

  const [nome, setNome] = React.useState('');
  const OnchangeNOME = v => { setNome(v); (/^[A-Za-z-ç.-]+(\s*[A-Za-z-ç.-]+)*$/).test(v) || v.length < 1 ? $('#descriptionnome').html('') : $('#descriptionnome').html('Digite apenas letras no campo nome!') }

  const [email, setEmail] = React.useState('');
  const OnchangeEMAIL = v => { setEmail(v); (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(v) || v.length < 1 ? $('#descriptionemail').html('') : $('#descriptionemail').html('Digite um email válido') }

  const [celular, setCelular] = React.useState('');
  const OnchangeCELULAR = v => { setCelular(maskcel(v)) }

  const [cpf, setCPF] = React.useState('');
  const OnchangeCPF = v => { setCPF(maskcpf(v)) }

  const [senha, setSenha] = React.useState('');
  const [senha2, setSenha2] = React.useState('');
  const [Iconsenha, setIconSenha] = React.useState('lock_Outline');
  const [ColorInputClass, setColorInputClass] = React.useState(false);
  const [ColorInputClass2, setColorInputClass2] = React.useState(false);

  const OnchangeSENHA = v => {
    setSenha(v);
    if ((/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/).test(v)) {
      setIconSenha('check_Outline'); setColorInputClass(true); $('#descriptionpassword').html('')
    } else { setIconSenha('lock_Outline'); setColorInputClass(false); $('#descriptionpassword').html(`A senha deve conter mínimo de oito caracteres, <br> pelo menos, uma letra maiúscula, uma letra minúscula, <br> números e um caractere especial`) }
  }

  const OnchangeSENHA2 = v => {
    setSenha2(v);
    if (senha == v) {
      setColorInputClass2(true)
      $('#descriptionpassword2').html('')
    } else {
      setColorInputClass2(false)
      $('#descriptionpassword2').html(`Sua senha não corresponde à anterior, verifique sua digitação!`)
    }
  }

  const [cep, setCEP] = React.useState('');
  const OnchangeCEP = v => { setCEP(getcep(v)) }

  const [nascimento, setNASCIMENTO] = React.useState('');
  const OnchangeNASCIMENTO = v => { setNASCIMENTO(maskdate(v)) }

  const [rg, setRG] = React.useState('');
  const OnchangeRG = v => { setRG(v) }

  const [emissor, setEMISSOR] = React.useState('');
  const OnchangeEMISSOR = v => { setEMISSOR(v) }

  const [emissao, setEMISSAO] = React.useState('');
  const OnchangeEMISSAO = v => { setEMISSAO(maskdate(v)) }

  const [sexo, setSEXO] = React.useState('');
  const OnchangeSEXO = v => { setSEXO(v) }

  const [endereco, setENDERECO] = React.useState('');
  const OnchangeENDERECO = v => { setENDERECO(v) }

  const [numero, setNUMERO] = React.useState('');
  const OnchangeNUMERO = v => { setNUMERO(masknumero(v)) }

  const [bairro, setBAIRRO] = React.useState('');
  const OnchangeBAIRRO = v => { setBAIRRO(v) }

  const [complemento, setCOMPLEMENTO] = React.useState('');
  const OnchangeCOMPLEMENTO = v => { setCOMPLEMENTO(v) }

  const [cidade, setCIDADE] = React.useState('');
  const OnchangeCIDADE = v => { setCIDADE(v) }

  const [estado, setESTADO] = React.useState('');
  const OnchangeESTADO = v => { setESTADO(v.replace(/[^a-zA-ZçÇ]/g, '')) }

  const [estado_civil, setESTADOCIVIL] = React.useState('');
  const OnchangeESTADOCIVIL = v => { setESTADOCIVIL(v) }

  const [naturalidade, setNATURALIDADE] = React.useState('');
  const OnchangeNATURALIDADE = v => { setNATURALIDADE(v.replace(/[^a-zA-ZçÇ]/g, '')) }

  const [nacionalidade, setNACIONALIDADE] = React.useState('');
  const OnchangeNACIONALIDADE = v => { setNACIONALIDADE(v.replace(/[^a-zA-ZçÇ]/g, '')) }

  const [mae, setMAE] = React.useState('');
  const OnchangeMAE = v => { setMAE(v) }

  const [pai, setPAI] = React.useState('');
  const OnchangePAI = v => { setPAI(v) }

  const [razaosocial, setRAZAOSOCIAL] = React.useState('');
  const OnchangeRAZAOSOCIAL = v => { setRAZAOSOCIAL(v) }

  const [nome_fantasia, setNOMEFANTASIA] = React.useState('');
  const OnchangeNOMEFANTASIA = v => { setNOMEFANTASIA(v) }

  const [cnpj, setCNPJ] = React.useState('');
  const OnchangeCNPJ = v => { setCNPJ(getcnpj(v)) }

  const getcnpj = (v) => {
    v = v.replace(/\D/g, '');
    if (v.length >= 14) {
      setShowloading('');
      axios.get(`https://consulta-empresa-cnpj-e-socios.p.rapidapi.com/cnpj/${v}`, {
        headers: {
          'x-rapidapi-key': 'bdac259fe4msh125d80880f7225ap14cc31jsn0ee569b9cbfd',
          'x-rapidapi-host': 'consulta-empresa-cnpj-e-socios.p.rapidapi.com'
        }
      })
        .then(res => {
          setShowloading('none');
          setRAZAOSOCIAL(res.data.name);
          setNOMEFANTASIA(res.data.alias);
          setCIDADEPJ(res.data.address.city);
          setENDERECOPJ(res.data.address.street);
          setESTADOPJ(res.data.address.state);
          setNUMEROPJ(res.data.address.number);
          setBAIRROPJ(res.data.address.neighborhood);
          setTELEFONE(masktelefone(res.data.phone.phone_1));
          setCEPPJ(res.data.address.zip_code);
          setCNAE(res.data.legal_nature.code)
        })
        .catch(error =>{
          setShowloading('none');
          alert(error)
        })
    } else {
      setShowloading('none');
      setRAZAOSOCIAL('');
      setNOMEFANTASIA('');
      setCIDADEPJ('');
      setENDERECOPJ('');
      setESTADOPJ('');
      setNUMEROPJ('');
      setBAIRROPJ('');
      setTELEFONE('');
      setCEPPJ('');
      setCNAE('');
    }
    v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3\/\$4-$5");
    return v;
  }


  const [telefone, setTELEFONE] = React.useState('');
  const OnchangeTELEFONE = v => { setTELEFONE(masktelefone(v)) }

  const [site, setSITE] = React.useState('');
  const OnchangeSITE = v => { setSITE(v) }

  const [ceppj, setCEPPJ] = React.useState('');
  const OnchangeCEPPJ = v => { setCEPPJ(masknumero(v)) }

  const [cnae, setCNAE] = React.useState('');
  const OnchangeCNAE = v => { setCNAE(masknumero(v)) }

  const [enderecopj, setENDERECOPJ] = React.useState('');
  const OnchangeENDERECOPJ = v => { setENDERECOPJ(v) }

  const [numeropj, setNUMEROPJ] = React.useState('');
  const OnchangeNUMEROPJ = v => { setNUMEROPJ(masknumero(v)) }

  const [bairropj, setBAIRROPJ] = React.useState('');
  const OnchangeBAIRROPJ = v => { setBAIRROPJ(v) }

  const [estadopj, setESTADOPJ] = React.useState('');
  const OnchangeESTADOPJ = v => { setESTADOPJ(v) }

  const [cidadepj, setCIDADEPJ] = React.useState('');
  const OnchangeCIDADEPJ = v => { setCIDADEPJ(v) }

  const [complementopj, setCOMPLEMENTOPJ] = React.useState('');
  const OnchangeCOMPLEMENTOPJ = v => { setCOMPLEMENTOPJ(v) }

  const [bancopj, setBANCOPJ] = React.useState('');
  const OnchangeBANCOPJ = v => { setBANCOPJ(v) }

  const [agenciapj, setAGENCIAPJ] = React.useState('');
  const OnchangeAGENCIAPJ = v => { setAGENCIAPJ(v) }

  const [contapj, setCONTAPJ] = React.useState('');
  const OnchangeCONTAPJ = v => { setCONTAPJ(v) }

  const [pixpj, setPIXPJ] = React.useState('');
  const OnchangePIXPJ = v => { setPIXPJ(v) }

  const [operacaopj, setOPERACAOPJ] = React.useState('');
  const OnchangeOPERACAOPJ = v => { setOPERACAOPJ(v) }

  // const [nickname, setNICKNAME] = React.useState('');
  // const OnchangeNICKNAME = v => { setNICKNAME(v) }

  const dotActive = 'pagination__link'
  const dotInactive = 'pagination__link is_active'
  const [dot1, setDOT1] = React.useState(dotActive);
  const [dot2, setDOT2] = React.useState(dotInactive);
  const [dot3, setDOT3] = React.useState(dotInactive);
  const [dot4, setDOT4] = React.useState(dotInactive);
  const [dot5, setDOT5] = React.useState(dotInactive);
  const [dot6, setDOT6] = React.useState(dotInactive);

  const Step1NEXT = () => {
    if (nome.length < 5 || !(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(email) || !(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/).test(senha)) {
      alert('Todos os campos são obrigatórios, favor revise seu formulário!')
    } else {
      //vai para o próximo slide depois coloca o marcardo1 como inativo e o marcador2 como ativo
      slickRef.current.slickNext(); setDOT1(dotInactive); setDOT2(dotActive)
      // insertUserRequest({ nome, email, senha })
    }
  }

  const Step2PJ = () => {
    slickRef.current.slickNext(); setDOT2(dotInactive); setDOT3(dotActive)

  }

  const Step2PF = () => {
    // Pessoa física será implementado
  }

  const Step2PREV = () => {
    slickRef.current.slickPrev(); setDOT2(dotInactive); setDOT1(dotActive)
  }

  const Step3PREV = () => {
    slickRef.current.slickPrev(); setDOT3(dotInactive); setDOT2(dotActive)
  }

  const Step3NEXT = () => {
    if(TestCPF(cpf)){
      slickRef.current.slickNext(); setDOT3(dotInactive); setDOT4(dotActive)
      insertPersonRequest({
        cpf, celular, nascimento, naturalidade,
        nacionalidade, estado_civil, rg, emissor,
        emissao, sexo, mae, pai
      })
    }else{
      alert('Desculpe, informe um cpf válido!')
    }
  }

  const Step4PREV = () => {
    slickRef.current.slickPrev(); setDOT4(dotInactive); setDOT3(dotActive)
  }

  const Step4NEXT = () => {
    slickRef.current.slickNext(); setDOT4(dotInactive); setDOT5(dotActive)
    insertAddressCPFRequest({
      cep: masknumero(cep),
      complemento,
      endereco,
      bairro
    })
  }

  const Step5PREV = () => {
    slickRef.current.slickPrev(); setDOT5(dotInactive); setDOT4(dotActive)
  }

  const Step5NEXT = () => {
    slickRef.current.slickNext(); setDOT5(dotInactive); setDOT6(dotActive)
    insertAddressCNPJRequest({
      cep: masknumero(ceppj),
      complemento: complementopj,
      endereco: enderecopj,
      numero: masknumero(numeropj),
      bairro: bairropj
    })
    insertEnterpriseRequest({
      cnpj: masknumero(cnpj),
      cnae: cnae,
      razao_social: razaosocial,
      telefone_fixo: masknumero(telefone),
      celular: masknumero(celular),
      nome_fantasia: nome_fantasia,
      site: site
    })
  }

  const Step6PREV = () => {
    slickRef.current.slickPrev(); setDOT6(dotInactive); setDOT5(dotActive)
  }

  const Step6NEXT = () => {
    // slickRef.current.slickNext();setDOT6(dotInactive);setDOT7(dotActive)    
  }

  const [openmodal, setOpenmodal] = React.useState(false);
  const handleClose = () => {
    top.location.href = '/';
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
        nome: nome,
        email: email,
        senha: sha256(senha).toString()
      },
      pessoa: {
        cpf: masknumero(cpf),
        celular: masknumero(celular),
        nascimento: nascimento,
        naturalidade: naturalidade,
        nacionalidade: nacionalidade,
        estado_civil: estado_civil,
        rg: rg,
        emissor: emissor,
        emissao: emissao,
        sexo: sexo,
        mae: mae,
        pai: pai
      },
      empresa: {
        cnpj: masknumero(cnpj),
        cnae: cnae,
        razao_social: razaosocial,
        telefone_fixo: masknumero(telefone),
        celular: masknumero(celular),
        nome_fantasia: nome_fantasia,
        site: site
      },
      conta: {
        banco: bancopj,
        agencia: masknumero(agenciapj),
        conta: masknumero(contapj),
        operacao: masknumero(operacaopj),
        pix: pixpj
      },
      endereco_cnpj: {
        cep: masknumero(ceppj),
        complemento: complementopj,
        endereco: enderecopj,
        numero: masknumero(numeropj),
        bairro: bairropj,
        cidadepj: cidadepj,
        estadopj: estadopj
      },
      endereco_cpf: {
        cep: masknumero(cep),
        complemento: complemento,
        endereco: endereco,
        bairro: bairro,
        cidade: cidade,
        estado: estado
      }

    }


    setShowloading('')
    $.ajax({
      url: 'http://3.233.0.255:3001/signup',
      type: 'POST',
      data: objectJSONPJ,
      crossDomain: true,
      cache: false,
      success: (result) => {
        console.log(result);
        dispatch(signupSuccess())
        localStorage.setItem('token', result.token);
        setShowloading('none');
        setOpenmodal(true);
        $('#form-dialog-title').html(`Confirme seu e-mail`);
        $('#form-dialog-body').html(`<b>Seja bem vindo à Vileve,</b> enviamos um <b>email</b> para você, para continuarmos <b>clique no link enviado</b> para confirmar seu email.`);

      },
      error: (error) => {
        setShowloading('none');
        setOpenmodal(true);
        $('#form-dialog-title').html(`Erro`);
        $('#form-dialog-body').html(`<b>Erro :(</b> Houve um erro no envio: ${error.responseJSON.name}.`);
      }
    })

    // dispatch(signupRequest({ usuario, pessoa, conta, empresa, endereco_cnpj, endereco_cpf }));
    // dispatch(signupRequest({ nome, email, celular, senha }));
    // }
  }

  return (

    <>

      <Loading style={{ display: Showloading }}><Spinner /></Loading>


      <Dialog open={openmodal} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">


          
          </DialogTitle>
        <DialogContent>
          <DialogContentText id="form-dialog-body">


          
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="success">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Pagination>
        <div style={{ position: 'absolute', width: '70%' }}>
          <div style={{ position: 'absolute', right: 0 }}>
            <div className="wrapper">
              <ul className="pagination">
                <li className="pagination__item"><a href="#" className={dot1}></a></li>
                <li className="pagination__item"><a href="#" className={dot2}></a></li>
                <li className="pagination__item"><a href="#" className={dot3}></a></li>
                <li className="pagination__item"><a href="#" className={dot4}></a></li>
                <li className="pagination__item"><a href="#" className={dot5}></a></li>
                <li className="pagination__item"><a href="#" className={dot6}></a></li>
              </ul>
            </div>
          </div>
        </div>
      </Pagination>

      <Classlogotipo><img src={logo} style={{ width: 150 }} alt="logotipo"></img></Classlogotipo>

      <Card style={{ position: 'absolute', marginTop: '8%' }}>
        <Carousel ref={slickRef} {...settings} style={{ paddingBottom: 50 }} >

          <div>
            <ContainerCard>
              <Card style={{ width: '80%', padding: 20 }}>


                <Containerform>

                  <Containerleft>
                    <Imageleft1></Imageleft1>
                  </Containerleft>

                  <Containerright>

                    <TitleWelcome>Informe os dados de <span style={{ color: '#9D2AB1' }}>Usuário</span></TitleWelcome>


                    <MarginField style={{ width: '100%' }}>
                      <CustomInput
                        labelText="NOME COMPLETO"
                        // id="NOME"
                        name="NOME"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          onChange: (e) => OnchangeNOME(e.target.value),
                          autoComplete: "off",
                        }}
                      />
                      <DescriptionText><div id="descriptionnome"></div></DescriptionText>
                    </MarginField>


                    <MarginField style={{ width: '100%' }}>
                      <CustomInput
                        labelText="EMAIL"
                        // id="EMAIL"
                        name="EMAIL"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          onChange: (e) => OnchangeEMAIL(e.target.value),
                          autoComplete: "off",
                        }}
                      />
                      <DescriptionText><div id="descriptionemail"></div></DescriptionText>

                    </MarginField>




                    {/* <MarginField >
                      <CustomInput
                        labelText="NICKNAME"
                        // id="SENHA"
                        name="NICKNAME"
                        formControlProps={{ fullWidth: false }}
                        success={ColorInputClass}
                        inputProps={{
                          type: "nickname",
                          onChange: (e) => OnchangeNICKNAME(e.target.value),
                          value: nickname,
                          autoComplete: "off",
                        }}
                      />
                    </MarginField> */}

                    <MarginField >
                      <CustomInput
                        labelText="SENHA"
                        // id="SENHA"
                        name="SENHA"
                        formControlProps={{ fullWidth: false }}
                        success={ColorInputClass}
                        inputProps={{
                          type: "password",
                          onChange: (e) => OnchangeSENHA(e.target.value),
                          value: senha,
                          // endAdornment: (
                          //   <InputAdornment position="end">
                          //     <Icon className={classes.inputIconsColor}>{Iconsenha}</Icon>
                          //   </InputAdornment>
                          // ),
                          autoComplete: "off",
                        }}
                      />
                      <DescriptionText>
                        <div id="descriptionpassword">A senha deve conter mínimo de oito caracteres,  pelo menos, uma letra maiúscula, uma letra minúscula, um número e um caractere especial </div>
                      </DescriptionText>
                    </MarginField>


                    <MarginField >
                      <CustomInput
                        labelText="CONFIRME SUA SENHA"
                        // id="SENHA"
                        name="SENHA2"
                        formControlProps={{ fullWidth: false }}
                        success={ColorInputClass2}
                        inputProps={{
                          type: "password",
                          onChange: (e) => OnchangeSENHA2(e.target.value),
                          value: senha2,
                          // endAdornment: (
                          //   <InputAdornment position="end">
                          //     <Icon className={classes.inputIconsColor}>{Iconsenha}</Icon>
                          //   </InputAdornment>
                          // ),
                          autoComplete: "off",
                        }}
                      />
                      <DescriptionText>
                        <div id="descriptionpassword2">Confirme sua senha </div>
                      </DescriptionText>
                    </MarginField>


                    <PositionButton>
                      <Button
                        // simple
                        color="primary"
                        size="sm"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => Step1NEXT()}
                      >
                        Próximo
                        <ArrowForwardIcon style={{ marginLeft: 10 }} />
                      </Button>
                    </PositionButton>


                  </Containerright>
                </Containerform>

              </Card>
            </ContainerCard>

          </div>



          <div>
            <ContainerCard style={{ opacity: 0.99 }}>
              <Card style={{ width: '80%', padding: 20 }}>


                <Containerform>

                  <Containerleft>
                    <Imageleft2></Imageleft2>
                  </Containerleft>

                  <Containerright>


                    <main id="choiceform" className={classes.content} style={{ display: choicemodule }}>
                      <div className={classes.toolbar} />


                      <div style={{ display: "flex", marginTop: -15 }}>

                        <Card style={{ width: "20rem" }}>
                          <img
                            style={{ height: "180px", width: "100%", display: "block" }}
                            className={classes.imgCardTop}
                            src={bg_card_gateway}
                            alt="Card-img-cap"
                          />
                          <CardBody>
                            <h4 className={classes.cardTitle}><b>Para Sua Empresa</b></h4>
                            <p>Contrate a sua Plataforma de pagamentos online.</p>
                            {/* <Button color="info" onClick={() => slickRef.current.slickNext()} size="sm">Pessoa Jurídica</Button> */}

                            <Button color="info" onClick={() => Step2PJ()} size="sm">Pessoa Jurídica</Button>

                          </CardBody>
                        </Card>

                        <Card style={{ width: "20rem", marginLeft: "30px" }}>
                          <img
                            style={{ height: "180px", width: "100%", display: "block" }}
                            className={classes.imgCardTop}
                            src={bg_card_vileve}
                            alt="Card-img-cap"
                          />
                          <CardBody>
                            <h4 className={classes.cardTitle}><b>Para Você</b></h4>
                            <p>Clique abaixo para contratar o produto Vileve Assitência.</p>
                            <Button color="success" onClick={() => Step2PF()} size="sm">Pessoa Física</Button>
                          </CardBody>
                        </Card>


                      </div>

                    </main>




                    <PositionButton>
                      <Button
                        // simple
                        color="warning"
                        size="sm"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => Step2PREV()}

                      >

                        <ArrowBackIcon style={{ marginLeft: 0 }} />
                        Anterior
                      </Button>
                    </PositionButton>

                  </Containerright>
                </Containerform>

              </Card>
            </ContainerCard>

          </div>




          {/* ////////////////////////////////////////////////////////////////////////// */}

          <div>
            <ContainerCard style={{ opacity: 0.99 }}>
              <Card style={{ width: '80%', padding: 20 }}>


                <Containerform>

                  <Containerleft>
                    <Imageleft2></Imageleft2>
                  </Containerleft>

                  <Containerright>

                    <TitleWelcome>Informe os dados do <span style={{ color: '#9D2AB1' }}>Representante Legal</span></TitleWelcome>


                    <MarginField>
                      <CustomInput
                        labelText="CPF"
                        // id="CPF"
                        name="CPF"
                        formControlProps={{ fullWidth: false }}
                        inputProps={{
                          type: "text",
                          value: cpf,
                          onChange: (e) => OnchangeCPF(e.target.value),
                          inputProps: { maxLength: 14 },
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>


                    <MarginField>
                      <CustomInput
                        labelText="CELULAR"
                        // id="CELULAR"
                        name="CELULAR"
                        formControlProps={{ fullWidth: false }}
                        inputProps={{
                          type: "text",
                          value: celular,
                          onChange: (e) => OnchangeCELULAR(e.target.value),
                          inputProps: { maxLength: 15 },
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>




                    <MarginField style={{ width: '20%', clear: 'both' }}>
                      <CustomInput
                        labelText="NASCIMENTO"
                        // id="NASCIMENTO"
                        name="NASCIMENTO"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: nascimento,
                          onChange: (e) => OnchangeNASCIMENTO(e.target.value),
                          inputProps: { maxLength: 10 },
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>

                    <MarginField style={{ width: '20%' }}>
                      <CustomInput
                        labelText="NATURALIDADE"
                        // id="ESTADOCIVIL"
                        name="NATURALIDADE"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: naturalidade,
                          onChange: (e) => OnchangeNATURALIDADE(e.target.value),
                          inputProps: { maxLength: 20 },
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>


                    <MarginField style={{ width: '20%' }}>
                      <CustomInput
                        labelText="NACIONALIDADE"
                        // id="ESTADOCIVIL"
                        name="NACIONALIDADE"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: nacionalidade,
                          onChange: (e) => OnchangeNACIONALIDADE(e.target.value),
                          inputProps: { maxLength: 20 },
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>

                    <MarginField style={{ width: '10%', marginTop: 5 }}>
                      <FormControl style={{ padding: 0, margin: 0, width: 110 }} className={classes.formControl}>
                        <InputLabel style={{ fontSize: 12, marginTop: 5 }}>ESTADO CIVIL</InputLabel>
                        <Select
                          native
                          inputProps={{
                            name: 'estado_civil',
                            value: estado_civil,
                            onChange: (e) => OnchangeESTADOCIVIL(e.target.value),
                          }}
                        >
                          <option aria-label="None" value="" />

                          <option value='Solteiro'>Solteiro</option>
                          <option value='Casado'>Casado</option>
                          <option value='Separado'>Separado</option>
                          <option value='Viuvo'>Viúvo</option>
                          <option value='Divorciado'>Divorciado</option>

                        </Select>
                      </FormControl>
                    </MarginField>

                    <MarginField style={{ width: '15%', clear: 'both' }}>
                      <CustomInput
                        labelText="RG"
                        // id="RG"
                        name="RG"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: rg,
                          onChange: (e) => OnchangeRG(e.target.value),
                          inputProps: { maxLength: 15 },
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>


                    <MarginField style={{ width: '20%' }}>
                      <CustomInput
                        labelText="ORGÃO EMISSOR"
                        // id="EMISSOR"
                        name="EMISSOR"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: emissor,
                          onChange: (e) => OnchangeEMISSOR(e.target.value),
                          inputProps: { maxLength: 15 },
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>


                    <MarginField style={{ width: '20%' }}>
                      <CustomInput
                        labelText="DATA EMISSAO"
                        // id="EMISSAO"
                        name="EMISSAO"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: emissao,
                          onChange: (e) => OnchangeEMISSAO(e.target.value),
                          inputProps: { maxLength: 10 },
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>




                    <MarginField style={{ width: '10%', marginTop: 5 }}>
                      <FormControl style={{ padding: 0, margin: 0, width: 52 }} className={classes.formControl}>
                        <InputLabel style={{ fontSize: 12, marginTop: 5 }}>SEXO</InputLabel>
                        <Select
                          native
                          inputProps={{
                            name: 'sexo',
                            value: sexo,
                            onChange: (e) => OnchangeSEXO(e.target.value),
                          }}
                        >
                          <option aria-label="None" value="" />
                          <option value='M'>M</option>
                          <option value='F'>F</option>
                        </Select>
                      </FormControl>
                    </MarginField>

                    <MarginField style={{ width: '85%' }}>
                      <CustomInput
                        labelText="NOME DA MÃE"
                        // id="CEP"
                        name="MAE"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: mae,
                          onChange: (e) => OnchangeMAE(e.target.value),
                          inputProps: { maxLength: 50 },
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>


                    <MarginField style={{ width: '85%', clear: 'both' }}>
                      <CustomInput
                        labelText="NOME DO PAI"
                        // id="CEP"
                        name="PAI"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: pai,
                          onChange: (e) => OnchangePAI(e.target.value),
                          inputProps: { maxLength: 50 },
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>

                    <PositionButton style={{ marginRight: 170 }}>
                      <Button
                        // simple
                        color="warning"
                        size="sm"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => Step3PREV()}

                      >

                        <ArrowBackIcon style={{ marginRight: 10 }} />
                        Anterior
                      </Button>
                    </PositionButton>



                    <PositionButton>
                      <Button
                        // simple
                        color="primary"
                        size="sm"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => Step3NEXT()}

                      >
                        Próximo
                        <ArrowForwardIcon style={{ marginLeft: 10 }} />
                      </Button>
                    </PositionButton>


                  </Containerright>
                </Containerform>





              </Card>
            </ContainerCard>

          </div>

          {/* ////////////////////////////////////////////////////////////////////////// */}

          <div>
            <ContainerCard style={{ opacity: 0.99 }}>
              <Card style={{ width: '80%', padding: 20 }}>


                <Containerform>

                  <Containerleft>
                    <Imageleft2></Imageleft2>
                  </Containerleft>

                  <Containerright>

                    {/* <p style={{ position:"absolute", textAlign:"center", width:'43%',  fontSize: 13, color: '#125984' }}>Dados do Representante Legal!</p> */}
                    <TitleWelcome>Informe os Dados de <span style={{ color: '#9D2AB1' }}> Endereço do Representante Legal</span></TitleWelcome>



                    <MarginField style={{ width: '15%' }}>
                      <CustomInput
                        labelText="CEP"
                        // id="CEP"
                        name="CEP"
                        formControlProps={{ fullWidth: false }}
                        inputProps={{
                          type: "text",
                          value: cep,
                          onChange: (e) => OnchangeCEP(e.target.value),
                          inputProps: { maxLength: 8 },
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>


                    <MarginField style={{ width: '60%' }}>
                      <CustomInput
                        labelText="ENDEREÇO"
                        // id="ENDERECO"
                        name="ENDERECO"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          // readOnly: true,
                          value: endereco,
                          onChange: (e) => OnchangeENDERECO(e.target.value),
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>

                    <MarginField style={{ width: '10%' }}>
                      <CustomInput
                        labelText="NÚMERO"
                        // id="NUMERO"
                        name="NUMERO"
                        formControlProps={{ fullWidth: false }}
                        inputProps={{
                          type: "text",
                          value: numero,
                          onChange: (e) => OnchangeNUMERO(e.target.value),
                          inputProps: { maxLength: 5 },
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>

                    <MarginField style={{ width: '50%' }}>
                      <CustomInput
                        labelText="BAIRRO"
                        // id="BAIRRO"
                        name="BAIRRO"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          // readOnly: true,
                          value: bairro,
                          onChange: (e) => OnchangeBAIRRO(e.target.value),
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>

                    <MarginField style={{ width: '40%' }}>
                      <CustomInput
                        labelText="COMPLEMENTO"
                        // id="COMPLEMENTO"
                        name="COMPLEMENTO"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: complemento,
                          onChange: (e) => OnchangeCOMPLEMENTO(e.target.value),
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>


                    <MarginField style={{ width: '40%' }}>
                      <CustomInput
                        labelText="CIDADE"
                        // id="CIDADE"
                        name="CIDADE"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          // readOnly: true,
                          value: cidade,
                          onChange: (e) => OnchangeCIDADE(e.target.value),
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>

                    <MarginField style={{ width: '20%' }}>
                      <CustomInput
                        labelText="ESTADO"
                        // id="ESTADO"
                        name="ESTADO"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: estado,
                          // readOnly: true,
                          onChange: (e) => OnchangeESTADO(e.target.value),
                          inputProps: { maxLength: 2 },
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>





                    <PositionButton style={{ marginRight: 170 }}>
                      <Button
                        // simple
                        color="warning"
                        size="sm"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => Step4PREV()}

                      >

                        <ArrowBackIcon style={{ marginRight: 10 }} />
                        Anterior
                      </Button>
                    </PositionButton>



                    <PositionButton>
                      <Button
                        // simple
                        color="primary"
                        size="sm"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => Step4NEXT()}

                      >
                        Próximo
                        <ArrowForwardIcon style={{ marginLeft: 10 }} />
                      </Button>
                    </PositionButton>


                  </Containerright>
                </Containerform>





              </Card>
            </ContainerCard>

          </div>



          {/* ////////////////////////////////////////////////////////////////////////// */}

          <div>
            <ContainerCard style={{ opacity: 0.99 }}>
              <Card style={{ width: '80%', padding: 20 }}>


                <Containerform>

                  <Containerleft>
                    <Imageleft2></Imageleft2>
                  </Containerleft>

                  <Containerright>

                    {/* <p style={{ position:"absolute", textAlign:"center", width:'43%',  fontSize: 13, color: '#125984' }}>Dados do Representante Legal!</p> */}
                    <TitleWelcome>Informe os dados de <span style={{ color: '#9D2AB1' }}>de Sua Empresa</span></TitleWelcome>


                    <MarginField style={{ width: '25%' }}>
                      <CustomInput
                        labelText="CNPJ"
                        // id="CNPJ"
                        name="CNPJ"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: cnpj,
                          onChange: (e) => OnchangeCNPJ(e.target.value),
                          inputProps: { maxLength: 18 },
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>
                    <MarginField style={{ width: '25%' }}>
                      <CustomInput
                        labelText="TELEFONE"
                        // id="CNPJ"
                        name="TELEFONE"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: telefone,
                          onChange: (e) => OnchangeTELEFONE(e.target.value),
                          inputProps: { maxLength: 14 },
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>
                    <MarginField style={{ width: '38%' }}>
                      <CustomInput
                        labelText="SITE"
                        // id="CNPJ"
                        name="SITE"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: site,
                          onChange: (e) => OnchangeSITE(e.target.value),
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>
                    <MarginField style={{ width: '35%' }}>
                      <CustomInput
                        labelText="RAZÃO SOCIAL"
                        // id="RAZAOSOCIAL"
                        name="RAZAOSOCIAL"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: razaosocial,
                          onChange: (e) => OnchangeRAZAOSOCIAL(e.target.value),
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>
                    <MarginField style={{ width: '15%' }}>
                      <CustomInput
                        labelText="CNAE"
                        // id="NOMEFANTASIA"
                        name="CNAE"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          // id:"CNAE",
                          type: "text",
                          value: cnae,
                          onChange: (e) => OnchangeCNAE(e.target.value),
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>
                    <MarginField style={{ width: '35%' }}>
                      <CustomInput
                        labelText="NOME FANTASIA"
                        // id="NOMEFANTASIA"
                        name="NOMEFANTASIA"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          // id:"NOMEFANTASIA",
                          type: "text",
                          value: nome_fantasia,
                          onChange: (e) => OnchangeNOMEFANTASIA(e.target.value),
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>
                    <MarginField style={{ width: '15%' }}>
                      <CustomInput
                        labelText="CEP"
                        // id="NOMEFANTASIA"
                        name="CEPPJ"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          // id:"CEPPJ",
                          type: "text",
                          value: ceppj,
                          onChange: (e) => OnchangeCEPPJ(e.target.value),
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>
                    <MarginField style={{ width: '60%' }}>
                      <CustomInput
                        labelText="ENDEREÇO"
                        // id="NOMEFANTASIA"
                        name="ENDERECOPJ"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          // id:"ENDERECOPJ",
                          type: "text",
                          value: enderecopj,
                          onChange: (e) => OnchangeENDERECOPJ(e.target.value),
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>
                    <MarginField style={{ width: '10%' }}>
                      <CustomInput
                        labelText="NUMERO"
                        // id="NOMEFANTASIA"
                        name="NUMEROPJ"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          // id:"NUMEROPJ",
                          type: "text",
                          value: numeropj,
                          onChange: (e) => OnchangeNUMEROPJ(e.target.value),
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>

                    <MarginField style={{ width: '35%' }}>
                      <CustomInput
                        labelText="BAIRRO"
                        // id="NOMEFANTASIA"
                        name="BAIRROPJ"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          // id:"NOMEFANTASIA",
                          type: "text",
                          value: bairropj,
                          onChange: (e) => OnchangeBAIRROPJ(e.target.value),
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>


                    <MarginField style={{ width: '50%' }}>
                      <CustomInput
                        labelText="COMPLEMENTO"
                        // id="NOMEFANTASIA"
                        name="COMPLEMENTOPJ"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          // id:"COMPLEMENTOPJ",
                          type: "text",
                          value: complementopj,
                          onChange: (e) => OnchangeCOMPLEMENTOPJ(e.target.value),
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>

                    <MarginField style={{ width: '40%' }}>
                      <CustomInput
                        labelText="CIDADE"
                        // id="CIDADE"
                        name="CIDADEPJ"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          readOnly: true,
                          value: cidadepj,
                          onChange: (e) => OnchangeCIDADEPJ(e.target.value),
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>

                    <MarginField style={{ width: '20%' }}>
                      <CustomInput
                        labelText="ESTADO"
                        // id="ESTADO"
                        name="ESTADOPJ"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: estadopj,
                          readOnly: true,
                          onChange: (e) => OnchangeESTADOPJ(e.target.value),
                          inputProps: { maxLength: 2 },
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>





                    <PositionButton style={{ marginRight: 170 }}>
                      <Button
                        // simple
                        color="warning"
                        size="sm"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => Step5PREV()}

                      >

                        <ArrowBackIcon style={{ marginRight: 10 }} />
                        Anterior
                      </Button>
                    </PositionButton>



                    <PositionButton>
                      <Button
                        // simple
                        color="primary"
                        size="sm"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => Step5NEXT()}

                      >
                        Próximo
                        <ArrowForwardIcon style={{ marginLeft: 10 }} />
                      </Button>
                    </PositionButton>


                  </Containerright>
                </Containerform>





              </Card>
            </ContainerCard>

          </div>

          {/* ////////////////////////////////////////////////////////////////////////// */}

          <div>
            <ContainerCard style={{ opacity: 0.99 }}>
              <Card style={{ width: '80%', padding: 20 }}>


                <Containerform>

                  <Containerleft>
                    <Imageleft2></Imageleft2>
                  </Containerleft>

                  <Containerright>

                    <TitleWelcome>Ainda sobre o seu negócio, quais os <span style={{ color: '#9D2AB1' }}>dados bancários da sua empresa?</span></TitleWelcome>



                    <MarginField style={{ width: '38%' }}>
                      <CustomInput
                        labelText="BANCO"
                        // id="CNPJ"
                        name="BANCOPJ"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: bancopj,
                          onChange: (e) => OnchangeBANCOPJ(e.target.value),
                          inputProps: { maxLength: 18 },
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>
                    <MarginField style={{ width: '20%' }}>
                      <CustomInput
                        labelText="AGENCIA"
                        // id="CNPJ"
                        name="AGENCIAPJ"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: agenciapj,
                          onChange: (e) => OnchangeAGENCIAPJ(e.target.value),
                          inputProps: { maxLength: 14 },
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>
                    <MarginField style={{ width: '30%' }}>
                      <CustomInput
                        labelText="CONTA"
                        // id="CNPJ"
                        name="CONTAPJ"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: contapj,
                          onChange: (e) => OnchangeCONTAPJ(e.target.value),
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>


                    <MarginField style={{ width: '30%' }}>
                      <CustomInput
                        labelText="OPERACAO"
                        // id="CNPJ"
                        name="OPERACAOPJ"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: operacaopj,
                          onChange: (e) => OnchangeOPERACAOPJ(e.target.value),
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                      <DescriptionText>
                        <div>*Caso tenha conta na Caixa</div>
                      </DescriptionText>

                    </MarginField>


                    <MarginField style={{ width: '30%' }}>
                      <CustomInput
                        labelText="CHAVE PIX"
                        // id="CNPJ"
                        name="PIXPJ"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: pixpj,
                          onChange: (e) => OnchangePIXPJ(e.target.value),
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>



                    <PositionButton style={{ marginRight: 170 }}>
                      <Button
                        // simple
                        color="warning"
                        size="sm"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => Step6PREV()}

                      >

                        <ArrowBackIcon style={{ marginRight: 10 }} />
                        Anterior
                      </Button>
                    </PositionButton>



                    <PositionButton>
                      <Button
                        // simple
                        color="primary"
                        size="sm"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => Register()}

                      >
                        Salvar
                        <SaveIcon style={{ marginLeft: 10 }} />
                      </Button>
                    </PositionButton>


                  </Containerright>
                </Containerform>





              </Card>
            </ContainerCard>

          </div>



        </Carousel>
      </Card>


      <ClassBackground></ClassBackground>

    </>
  );
}