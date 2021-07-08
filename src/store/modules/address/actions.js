  
export function addAddressRequest(object) {
  return {
      type: '@account/ADD_ADDRESS',
      payload: object,
  };
}

export function readAddressRequest() {
  return {
      type: '@account/READ_ADDRESS'
  };
}

export function returnAddressRequest(object) {
  return {
      type: '@account/RETURN_ADDRESS',
      payload: { object }
  };
}

export function updateAddressRequest(object) {
  return {
      type: '@account/UPDATE_ADDRESS',
      payload: object,
  };
}
