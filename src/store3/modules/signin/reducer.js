import produce from "immer";

const INITIAL_STATE = {
  token: "",
  signed: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@auth/SIGNIN_SUCCESS": {
        draft.token = action.payload.token;
        draft.signed = true;
        break;
      }
      case "@auth/SIGNUP_SUCCESS": {
        draft.signed = true;
        break;
      }
      case "@auth/SIGNIN_OUT": {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
        return state;
    }
  });
}
