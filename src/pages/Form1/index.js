import React, { useEffect, useRef } from "react";
import $ from "jquery";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// material-ui components
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Typography from '@material-ui/core/Typography';
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
  Pagination
} from './styles'

import styles2 from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

import { useDispatch, useSelector } from 'react-redux';

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

  var loading = useSelector(state => state.signup.loading);
  var modal = useSelector(state => state.signup.modal);


  const [selectedEnabled, setSelectedEnabled] = React.useState(false);
  const [disabledfields, setdisabledfields] = React.useState(false)
  const [enablepj, setenablepj] = React.useState('none')
  const [enablepf, setenablepf] = React.useState('none')

  const [choicemodule, setchoice] = React.useState('')

  // useEffect(() => {
  //   if (selectedEnabled) {
  //     $("#choiceform").fadeOut('fast', () => { $("#formpj").fadeIn('fast') })
  //   } else {
  //     setenablepj('none')
  //     setchoice('')
  //   }
  // }, [selectedEnabled]);



  const [nome, setNome] = React.useState('');
  const OnchangeNOME = v => {
    setNome(v);
    (/^[A-Za-z-ç.-]+(\s*[A-Za-z-ç.-]+)*$/).test(v) || v.length < 1 ? $('#descriptionnome').html('') : $('#descriptionnome').html('Digite apenas letras no campo nome!')
  }

  const [email, setEmail] = React.useState('');
  const OnchangeEMAIL = v => {
    setEmail(v);
    (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(v) || v.length < 1 ? $('#descriptionemail').html('') : $('#descriptionemail').html('Digite um email válido')
  }

  const [celular, setCelular] = React.useState('');
  const OnchangeCELULAR = v => {
    function maskcel(v) {
      v = v.replace(/\D/g, "");             //Remove tudo o que não é dígito
      v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
      v = v.replace(/(\d)(\d{4})$/, "$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
      return v;
    }
    setCelular(maskcel(v))
  }


  const [cpf, setCPF] = React.useState('');
  const OnchangeCPF = v => {
    function maskcpf(v) {
      v = v.replace(/\D/g, "");
      v = v.replace(/^(\d{3})/g, "$1.");
      v = v.replace(/(\d{3})(\d{3})/g, "$1.$2-");
      return v;
    }
    setCPF(maskcpf(v))
  }

  const [senha, setSenha] = React.useState('');
  const [Iconsenha, setIconSenha] = React.useState('lock_Outline');
  const [ColorInputClass, setColorInputClass] = React.useState(false);

  const OnchangeSENHA = v => {
    setSenha(v);
    if ((/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/).test(v)) {
      setIconSenha('check_Outline'); setColorInputClass(true); $('#descriptionpassword').html('')
    } else { setIconSenha('lock_Outline'); setColorInputClass(false); $('#descriptionpassword').html(`A senha deve conter mínimo de oito caracteres, <br> pelo menos, uma letra maiúscula, uma letra minúscula, <br> números e um caractere especial`) }
  }
  
  
  const [cep, setCEP] = React.useState('');
  const OnchangeCEP = v => {setCEP(maskcep(v.replace(/\D/g, "")))}

  const [nascimento, setNASCIMENTO] = React.useState('');
  const OnchangeNASCIMENTO = v => { setNASCIMENTO(v) }

  const [rg, setRG] = React.useState('');
  const OnchangeRG = v => { setRG(v) }

  const [emissor, setEMISSOR] = React.useState('');
  const OnchangeEMISSOR = v => { setEMISSOR(v) }

  const [emissao, setEMISSAO] = React.useState('');
  const OnchangeEMISSAO = v => { setEMISSAO(v) }

  const [sexo, setSEXO] = React.useState('');
  const OnchangeSEXO = v => { setSEXO(v) }

  const [endereco, setENDERECO] = React.useState('');
  const OnchangeENDERECO = v => { setENDERECO(v) }

  const [numero, setNUMERO] = React.useState('');
  const OnchangeNUMERO = v => {setNUMERO(masknumero(v.replace(/\D/g, "")))}

  const [bairro, setBAIRRO] = React.useState('');
  const OnchangeBAIRRO = v => { setBAIRRO(v) }

  const [complemento, setCOMPLEMENTO] = React.useState('');
  const OnchangeCOMPLEMENTO = v => { setCOMPLEMENTO(v) }

  const [cidade, setCIDADE] = React.useState('');
  const OnchangeCIDADE = v => { setCIDADE(v) }

  const [estado, setESTADO] = React.useState('');
  const OnchangeESTADO = v => { setESTADO(v.replace(/[^a-zA-Z]/g, "")) }

  const [estadocivil, setESTADOCIVIL] = React.useState('');
  const OnchangeESTADOCIVIL = v => { setESTADOCIVIL(v.replace(/[^a-zA-Z]/g, "")) }

  const [naturalidade, setNATURALIDADE] = React.useState('');
  const OnchangeNATURALIDADE = v => { setNATURALIDADE(v.replace(/[^a-zA-Z]/g, "")) }

  const [nacionalidade, setNACIONALIDADE] = React.useState('');
  const OnchangeNACIONALIDADE = v => { setNACIONALIDADE(v.replace(/[^a-zA-Z]/g, "")) }

  const [razaosocial, setRAZAOSOCIAL] = React.useState('');
  const OnchangeRAZAOSOCIAL = v => { setRAZAOSOCIAL(v) }

  const [nomefantasia, setNOMEFANTASIA] = React.useState('');
  const OnchangeNOMEFANTASIA = v => { setNOMEFANTASIA(v) }

  const [cnpj, setCNPJ] = React.useState('');
  const OnchangeCNPJ = v => {
    function maskcnpj(v) {
      v = v.replace(/\D/g, "");
      // v = v.replace(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/g,"")
      v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3\/\$4-$5");
      return v;
    }
    setCNPJ(maskcnpj(v))
  }


  const [telefone, setTELEFONE] = React.useState('');
  const OnchangeTELEFONE = v => {
    function masktelefone(v) {
      v = v.replace(/\D/g, "");             //Remove tudo o que não é dígito
      v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
      v = v.replace(/(\d)(\d{4})$/, "$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
      return v;
    }
    setTELEFONE(masktelefone(v))
  }


  const [site, setSITE] = React.useState('');
  const OnchangeSITE = v => { setSITE(v) }

  const [ceppj, setCEPPJ] = React.useState('');
  const OnchangeCEPPJ = v => {setCEPPJ(maskceppj(v.replace(/\D/g, "")))}

  const [cnae, setCNAE] = React.useState('');
  const OnchangeCNAE = v => {setCNAE(maskcnae(v.replace(/\D/g, "")))}

  const [enderecopj, setENDERECOPJ] = React.useState('');
  const OnchangeENDERECOPJ = v => { setENDERECOPJ(v) }

  const [numeropj, setNUMEROPJ] = React.useState('');
  const OnchangeNUMEROPJ = v => {setNUMEROPJ(masknumeropj(v.replace(/\D/g, "")))}

  const [bairropj, setBAIRROPJ] = React.useState('');
  const OnchangeBAIRROPJ = v => { setBAIRROPJ(v) }

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

  const [nickname, setNICKNAME] = React.useState('');
  const OnchangeNICKNAME = v => { setNICKNAME(v) }

  const dotActive = 'pagination__link'
  const dotInactive = 'pagination__link is_active'
  const [dot1, setDOT1] = React.useState(dotActive);
  const [dot2, setDOT2] = React.useState(dotInactive);
  const [dot3, setDOT3] = React.useState(dotInactive);
  const [dot4, setDOT4] = React.useState(dotInactive);
  const [dot5, setDOT5] = React.useState(dotInactive);

  const Register = () => {
    if (nome.length < 5 || !(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(email) || celular.length != 15 || !(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/).test(senha)) {
      alert('Todos os campos são obrigatórios, favor revise seu formulário!')
    } else {
      // checked === 'false' ? alert('Favor leia os termos e clique em confirmar!') : submit()
      submit()
    }

    function submit() {

      const objectJSONPJ = {
        nome: nome,
        email: email,
        cpf: cpf.replace(/\D/g, ""),
        celular: celular.replace(/\D/g, ""),
        senha: sha256(senha).toString(),
        cep: cep.replace(/\D/g, ""),
        endereco: endereco,
        numero: numero,
        bairro: bairro,
        complemento: complemento,
        cidade: cidade,
        estado: estado,


        cnpj: cnpj.replace(/\D/g, ""),
        telefone: telefone,
        site: site,
        razaosocial: razaosocial,
        cnae: cnae,
        nomefantasia: nomefantasia,

        ceppj: ceppj,
        enderecopj: enderecopj,
        numeropj: numeropj,
        bairropj: bairropj,
        complementopj: complementopj,

        bancopj: bancopj,
        agenciapj: agenciapj,
        pixpj: pixpj,
        operacaopj: operacaopj

      }

      console.log(objectJSONPJ)
      // dispatch(signupRequest({ nome, email, celular, senha }));
    }
  }

  return (

    <>

    <Pagination>
    <div style={{position: 'absolute', width: '70%'}}>
    <div style={{position: 'absolute', right:0}}>
    <div className="wrapper">
      <ul className="pagination">
        <li className="pagination__item"><a href="#" className={dot1}></a></li>
        <li className="pagination__item"><a href="#" className={dot2}></a></li>
        <li className="pagination__item"><a href="#" className={dot3}></a></li>
        <li className="pagination__item"><a href="#" className={dot4}></a></li>
        <li className="pagination__item"><a href="#" className={dot5}></a></li>
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
              <Card style={{ width: '70%', padding: 20 }}>

                {/* <TitleWelcome>Bem-vindo ao Vileve Way - Etapa 1/5</TitleWelcome> */}

                <Containerform>

                  <Containerleft>
                    <Imageleft1></Imageleft1>
                  </Containerleft>

                  <Containerright>

                  <TitleWelcome>Informe os dados de <span style={{color:'#9D2AB1'}}>Usuário</span></TitleWelcome>


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




                    <MarginField >
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
                    </MarginField>

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





                    <PositionButton>
                      <Button
                        // simple
                        color="primary"
                        size="sm"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {slickRef.current.slickNext();setDOT1(dotInactive);setDOT2(dotActive)}}
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
              <Card style={{ width: '70%', padding: 20 }}>

                {/* <TitleWelcome>Bem-vindo ao Vileve Way - Etapa 2/5</TitleWelcome> */}

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
                         
                            <Button color="info" onClick={() => {slickRef.current.slickNext();setDOT2(dotInactive);setDOT3(dotActive)}} size="sm">Pessoa Jurídica</Button>
                         
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
                            <Button color="success" size="sm">Pessoa Física</Button>
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
                        onClick={() => {slickRef.current.slickPrev();setDOT2(dotInactive);setDOT1(dotActive)}}

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
              <Card style={{ width: '70%', padding: 20 }}>


                <Containerform>

                  <Containerleft>
                    <Imageleft2></Imageleft2>
                  </Containerleft>

                  <Containerright>

                  <TitleWelcome>Informe os dados do <span style={{color:'#9D2AB1'}}>Representante Legal</span></TitleWelcome>


                  {/* <p style={{ position:"absolute", textAlign:"right", width:'60%',  fontSize: 13, color: '#125984' }}>Dados do Representante Legal!</p> */}

                  <MarginField style={{ width: '20%' }}>
                      <CustomInput
                        labelText="NASCIMENTO"
                        // id="NASCIMENTO"
                        name="NASCIMENTO"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: nascimento,
                          onChange: (e) => OnchangeNASCIMENTO(e.target.value),
                          inputProps: { maxLength: 15},
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>


                    <MarginField style={{ width: '15%' }}>
                      <CustomInput
                        labelText="RG"
                        // id="RG"
                        name="RG"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: rg,
                          onChange: (e) => OnchangeRG(e.target.value),
                          inputProps: { maxLength: 15},
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
                          inputProps: { maxLength: 15},
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
                          inputProps: { maxLength: 15},
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>

                    <MarginField style={{ width: '5%' }}>
                      <CustomInput
                        labelText="SEXO"
                        // id="SEXO"
                        name="SEXO"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: sexo,
                          onChange: (e) => OnchangeSEXO(e.target.value),
                          inputProps: { maxLength: 1},
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>



                    <MarginField style={{ width: '45%' }}>
                      <CustomInput
                        labelText="NOME DA MÃE"
                        // id="CEP"
                        name="CEP"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: cep,
                          onChange: (e) => OnchangeCEP(e.target.value),
                          inputProps: { maxLength: 8},
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>


                    <MarginField style={{ width: '45%' }}>
                      <CustomInput
                        labelText="NOME DO PAI"
                        // id="CEP"
                        name="CEP"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: cep,
                          onChange: (e) => OnchangeCEP(e.target.value),
                          inputProps: { maxLength: 8},
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>




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
                          inputProps: { maxLength: 8},
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
                          inputProps: { maxLength: 5},
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
                          onChange: (e) => OnchangeESTADO(e.target.value),
                          inputProps: { maxLength: 2 },
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>

                    <MarginField >
                      <CustomInput
                        labelText="CELULAR"
                        // id="CELULAR"
                        name="CELULAR"
                        formControlProps={{ fullWidth: false }}
                        inputProps={{
                          type: "text",
                          value: celular,
                          onChange: (e) => OnchangeCELULAR(e.target.value),
                          inputProps: { maxLength: 15},
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>


                    <MarginField style={{ width: '20%' }}>
                      <CustomInput
                        labelText="ESTADO CIVIL"
                        // id="ESTADOCIVIL"
                        name="ESTADOCIVIL"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          value: estadocivil,
                          onChange: (e) => OnchangeESTADOCIVIL(e.target.value),
                          inputProps: { maxLength: 2 },
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
                          inputProps: { maxLength: 2 },
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
                        onClick={() => {slickRef.current.slickPrev();setDOT3(dotInactive);setDOT2(dotActive)}}

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
                        onClick={() => {slickRef.current.slickNext();setDOT3(dotInactive);setDOT4(dotActive)}}

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
              <Card style={{ width: '70%', padding: 20 }}>

                {/* <TitleWelcome>Bem-vindo ao Vileve Way - Etapa 3/5</TitleWelcome> */}

                <Containerform>

                  <Containerleft>
                    <Imageleft2></Imageleft2>
                  </Containerleft>

                  <Containerright>

                  {/* <p style={{ position:"absolute", textAlign:"center", width:'43%',  fontSize: 13, color: '#125984' }}>Dados do Representante Legal!</p> */}
                  <TitleWelcome>Informe os dados de <span style={{color:'#9D2AB1'}}>Sua Empresa</span></TitleWelcome>

                   
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
                            value: nomefantasia,
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

 



                    <PositionButton style={{ marginRight: 170 }}>
                      <Button
                        // simple
                        color="warning"
                        size="sm"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {slickRef.current.slickPrev();setDOT4(dotInactive);setDOT3(dotActive)}}

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
                        onClick={() => {slickRef.current.slickNext();setDOT4(dotInactive);setDOT5(dotActive)}}

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
              <Card style={{ width: '70%', padding: 20 }}>

                {/* <TitleWelcome>Bem-vindo ao Vileve Way - Etapa 3/5</TitleWelcome> */}

                <Containerform>

                  <Containerleft>
                    <Imageleft2></Imageleft2>
                  </Containerleft>

                  <Containerright>

                  {/* <p style={{ position:"absolute", textAlign:"center", width:'43%',  fontSize: 13, color: '#125984' }}>Dados do Representante Legal!</p> */}
                  <TitleWelcome>Ainda sobre o seu negócio, quais os <span style={{color:'#9D2AB1'}}>dados bancários da sua empresa?</span></TitleWelcome>

                    

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
                        onClick={() => {slickRef.current.slickPrev();setDOT5(dotInactive);setDOT4(dotActive)}}

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
                        // onClick={() => {slickRef.current.slickNext();setDOT3(dotInactive);setDOT4(dotActive)}}

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