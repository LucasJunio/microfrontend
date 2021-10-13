import { makeStyles } from "@material-ui/core/styles";
import noImg from "assets/images/no-image-found-360x250.png";
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
    backgroundImage: `url(${noImg})`,
    backgroundRepeat: "no-repeat",
    width: "360px",
    height: "230px",
  },
  positionBtnUpload: {
    bottom: "-170px",
    right: "-300px",
    zIndex: 999,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary,
  },
}));
