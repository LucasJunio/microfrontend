  
export function addEnterpriseRequest(object) {
  return {
      type: '@account/ADD_ENTERPRISE',
      payload: object,
  };
}

export function readEnterpriseRequest() {
  return {
      type: '@account/READ_ENTERPRISE'
  };
}

export function returnEnterpriseRequest(object) {
  return {
      type: '@account/RETURN_ENTERPRISE',
      payload: { object }
  };
}

export function updateEnterpriseRequest(object) {
  return {
      type: '@account/UPDATE_ENTERPRISE',
      payload: object,
  };
}
