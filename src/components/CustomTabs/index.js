import { withStyles } from "@material-ui/core/styles";
import { Tabs } from "@material-ui/core";

export const CustomTabs = withStyles({
  indicator: {
    backgroundColor: "white",
  },
})(Tabs);
