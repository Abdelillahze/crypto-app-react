export const convertJsToText = (txt) => {
  const arr = txt.split("");
  const result = [];
  for (let letter of arr) {
    if (letter === letter.toUpperCase()) {
      result.push(" ");
      result.push(letter);
    } else {
      result.push(letter);
    }
  }

  return result.join("");
};
