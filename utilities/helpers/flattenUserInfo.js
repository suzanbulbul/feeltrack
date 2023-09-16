
  export const  flattenUserInfo = (data, prefix = '') => {
    let result = {};
  
    for (const key in data) {
        if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
            const nestedKeys = flattenUserInfo(data[key], prefix );
            result = { ...result, ...nestedKeys };
        } else {
            result[prefix + key] = data[key];
        }
    }
  
    return result;
  }