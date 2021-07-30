import styled from "styled-components";
import Background from "../../assets/images/White-Abstract.jpg";
import imagelef1 from "../../assets/images/register.png";
import imagelef2 from "../../assets/images/register.png";
import bg_card_vileve from "../../assets/images/bg_card_assistencia.jpg";
import bg_card_gateway from "../../assets/images/bg_card_vilevepay.jpg";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    position: "absolute",
  },
  logo: {
    width: "150px",
    marginLeft: "7%",
    margin: "30px",
  },
  manPc: {
    width: "60%",
  },
  cardStyle: {
    transform: "scale(0.92)",
    postion: "absolute",
  },
  divCentralization: {
    padding: 20,
    marginTop: "20px",
  },
  cardPJPF: {
    maxWidth: "18rem",
  },
  label: {
    color: "#999",
  },
  labelUser: {
    color: "#9D2AB1",
  },
  media: {
    height: 200,
  },
  btnStepPostion: {
    margin: theme.spacing(3),
  },
  arrowIconNext: {
    marginLeft: 10,
  },
  arrowIconBack: {
    marginRight: 10,
  },
  saveIcon: {
    marginLeft: 10,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#e6e6e6",
  },
}));

export const ClassBackground = styled.div`
  background-image: url(${Background});
  position: absolute;
  width: 100%;
  height: 100%;

  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  -moz-background-size: cover;
  overflow-x: hidden;
  overflow-y: hidden;
  z-index: -1;
`;
