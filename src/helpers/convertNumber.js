export const convertNumber = (num) => {
  const val = `${num}`.split(".")[0].split("").reverse();
  const afterDot = `${num}`.split(".")[1];
  let result = [];
  for (let i = 0; i < val.length; i++) {
    result.push(val[i]);
    if ((i + 1) % 3 == 0) {
      if (val.length % 3 == 0) {
        if (i + 1 != val.length) {
          result.push(",");
        }
      } else {
        result.push(",");
      }
    }
  }
  return afterDot
    ? `${result.reverse().join("")}.${afterDot}`
    : result.reverse().join("");
};
