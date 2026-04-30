import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        setValue(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, isLoaded]);

  return [value, setValue, isLoaded];
};