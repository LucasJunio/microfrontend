  
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

export function insertUserRequest(object) {
  return {
      type: '@user/INSERT_USER',
      payload: object 
  };
}

export function updateUserRequest(object) {
  return {
      type: '@user/UPDATE_USER',
      payload: object,
  };
}
