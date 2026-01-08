const isBrowser = () => typeof window !== "undefined";

// Set cookie
export const setCookie = (key, value, options = {}) => {
  if (!isBrowser()) return;

  try {
    const { days = 7, path = "/", secure = true, sameSite = "Lax" } = options;

    const expires = new Date(Date.now() + days * 864e5).toUTCString();

    const encodedValue = encodeURIComponent(JSON.stringify(value));

    document.cookie = [
      `${key}=${encodedValue}`,
      `expires=${expires}`,
      `path=${path}`,
      secure ? "Secure" : "",
      `SameSite=${sameSite}`,
    ]
      .filter(Boolean)
      .join("; ");
  } catch (error) {
    console.error("Cookie set error:", error);
  }
};

// get cookie
export const getCookie = (key) => {
  if (!isBrowser()) return null;

  try {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
      const [cookieKey, cookieValue] = cookie.split("=");
      if (cookieKey === key) {
        return JSON.parse(decodeURIComponent(cookieValue));
      }
    }
    return null;
  } catch (error) {
    console.error("Cookie get error:", error);
    return null;
  }
};

// clear

export const clearAllCookies = () => {
  if (!isBrowser()) return;

  try {
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  } catch (error) {
    console.error("Cookie clear error:", error);
  }
};

// remove

export const removeCookie = (key, options = {}) => {
  try {
    const { path = "/", domain, secure = false, sameSite = "Lax" } = options;

    let cookieString = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;

    if (domain) {
      cookieString += ` domain=${domain};`;
    }

    if (secure) {
      cookieString += " secure;";
    }

    if (sameSite) {
      cookieString += ` samesite=${sameSite};`;
    }

    document.cookie = cookieString;
  } catch (error) {
    console.error(`Error removing cookie "${key}":`, error);
  }
};
