import React from 'react';
import {useStyles} from "./styles"
import {Accordion, AccordionSummary , AccordionDetails , Typography, Grid } from '@material-ui/core'
import {ExpandMore} from '@material-ui/icons';


const Form = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Dados Pessoais</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Inputs de Dados
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Endereço</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    )
}

export default Form;
