import styled from "styled-components";
import Background from "../../assets/images/backgroundpresentation.png";

export const ClassBackground = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)),
    url(${Background});
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
