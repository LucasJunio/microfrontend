import produce from 'immer';

const INITIAL_STATE = {
  endereco_cpf: {
    cep:'',
    complemento:'',
    endereco:'',
    numero:'',
    bairro:'',
    cidade:'',
    estado:'',
  }, 
  endereco_cnpj: {
    cep:'',
    complemento:'',
    endereco:'',
    numero:'',
    bairro:'',
    cidade:'',
    estado:'',
  }
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@account/RETURN_ADDRESS': {
        draft.endereco = action.payload.object;        
        break;
      }
      default:
        return state;
    }
  });
}
