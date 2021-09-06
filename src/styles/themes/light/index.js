import { createMuiTheme } from "@material-ui/core/styles";

//para criar tema, verificar https://material-ui.com/pt/customization/default-theme/
const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#005882",
    },
    // secondary: purple,
    type: "light",
  },
});

export default lightTheme;
