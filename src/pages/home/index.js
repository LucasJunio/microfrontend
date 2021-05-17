import React from 'react'
import $ from "jquery";
import logo from '../../assets/images/logo-vileve-pay-cor-140px.png'

import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";

// import Header from "components/Header/Header.js";
// import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Phone from "@material-ui/icons/PhoneIphone"
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// import { Form, Input, Card, CardBody } from 'reactstrap';

import {
   Classlogotipo
  ,ClassBackground
  ,TitleWelcome
  ,ContainerCard
  ,ContainerCardSize
  ,PositionButton
  ,PositionFooter
  ,DescriptionText
} from './styles'

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { func } from 'prop-types';
const useStyles = makeStyles(styles);


const home =() => { 

  const classes = useStyles();

    const [checked, setChecked] = React.useState([24, 22]);
    const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    };

 
    const [Nome, setNome] = React.useState(''); 
    const OnchangeNome = v =>{
    setNome(v);
    (/^[A-Za-z-ç]+$/).test(v) || v.length < 1 ? $('#descriptionnome').html('') : $('#descriptionnome').html('Digite apenas letras no campo nome!')
    }

    const [email, setEmail] = React.useState(''); 
    const OnchangeEmail = v =>{
    setEmail(v);
    (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(v) || v.length < 1 ? $('#descriptionemail').html('') : $('#descriptionemail').html('Digite um email válido')
    }
 
    const [Celular, setCelular] = React.useState(''); 
    const OnchangeCelular = v =>{
      function maskcel(v){
        v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
        v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
        v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
        return v;
      }
    setCelular(maskcel(v))
    }

    const [senha, setSenha] = React.useState(''); 
    const [Iconsenha, setIconSenha] = React.useState('lock_Outline'); 
    const [ColorInputClass, setColorInputClass] = React.useState(false); 
    const OnchangeSenha = v =>{
    setSenha(v);
    if((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(v)){
    setIconSenha('check_Outline');setColorInputClass(true);$('#descriptionpassword').html('')
    }else{setIconSenha('lock_Outline');setColorInputClass(false);$('#descriptionpassword').html(`A senha deve conter mínimo de oito caracteres, <br> pelo menos, uma letra maiúscula, uma letra minúscula, <br> um número e um caractere especial`)}
    }

    return (
     <>      
      <Classlogotipo><img src={logo} alt="logotipo"></img></Classlogotipo> 

      <TitleWelcome>Gateway de Pagamentos Vileve</TitleWelcome>


      <ContainerCard>
      <ContainerCardSize>
      <Card>        

            <CardBody>

              <CustomInput
                labelText="Nome Completo"
                id="nome"
                name="nome"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                  onChange: (e) => OnchangeNome(e.target.value),
                  autoComplete: "off",
                  endAdornment: (
                    <InputAdornment position="end">
                      <People className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <DescriptionText><div id="descriptionnome"></div></DescriptionText>


              <CustomInput
                labelText="E-mail"
                id="email"
                name="email"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "email",
                  onChange: (e) => OnchangeEmail(e.target.value),
                  autoComplete: "off",
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <DescriptionText><div id="descriptionemail"></div></DescriptionText>


              <CustomInput
                labelText="Celular (99) 99999-9999"
                id="celular"
                name="celular"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                  onChange: (e) => OnchangeCelular(e.target.value),
                  value: Celular,
                  autoComplete: "off",
                  inputProps: { maxLength: 15 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Phone className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <DescriptionText><div id="descriptioncelular"></div></DescriptionText>
               
              <CustomInput
                labelText="Senha"
                id="password"
                name="password"
                success={ColorInputClass}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "password",
                  onChange: (e) => OnchangeSenha(e.target.value),
                  endAdornment: (
                    <InputAdornment position="end">
                    <Icon className={classes.inputIconsColor}>{Iconsenha}</Icon>                      
                    </InputAdornment>
                  ),
                  autoComplete: "off",
                }}
              />
               
            <DescriptionText>
            <div id="descriptionpassword"></div>
            </DescriptionText>

        <div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}/>
        <FormControlLabel
          control={
            <Checkbox
              tabIndex={-1}
              onClick={() => handleToggle(21)}
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{
                checked: classes.checked,
                root: classes.checkRoot
              }}
            />
          }
          classes={{ label: classes.label }}
          label="Concordo com os termos Vileve"
        />
     

              <PositionButton>
              <Button
                // simple
                color="primary"
                size="lg"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                Crie sua Conta
              </Button>
              </PositionButton>

                </CardBody>

      </Card>
      </ContainerCardSize>
      </ContainerCard>

      <ClassBackground ></ClassBackground>
        
      <PositionFooter><Footer/></PositionFooter>
      


     </>
    );
  }
  
  export default home;
  