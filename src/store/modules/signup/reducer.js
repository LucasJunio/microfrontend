import produce from 'immer';

const INITIAL_STATE = {
  token: '',
  signed: false,
  modal: false,
  loading: 'none'
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGNUP_SUCCESS': {
        draft.modal = false;
        draft.signed = true;
        break;
      }
      case '@signup/SIGNUP_REQUEST': {
        draft.loading = '';
        break;
      }
      case '@signup/SIGNUP_RETURN': {
        draft.token = action.payload.token;
        draft.modal = true;
        draft.loading = 'none';
        break;      
    }
      default:
    return state;
  }
  });
}
