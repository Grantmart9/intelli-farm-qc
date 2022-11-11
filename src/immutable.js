export const setAt = (arr, idx, val) =>
  [arr.slice(0, idx), [val], arr.slice(idx + 1, arr.length)].flat();