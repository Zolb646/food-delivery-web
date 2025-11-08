export const checkIfInputHasNumbers = (string) => /[0-9]/.test(string);
export const checkIfInputHasSpecialCharacters = (string) =>
  /[^a-zA-Z\s]/.test(string);
