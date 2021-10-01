import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 250;

export const useStyles = makeStyles((theme) => ({
  backdrop: { zIndex: 9999 },

  inputcell: {
    padding: "3px 4px",
    display: "flex",
    float: "left",
    marginLeft: 5,
    width: 210,
  },
}));
