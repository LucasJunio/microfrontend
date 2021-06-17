import produce from 'immer';

const INITIAL_STATE = {
  token: '',
  signed: false,
  loading: 'none'
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@signup/SIGNUP_REQUEST': {
        draft.loading = '';
        break;
      }
      case '@signup/SIGNUP_RETURN': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = 'none';
        break;      
    }
      default:
    return state;
  }
  });
}
