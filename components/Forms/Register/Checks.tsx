const Checks = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  const nameIsOK = name.trim().length >= 3;
  const emailIsOK = email.trim().includes(".") && email.trim().includes("@");
  const passwordIsOK =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[/*.])[\w/*\.]{4,}$/.test(
      password.trim()
    );
  const midPassword =
    (/^(?=.*[a-z])(?=.*\d)[A-Za-z\d.]{4,}$/.test(password.trim()) &&
      !passwordIsOK) ||
    (password.length > 5 && !passwordIsOK);
  const confirmPasswordIsOk = password.trim() === confirmPassword.trim();

  const completed =
    nameIsOK && emailIsOK && (passwordIsOK || midPassword) && confirmPasswordIsOk;
  return {
    emailIsOK,
    nameIsOK,
    midPassword,
    passwordIsOK,
    confirmPasswordIsOk,
    completed,
  };
};
export default Checks;
