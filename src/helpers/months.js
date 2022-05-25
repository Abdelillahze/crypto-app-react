export const months = Array.from({ length: 12 }, (e, i) =>
  new Date(0, i).toLocaleString({}, { month: "short" })
);
