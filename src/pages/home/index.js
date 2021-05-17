import React from 'react'
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

 
 
  // const [Name, setName] = React.useState('');
  // const [Email, setEmail] = React.useState('');
  // const [Mobile, setMobile] = React.useState('');
  const [Password, setPassword] = React.useState(''); 
  const OnchangePassword = v =>{
    setPassword(v)
    console.log('valor passwo: ' + Password)
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
                  endAdornment: (
                    <InputAdornment position="end">
                      <People className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <CustomInput
                labelText="E-mail"
                id="email"
                name="email"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "email",
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <DescriptionText>Preencha um e-mail válido</DescriptionText>


              <CustomInput
                labelText="Celular"
                id="celular"
                name="celular"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "number",
                  onChange: (e) => OnchangeMobile(e.target.value),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Phone className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              <CustomInput
                labelText="Senha"
                id="password"
                name="password"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "password",
                  onChange: (e) => OnchangePassword(e.target.value),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon className={classes.inputIconsColor}>
                        lock_outline
                            </Icon>
                    </InputAdornment>
                  ),
                  autoComplete: "off",
                }}
              />

        <DescriptionText>Sua senha deve conter no mínimo 6 caractéres...</DescriptionText>

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
  