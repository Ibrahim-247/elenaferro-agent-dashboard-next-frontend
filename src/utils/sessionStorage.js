const isBrowser = () => typeof window !== "undefined";

// Set item
export const setSessionStorage = (key, value) => {
  if (!isBrowser()) return;

  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("SessionStorage set error:", error);
  }
};

// Get item
export const getSessionStorage = (key) => {
  if (!isBrowser()) return null;

  try {
    const value = sessionStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  } catch (error) {
    console.error("SessionStorage get error:", error);
    return null;
  }
};

// Remove item
export const removeSessionStorage = (key) => {
  if (!isBrowser()) return;

  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error("SessionStorage remove error:", error);
  }
};

// Clear all
export const clearSessionStorage = () => {
  if (!isBrowser()) return;

  try {
    sessionStorage.clear();
  } catch (error) {
    console.error("SessionStorage clear error:", error);
  }
};
