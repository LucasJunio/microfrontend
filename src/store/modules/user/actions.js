  
export function addUserRequest(object) {
  return {
      type: '@user/ADD_USER',
      payload: object,
  };
}

export function readUserRequest() {
  return {
      type: '@user/READ_USER'
  };
}

export function returnUserRequest(object) {
  return {
      type: '@user/RETURN_USER',
      payload: { object }
  };
}

export function updateUserRequest(object) {
  return {
      type: '@user/UPDATE_USER',
      payload: object,
  };
}
