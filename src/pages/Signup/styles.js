import styled from "styled-components";
import Background from "../../assets/images/White-Abstract.jpg";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  // root: {
  //   minWidth: 275,
  //   position: "absolute",
  // },
  root: {
    // backgroundImage: `url(${Background})`,
    backgroundColor: "black",
    position: "absolute",
    width: "98%",
    height: "98%",
    // overflowY: "hidden",
    // overflowX: "hidden",
    // margin: 0,
    // marginLeft: 0,
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
  width: 98%;
  height: 98%;
  margin: "0px";
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  -moz-background-size: cover;
  overflow-x: hidden;
  overflow-y: hidden;
  z-index: -1;
`;
