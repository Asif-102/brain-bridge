export const groupBy = (array, keyGetter) => {
  return array.reduce((result, currentItem) => {
    const key = keyGetter(currentItem);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(currentItem);
    return result;
  }, {});
};
