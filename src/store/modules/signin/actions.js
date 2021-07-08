export function signInRequest(email, password) {
  return {
    type: '@auth/SIGNIN_REQUEST',
    payload: { email, password },
    resolve
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGNIN_SUCCESS',
    payload: { token, user },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGNIN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGNIN_OUT'
  };
}
