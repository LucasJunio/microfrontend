  
export function addEnterpriseRequest(object) {
  return {
      type: '@enterprise/ADD_ENTERPRISE',
      payload: object,
  };
}

export function readEnterpriseRequest() {
  return {
      type: '@enterprise/READ_ENTERPRISE'
  };
}

export function insertEnterpriseRequest(object) {
  return {
      type: '@enterprise/INSERT_ENTERPRISE',
      payload: { object }
  };
}

export function updateEnterpriseRequest(object) {
  return {
      type: '@enterprise/UPDATE_ENTERPRISE',
      payload: object,
  };
}
