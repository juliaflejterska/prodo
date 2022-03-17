import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";

import { useNavigate } from "react-router-dom";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.trim() !== "" && password.length > 5;

    if (!emailIsValid || !passwordIsValid) {
      let errMsg =
        "Your email must contain @ and your password need to be at least 6 characters long.";
      alert(errMsg);
      throw new Error(errMsg);
    }

    setIsLoading(true);

    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6boBODsCs3FN2yZW3-0Ly1hFFtRt4uow";
    }

    if (!isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6boBODsCs3FN2yZW3-0Ly1hFFtRt4uow";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);

        if (res.ok) {
          return res.json();
        }

        if (!res.ok) {
          return res.json().then((data) => {
            let errMsg = "Authentication failed.";

            throw new Error(errMsg);
          });
        }
      })

      .then((data) => {
        authCtx.login(data.idToken);

        navigate("/", { replace: true });
      })

      .catch((err) => alert(err.message));
  };

  return (
    <section>
      <div className={classes.empty}></div>
      <div className={classes.main}>
        <div className={classes.container}>
          <img
            className={classes.img}
            src="https://images.unsplash.com/photo-1580637250481-b78db3e6f84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80"
          ></img>

          <div className={classes.form}>
            <div className={classes.empty}></div>

            <form className={classes.inputs} onSubmit={submitHandler}>
              <div className={classes.input}>
                <h1>{isLogin ? "LOGIN" : "SIGN UP"}</h1>
              </div>
              <div className={classes.input}>
                <h3>e-mail</h3>
                <input ref={emailRef} type="email" id="email" required />
              </div>
              <div className={classes.input}>
                <h3>password</h3>
                <input
                  ref={passwordRef}
                  type="password"
                  id="password"
                  required
                />
              </div>

              <div>
                {!isLoading && (
                  <button className={classes.btn}>
                    {isLogin ? (
                      <span className={classes.span}>LOGIN</span>
                    ) : (
                      <span className={classes.span}>CREATE MY ACCOUNT</span>
                    )}
                  </button>
                )}
                {isLoading && <p>loading...</p>}

                <button
                  className={classes.btn}
                  type="button"
                  onClick={switchAuthModeHandler}
                >
                  {isLogin ? (
                    <span className={classes.span}>CREATE NEW ACCOUNT</span>
                  ) : (
                    <span className={classes.span}>LOGIN</span>
                  )}
                </button>

                <div className={classes.test}>
                  <span>
                    For testing purposes, you can use "test@test.com" and
                    "1234567".
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
