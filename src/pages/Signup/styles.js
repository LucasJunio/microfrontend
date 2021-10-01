import styled from 'styled-components';
import Background from '../../assets/images/White-Abstract.jpg';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'repeat-y',
    width: '100%',
    height: '100%',
    position: 'absolute',
    [theme.breakpoints.down('xs')]: {
      height: '200%',
    },
  },
  logo: {
    width: '150px',
    marginLeft: '7%',
    margin: '30px',
  },
  manPc: {
    width: '60%',
  },
  cardStyle: {
    // transform: "scale(0.95)",
    postion: 'absolute',
  },
  divCentralization: {
    padding: 20,
    marginTop: '20px',
  },
  cardPJPF: {
    maxWidth: '18rem',
  },
  label: {
    color: '#999',
  },
  labelUser: {
    color: '#005882',
  },
  media: {
    height: 200,
  },
  btnStepPostion: {
    margin: theme.spacing(3),
  },
  arrowIconNext: {
    marginLeft: 10,
  },
  arrowIconBack: {
    marginRight: 10,
  },
  saveIcon: {
    marginLeft: 10,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#e6e6e6',
  },
  fieldCentralization: {
    marginTop: '0px',
  },
}));
