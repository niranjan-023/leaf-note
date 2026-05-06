export const isTokenValid = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    // Decode JWT payload
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Check expiration
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }

    return true;
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return false;
  }
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};