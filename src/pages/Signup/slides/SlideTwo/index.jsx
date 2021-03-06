import React, { useEffect } from "react";

import {
  Grid,
  Hidden,
  Typography,
  Card as CardM,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";

import { ArrowBack } from "@material-ui/icons";
import bg_card_vileve from "../../../../assets/images/bg_card_assistencia.jpg";
import bg_card_gateway from "../../../../assets/images/bg_card_vilevepay.jpg";
// import Button from "../../../../components/CustomButtons/Button";
import manPc from "../../../../assets/images/register.png";
import { useStyles } from "../../styles";

export const SlideTwo = ({ nextStep, StepPF, previousStep }) => {
  const classes = useStyles();

  useEffect(() => {
    return () => { };
  });

  return (
    <Grid item md={12}>
      <div className={classes.divCentralization}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Hidden only={["xs", "sm"]}>
            <Grid item md={6}>
              <Grid container justifyContent="center" alignItems="center">
                <img src={manPc} alt="logotipo" className={classes.manPc} />
              </Grid>
            </Grid>
          </Hidden>
          <Grid item md={3}>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <CardM className={classes.cardPJPF}>
                  <CardActionArea onClick={() => nextStep()}>
                    <CardMedia
                      className={classes.media}
                      image={bg_card_gateway}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography variant="button" display="block" gutterBottom>
                        Para Sua Empresa
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                      >
                        Clique abaixo para contratar o produto Vileve
                        Assit??ncia.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      id="BTNFIRSTNEXT2"
                      size="sm"
                      variant="contained"
                      color="primary"
                      onClick={() => nextStep()}
                    >
                      Pessoa Jur??dica
                    </Button>
                  </CardActions>
                </CardM>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3}>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <CardM className={classes.cardPJPF}>
                  <CardActionArea onClick={() => StepPF()}>
                    <CardMedia
                      className={classes.media}
                      image={bg_card_vileve}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography variant="button" display="block" gutterBottom>
                        Para Voc??
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component={"span"}
                      >
                        Clique abaixo para contratar o produto Vileve
                        Assit??ncia.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="sm"
                      variant="contained"
                      color="primary"
                      id="BTNFIRSTNEXPF"
                      onClick={() => StepPF()}
                    >
                      Pessoa F??sica
                    </Button>
                  </CardActions>
                </CardM>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid item>
            <div>
              <Button
                id="BTNFIRSTBACK2"
                variant="contained"
                color="secondary"
                size="sm"
                rel="noopener noreferrer"
                onClick={() => previousStep()}
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
  );
};
