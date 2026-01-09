// Set item in localStorage
export const setLocalStorage = (key, value) => {
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
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage: ${error}`);
  }
};

// Clear all localStorage
export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`);
  }
};
