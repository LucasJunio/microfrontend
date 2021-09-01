import { createTheme } from "@material-ui/core";

//para criar tema, verificar https://material-ui.com/pt/customization/default-theme/
const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#005882",
    },
    // secondary: purple,
    type: "light",
  },
});

export default lightTheme;
