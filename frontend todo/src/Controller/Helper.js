//validate email
export const ValidateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@}]+\.[^\s@]+$/;
    return regex.test(email);
  };