import styled from "styled-components";
import Background from "../../assets/images/White-Abstract.jpg";
import imagelef1 from "../../assets/images/register.png";
import imagelef2 from "../../assets/images/register.png";
import bg_card_vileve from "../../assets/images/bg_card_assistencia.jpg";
import bg_card_gateway from "../../assets/images/bg_card_vilevepay.jpg";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export const Classlogotipo = styled.div`
  position: absolute;
  margin: 30px;
  margin-left: 7%;
  z-index: 2;
`;
export const Containerform = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
  height: 100%;
`;
export const Containerleft = styled.div`
  display: flex;
  width: 40%;
  height: 100%;
`;

export const Containerright = styled.div`
  width: 60%;
  height: 100%;
  padding-left: 40px;
`;
export const Imageleft1 = styled.img.attrs({
  src: `${imagelef1}`,
})`
  align-self: center;
  width: 90%;
`;

export const Imageleft2 = styled.img.attrs({
  src: `${imagelef2}`,
})`
  align-self: center;
  width: 90%;
`;

export const ImagecardPJ = styled.img.attrs({
  src: `${bg_card_gateway}`,
})`
  width: 100%;
`;

export const ImagecardPF = styled.img.attrs({
  src: `${bg_card_vileve}`,
})`
  width: 100%;
  height: 100%;
`;

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
`;

export const ContainerCard = styled.div`
  display: flex;
  direction: row;
  justify-content: space-around;
  width: 100%;
  height: 600px;
`;

export const TitleWelcome = styled.div`
  color: #999;
  font-size: 15px;
  font-weight: 400;
  margin-left: 0px;
  /* text-shadow: 0 0 3px #ccc; */
`;

export const PositionButton = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 20px;
  float: right;
`;
export const MarginField = styled.div`
  margin-right: 20px;
  float: left;
`;

export const DescriptionText = styled.div`
  position: relative;
  font-size: 11px;
  color: #9c27b0;
  margin-top: -10px;
`;

export const Pagination = styled.div`
  position: absolute;
  z-index: 999;
  justify-content: center;
  margin-top: 7.2%;
  display: flex;
  width: 100%;
  height: 30px;
`;

export const Loading = styled.div`
  margin: 0px;
  padding: 0px;
  position: fixed;
  display: "";
  right: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #2f0aff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  z-index: 999;
  position: absolute;
  left: 50%;
  top: 40%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
