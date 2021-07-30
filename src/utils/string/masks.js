/**
 * Change a string to CPF format
 * @argument string
 * @returns string
 *
 */

export const maskCpf = (value) => {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{3})/g, "$1.");
  value = value.replace(/(\d{3})(\d{3})/g, "$1.$2-");
  return value;
};

/**
 * Change a string to Date dd/mm/aaaa format
 * @argument string
 * @returns string
 *
 */
export const maskDate = (value) => {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "$1/$2");
  value = value.replace(/(\d)(\d{4})$/, "$1/$2");
  return value;
};

/**
 * Change a string to cellphone number (nn) nnnnn-nnn format
 * @argument string
 * @returns string
 *
 */
export const maskCel = (value) => {
  value = value.replace(/\D/g, ""); //Remove tudo o que não é dígito
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
  value = value.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
  return value;
};

/**
 * Change a string to tell number (nn) nnnn-nnn format
 * @argument string
 * @returns string
 *
 */

export const maskTellPhone = (value) => {
  if (value) {
    value = value.replace(/\D/g, ""); //Remove tudo o que não é dígito
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    value = value.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return value;
  }

  return "";
};

/**
 * Return string with number(s)
 * @argument string
 * @returns string
 *
 */
export const maskNumber = (value) => {
  if (value) {
    value = value.replace(/\D/g, "");
    return value;
  }
  return "";
};

export const maskCnpj = (value) => {
  if (value) {
    let formatedNum = "";
    formatedNum = value.replace(/\D/g, "");
    formatedNum = formatedNum.replace(/^(\d{2})(\d)/, "$1.$2");
    formatedNum = formatedNum.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    formatedNum = formatedNum.replace(/\.(\d{3})(\d)/, ".$1/$2");
    formatedNum = formatedNum.replace(/(\d{4})(\d)/, "$1-$2");
    formatedNum = formatedNum.replace(/(-\d{2})\d+?$/, "$1");
    return formatedNum;
  }
  return "";
};
