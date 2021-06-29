import React from 'react'
import Menu from '../../components/Menu/Menu'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import bg_card_vileve from '../../assets/images/bg_card_assistencia.jpg'
import bg_card_gateway from '../../assets/images/bg_card_vilevepay.jpg'
import Button from "components/CustomButtons/Button.js";

 
const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
      },
     content: {
      flexGrow: 1,
      paddingLeft:100,
      padding: theme.spacing(3),
    },
   }));

const form =() => {
    const classes = useStyles();
    return (
     <>
     <Menu></Menu>

     <main className={classes.content}>
        <div className={classes.toolbar} />

        <Typography paragraph>
        <h3>Produtos Vileve</h3>
        <p style={{color:"#999"}}>Escolha a baixo o seu produto.</p>
        </Typography>



        <div style={{display:"flex"}}> 
 
        <Card style={{width: "20rem"}}>
      <img
        style={{height: "180px", width: "100%", display: "block"}}
        className={classes.imgCardTop}
        src={bg_card_vileve}
        alt="Card-img-cap"
      />
      <CardBody>
        <h4 className={classes.cardTitle}>Vileve Assitência</h4>
        <p>Clique abaixo para contratar o produto Vileve Assitência.</p>
        <Button color="success"><span class="material-icons">task_alt</span>Contratar</Button>
      </CardBody>
      </Card>

      <Card style={{width: "20rem", marginLeft:"30px"}}>
      <img
        style={{height: "180px", width: "100%", display: "block"}}
        className={classes.imgCardTop}
        src={bg_card_gateway}
        alt="Card-img-cap"
      />
      <CardBody>
        <h4 className={classes.cardTitle}>Gateway</h4>
        <p>Contrate a sua Plataforma de pagamentos online.</p>
        <Button color="warning"><span class="material-icons">task_alt</span>Contratar</Button>
      </CardBody>
      </Card>

   
      </div>  
 
      </main>
      

     </>
    );
  }
  
export default form;