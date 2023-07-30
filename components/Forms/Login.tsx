const LoginForm = () => {
  return (
    <form className="formDiv">
      <input
        className="input"
        type="text"
        placeholder="Nombre de usuario"
      />
      <input
        className="input"
        type="password"
        placeholder="Contraseña"
      />
      <div className="text-center pt-6 text-xl">
        <button className="formButton">
          INICIAR SESIÓN
        </button>
      </div>
    </form>
  );
};
export default LoginForm;
