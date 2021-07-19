  
export function addAccountRequest(object) {
  return {
      type: '@account/ADD_ACCOUNT',
      payload: object,
  };
}

export function readAccountRequest() {
  return {
      type: '@account/READ_ACCOUNT'
  };
}

export function insertAccountRequest(object) {
  return {
      type: '@account/INSERT_ACCOUNT',
      payload: { object }
  };
}

export function updateAccountRequest(object) {
  return {
      type: '@account/UPDATE_ACCOUNT',
      payload: object,
  };
}
