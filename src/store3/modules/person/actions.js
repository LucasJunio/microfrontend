  
export function addPersonRequest(object) {
  return {
      type: '@person/ADD_PERSON',
      payload: object,
  };
}

export function readPersonRequest() {
  return {
      type: '@person/READ_PERSON'
  };
}

export function insertPersonRequest(object) {
  return {
      type: '@person/INSERT_PERSON',
      payload: { object }
  };
}

export function updatePersonRequest(object) {
  return {
      type: '@person/UPDATE_PERSON',
      payload: object,
  };
}
