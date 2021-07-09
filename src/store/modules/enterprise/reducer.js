import produce from 'immer';

const INITIAL_STATE = {
  empresa: {
    cnpj:'',
    cnae:-1,
    razao_social:'',
    telefone_fixo:'',
    celular:'',
    nome_fantasia:'',
    site: ''
  }
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@enterprise/INSERT_ENTERPRISE': {
        draft.empresa = action.payload.object;        
        break;
      }
      default:
        return state;
    }
  });
}
