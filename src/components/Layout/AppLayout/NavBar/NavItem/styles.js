import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
  // necessary for content to be below app bar
  // toolbar: theme.mixins.toolbar,
  tollbar: {
    backgroundColor: 'blue',
    width: drawerWidth,
    height: '500px',
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));
