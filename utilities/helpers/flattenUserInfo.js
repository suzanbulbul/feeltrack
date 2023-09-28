export const flattenUserInfo = (data) => {
  const result = [];

  for (const key in data) {
    if (key === 'extraInfo' && Array.isArray(data[key]) && data[key].length > 0) {
      for (const subKey in data[key][0]) {
        result.push({ key: subKey, value: data[key][0][subKey] });
      }
    } else {
      result.push({ key, value: data[key] });
    }
  }

  const sortedResult = [];
  sortedResult.push(result.find(item => item.key === 'wakeupTime'));
  for (const item of result) {
    if (item.key !== 'wakeupTime' && item.key !== 'exercise' && item.key !== 'bedtime') {
      sortedResult.push(item);
    }
  }
  sortedResult.push(result.find(item => item.key === 'exercise'));
  sortedResult.push(result.find(item => item.key === 'bedtime'));

  return sortedResult;
};
