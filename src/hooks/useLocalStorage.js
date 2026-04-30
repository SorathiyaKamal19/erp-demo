import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        setValue(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error reading localStorage:", error);
    }
  }, [key]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
};