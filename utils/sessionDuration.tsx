export const getSessionDuration = () => {
  const storedExpirationDate = localStorage.getItem("expiration");
  if (storedExpirationDate) {
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const remaining = expirationDate.getTime() - now.getTime();
    return remaining;
  }
};
