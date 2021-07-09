import produce from 'immer';

const INITIAL_STATE = {
  conta: {
    banco: '',
    agencia: '',
    conta: '',
    operacao: '',
    pix: ''    
  }
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@account/INSERT_ACCOUNT': {
        draft.conta = action.payload.object;        
        break;
      }
      default:
        return state;
    }
  });
}
