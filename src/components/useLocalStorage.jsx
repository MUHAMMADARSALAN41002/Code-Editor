import React, { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const local_storage_key = "codepen-clone-" + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(local_storage_key);
    if (jsonValue !== null) return JSON.parse(jsonValue);
    else return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(local_storage_key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
