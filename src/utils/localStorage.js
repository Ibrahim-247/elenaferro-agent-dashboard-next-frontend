const isBrowser = () => typeof window !== "undefined";

// Set item in localStorage
export const setLocalStorage = (key, value) => {
  if (!isBrowser()) return;
  try {
    const stringValue =
      typeof value === "object" && value !== null
        ? JSON.stringify(value)
        : String(value);
    localStorage.setItem(key, stringValue);
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`);
  }
};

// Get item from localStorage
export const getLocalStorage = (key) => {
  if (!isBrowser()) return;
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return null;

    try {
      return JSON.parse(storedValue);
    } catch {
      return storedValue;
    }
  } catch (error) {
    console.error(`Error retrieving from localStorage: ${error}`);
    return null;
  }
};

// Remove item from localStorage
export const removeLocalStorage = (key) => {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage: ${error}`);
  }
};

// Clear all localStorage
export const clearLocalStorage = () => {
  if (!isBrowser()) return;
  try {
    localStorage.clear();
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`);
  }
};
