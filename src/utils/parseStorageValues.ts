const parseStorageValues = (changes: chrome.storage.StorageChange) => {
  const parsedChanges = Object.entries(changes).reduce(
    (acc: any, [key, complexValue]) => {
      const newValueExists = complexValue.newValue || complexValue.newValue === null || complexValue.newValue === false;
      const value = newValueExists ? complexValue.newValue : complexValue;
      let parsedValue;
      try {
        parsedValue = JSON.parse(value);
      } catch (e) {
        parsedValue = value;
      }
      acc[key] = parsedValue;
      return acc;
    },
    {},
  );

  return parsedChanges;
};

export default parseStorageValues;