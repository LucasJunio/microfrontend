import produce from 'immer';

const INITIAL_STATE = {
  usuario: {
    nome:'',
    email:'',
    senha:''
  }
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@user/RETURN_USER': {
        draft.usuario = action.payload.object;        
        break;
      }
      default:
        return state;
    }
  });
}
