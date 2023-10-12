export const flattenUserInfo = (data) => {
  const result = [];

  for (const key in data) {
    if (key === 'extraInfo' && Array.isArray(data[key]) && data[key].length > 0) {
      for (const subItem of data[key]) {
        for (const subKey in subItem) {
          const subTitle = subKey.charAt(0).toUpperCase() + subKey.slice(1);
          result.push({ key: subKey, title: subTitle, value: subItem[subKey], selected: false });
        }
      }
    } else {
      const title = key === 'wakeupTime' ? 'Wake Up' : key === 'bedtime' ? 'Bed Time' : key.charAt(0).toUpperCase() + key.slice(1);
      const isSpecialKey = key === 'wakeupTime' || key === 'bedtime' || key === 'exercise';
      result.push({ key, title, value: isSpecialKey ? data[key] : data[key], selected: false });
    }
  }

  const sortedResult = [];
  sortedResult.push(result.find(item => item.key === 'wakeupTime'));
  for (const item of result) {
    if (!['wakeupTime', 'exercise', 'bedtime'].includes(item.key)) {
      if (item.key !== 'extraInfo') {
        sortedResult.push(item);
      }
    }
  }
  sortedResult.push(result.find(item => item.key === 'exercise'));
  sortedResult.push(result.find(item => item.key === 'bedtime'));

  return sortedResult;
};
