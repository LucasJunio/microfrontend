  
export function addAddressRequest(object) {
  return {
      type: '@address/ADD_ADDRESS',
      payload: object,
  };
}

export function readAddressRequest() {
  return {
      type: '@address/READ_ADDRESS'
  };
}

export function insertAddressCPFRequest(object) {
  return {
      type: '@address/INSERT_ADDRESS_CPF',
      payload: { object }
  };
}

export function insertAddressCNPJRequest(object) {
  return {
      type: '@address/INSERT_ADDRESS_CNPJ',
      payload: { object }
  };
}

export function updateAddressRequest(object) {
  return {
      type: '@address/UPDATE_ADDRESS',
      payload: object,
  };
}
