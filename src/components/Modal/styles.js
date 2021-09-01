import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: 'none'
  },
}));
