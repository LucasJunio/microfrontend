import produce from 'immer';

const INITIAL_STATE = {
  pessoa: {
    cpf:'',
    celular:'',
    nascimento:'',
    naturalidade:'',
    nacionalidade:'',
    estadocivil:'',
    rg:'',
    emissor:'',
    emissao:'',
    sexo:'',
    mae:'',
    pai:'' 
  }
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@account/RETURN_PERSON': {
        draft.pessoa = action.payload.object;        
        break;
      }
      default:
        return state;
    }
  });
}
