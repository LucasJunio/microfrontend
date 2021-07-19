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
      case '@address/INSERT_ADDRESS_CPF': {
        draft.endereco_cpf = action.payload.object;        
        break;
      }      
      case '@address/INSERT_ADDRESS_CNPJ': {
        draft.endereco_cnpj = action.payload.object;        
        break;
      }
      default:
        return state;
    }
  });
}
