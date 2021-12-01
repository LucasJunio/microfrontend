import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: { position: "relative" },
  container: { position: "absolute", top: 0, right: 0 },
  buttonCopy: {
    color: "white",
  },
  textCopy: {
    color: "white",
  },
}));
