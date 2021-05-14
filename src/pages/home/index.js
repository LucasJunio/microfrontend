import React from 'react'
import logo from '../../assets/images/logo-vileve-pay-cor-140px.png'


import { Form, Input, Card, CardBody } from 'reactstrap';

import {
   Classlogotipo
  ,ClassBackground
  ,TitleWelcome
  ,ContainerCard
} from './styles'

const home =() => {   
    return (
     <>      
      <Classlogotipo><img src={logo} alt="logotipo"></img></Classlogotipo>

      <TitleWelcome>Gateway de Pagamentos Vileve</TitleWelcome>
      <ContainerCard>

      <Card>
 
      <CardBody>

      <Form>

      <Input id='nome' name='nome' placeholder="Nome Completo" />
      <Input id='email' name='email' placeholder="E-mail" />
       
      </Form>
      </CardBody>
      </Card>

      </ContainerCard>

      <ClassBackground ></ClassBackground>


     </>
    );
  }
  
  export default home;
  