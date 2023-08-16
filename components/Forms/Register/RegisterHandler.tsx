import { NextRouter } from "next/router";

const registerHandler = async (
  e: React.FormEvent,
  completed: boolean,
  setUserNameExists: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  name:string,
  password:string,
  router:NextRouter
) => {
  e.preventDefault();
  if (!completed) {
    return;
  }

  let checkUserName = false;
  try {
    const req = await fetch(
      "https://guitar-store-fa2db-default-rtdb.firebaseio.com/users.json"
    );
    const res = await req.json();

    for (const key in res) {
      if (res[key].userName === name.trim()) {
        checkUserName = true;
        break;
      }
    }
    if (checkUserName) {
      setUserNameExists(true);
      console.log('exists');
      return;
    }
  } catch (err) {
    console.log(err);
  }

  try {
    setLoading(true);

    const data = {
      userName: name.trim(),
      password: password,
      cart: [],
    };

    await fetch(
      "https://guitar-store-fa2db-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    router.push("/login");
  } catch (error) {
    setLoading(false);
    console.error("Error al enviar datos:", error);
  }
};

export default registerHandler;
