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
