import { makeStyles } from "@material-ui/core/styles";
// import noImg from "assets/images/no-image-found-360x250.png";
export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    color: theme.palette.primary,
    margin: 10,
  },
  input: {
    display: "none",
  },
  img: {
    width: "360px",
    height: "230px",
  },
  imgUpload: {
    position: "absolute",
    maxHeight: "230px",
    maxWidth: "360px",
  },
  positionBtnUpload: {
    bottom: "-165px",
    right: "-270px",
    zIndex: 999,
  },
  btnColor: {
    backgroundColor: "#4182A1",
  },
  divOpacity: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // border: "1px solid #ccc",
    position: "absolute",
    zIndex: 99,
    width: "360px",
    height: "230px",
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  backDropImg: {
    position: "absolute",
    paddingLeft: "10px",
    paddingRight: "10px",
    borderRadius: "3px",
    backgroundColor: "#D5D5D5",
    fontWeight: 600,
    // color: "#fff",
  },
  reprovado: {
    color: "red",
  },
  aprovado: {
    color: "green",
  },
  aguarandoaprovacao: {
    color: "orange",
  },
}));
