import produce from 'immer';
import { setAutoFreeze } from 'immer';

setAutoFreeze(false);

const INITIAL_STATE = {
  usuario: {
    nome: '',
    email: '',
    senha: ''
  }
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {    
    switch (action.type) {
      case '@user/INSERT_USER': {
        draft.usuario = action.payload;
        break;
      }
      default:
        return state;
    }    
  });
}