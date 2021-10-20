import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  dividerWidth: {
    width: "100%",
  },
  dividerHeight: {
    height: "325px",
    // flex: 1,
    // display: "flex",
  },
  fieldCentralization: {
    marginTop: "0px",
  },
}));
