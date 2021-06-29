import React, { useEffect, useRef } from "react";
// import $ from "jquery";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// material-ui components
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import image1 from "assets/img/bg.jpg";
import image2 from "assets/img/bg2.jpg";
import image3 from "assets/img/bg3.jpg";

import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/PeopleAltOutlined";

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import logo from '../../assets/images/logo-vileve-pay-cor-140px.png'
import Button from "components/CustomButtons/Button.js";

import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

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
  MarginField
} from './styles'

import styles2 from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);


export default function SectionCarousel() {

  const slickRef = useRef();

  const classes = useStyles();
  const classes2 = useStyles2();

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    // fade:true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: false,
    initialSlide: 0
  };


  
   const [selectedEnabled, setSelectedEnabled] = React.useState(false);
   const [disabledfields, setdisabledfields] = React.useState(true)

  useEffect(() => {
    selectedEnabled ? setdisabledfields(false) : setdisabledfields(true) 
  }, [selectedEnabled]);


  return (

    <>

      <Classlogotipo><img src={logo} alt="logotipo"></img></Classlogotipo>

      <Card style={{ position: 'absolute', marginTop: '8%' }}>
        <Carousel ref={slickRef} {...settings} style={{ paddingBottom: 50 }} >

          <div>
            <ContainerCard>
              <Card style={{ width: '70%', padding: 20 }}>

                <TitleWelcome>Bem-vindo ao Vileve Way - Etapa 1/3</TitleWelcome>

                <Containerform>

                  <Containerleft>
                    <Imageleft1></Imageleft1>
                  </Containerleft>

                  <Containerright>

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
                    </MarginField>


                    <MarginField style={{ width: '100%' }}>
                      <CustomInput
                        labelText="EMAIL VÁLIDO"
                        // id="EMAIL"
                        name="EMAIL"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          onChange: (e) => OnchangeEMAIL(e.target.value),
                          autoComplete: "off",
                        }}
                      />
                      <small id="EMAILHelp" style={{color:'#9C27B0'}} className="form-text text-muted">Favor, insira um email válido pois será necessário confirmação.</small>

                    </MarginField>

                    <MarginField >
                      <CustomInput
                        labelText="CPF"
                        // id="CPF"
                        name="CPF"
                        formControlProps={{ fullWidth: false }}
                        inputProps={{
                          type: "text",
                          onChange: (e) => OnchangeCPF(e.target.value),
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>

                    <MarginField >
                      <CustomInput
                        labelText="TELEFONE"
                        // id="TELEFONE"
                        name="TELEFONE"
                        formControlProps={{ fullWidth: false }}
                        inputProps={{
                          type: "text",
                          onChange: (e) => OnchangeTELEFONE(e.target.value),
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
                        inputProps={{
                          type: "text",
                          onChange: (e) => OnchangeSENHA(e.target.value),
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>


                    


                    <PositionButton>
                      <Button
                        // simple
                        color="primary"
                        size="md"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => slickRef.current.slickNext()}
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

                <TitleWelcome>Bem-vindo ao Vileve Way - Etapa 2/3</TitleWelcome>

                <Containerform>

                  <Containerleft>
                    <Imageleft2></Imageleft2>
                  </Containerleft>

                  <Containerright>

                    <MarginField >
                      <CustomInput
                        labelText="CEP"
                        // id="CEP"
                        name="CEP"
                        formControlProps={{ fullWidth: false }}
                        inputProps={{
                          type: "text",
                          onChange: (e) => OnchangeCEP(e.target.value),
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>


                    <MarginField style={{ width: '70%' }}>
                      <CustomInput
                        labelText="ENDEREÇO"
                        // id="ENDERECO"
                        name="ENDERECO"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          onChange: (e) => OnchangeENDERECO(e.target.value),
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>

                    <MarginField style={{ width: '20%' }}>
                      <CustomInput
                        labelText="NUMERO"
                        // id="NUMERO"
                        name="NUMERO"
                        formControlProps={{ fullWidth: false }}
                        inputProps={{
                          type: "text",
                          onChange: (e) => OnchangeNUMERO(e.target.value),
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
                          onChange: (e) => OnchangeCOMPLEMENTO(e.target.value),
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>


                    <MarginField style={{ width: '60%' }}>
                      <CustomInput
                        labelText="CIDADE"
                        // id="CIDADE"
                        name="CIDADE"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
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
                          onChange: (e) => OnchangeESTADO(e.target.value),
                          autoComplete: "off",
                        }}
                      />
                    </MarginField>


                    <PositionButton style={{ marginRight: 170 }}>
                      <Button
                        // simple
                        color="warning"
                        size="md"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => slickRef.current.slickPrev()}
                      >
                        
                        <ArrowBackIcon style={{ marginRight: 10}} />
                        Anterior
                      </Button>
                    </PositionButton>



                    <PositionButton>
                      <Button
                        // simple
                        color="primary"
                        size="md"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => slickRef.current.slickNext()}
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

                <TitleWelcome>Bem-vindo ao Vileve Way - Etapa 3/3</TitleWelcome>

                <Containerform>

                  <Containerleft>
                    <Imageleft2></Imageleft2>
                  </Containerleft>

                  <Containerright>

                    <p style={{ fontSize: 12, color: '#125984' }}>Possui empresa?</p>



                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedEnabled === true}
                          onChange={() => setSelectedEnabled(true)  }
                          value="true"
                          name="radio button enabled"
                          aria-label="A"
                          icon={
                            <FiberManualRecord
                              className={classes2.radioUnchecked}
                            />
                          }
                          checkedIcon={
                            <FiberManualRecord className={classes2.radioChecked} />
                          }
                          classes={{
                            checked: classes2.radio
                          }}
                        />
                      }
                      classes={{
                        label: classes.label
                      }}
                      label="SIM"
                    />



                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedEnabled === false}
                          onChange={() => setSelectedEnabled(false) }
                          value="false"
                          name="radio button enabled"
                          aria-label="B"
                          icon={
                            <FiberManualRecord
                              className={classes2.radioUnchecked}
                            />
                          }
                          checkedIcon={
                            <FiberManualRecord className={classes2.radioChecked} />
                          }
                          classes={{
                            checked: classes2.radio
                          }}
                        />
                      }
                      classes={{
                        label: classes.label
                      }}
                      label="NÃO"
                    />



                    <MarginField style={{ width: '100%' }}>
                      <CustomInput
                        labelText="RAZÃO SOCIAL"
                        // id="RAZAOSOCIAL"
                        name="RAZAOSOCIAL"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          onChange: (e) => OnchangeRAZAOSOCIAL(e.target.value),
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>

                    <MarginField style={{ width: '100%' }}>
                      <CustomInput
                        labelText="NOME FANTASIA"
                        // id="NOMEFANTASIA"
                        name="NOMEFANTASIA"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          // id:"NOMEFANTASIA",
                          type: "text",
                          onChange: (e) => OnchangeNOMEFANTASIA(e.target.value),
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>


                    <MarginField style={{ width: '50%' }}>
                      <CustomInput
                        labelText="CNPJ"
                        // id="CNPJ"
                        name="CNPJ"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          type: "text",
                          onChange: (e) => OnchangeCNPJ(e.target.value),
                          autoComplete: "off",
                          disabled: disabledfields
                        }}
                      />
                    </MarginField>


                    <PositionButton style={{ marginRight: 170 }}>
                      <Button
                        // simple
                        color="warning"
                        size="md"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => slickRef.current.slickPrev()}
                      >
                        
                        <ArrowBackIcon style={{ marginRight: 10}} />
                        Anterior
                      </Button>
                    </PositionButton>


                    <PositionButton>
                      <Button
                        // simple
                        color="primary"
                        size="md"
                        // href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => slickRef.current.slickNext()}
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