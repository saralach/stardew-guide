import { useState } from "react";
import Router from "next/router";
import { signIn } from "next-auth/react";
import styles from '../styles/Login.module.css';

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isLogin) {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });
  
      if (res.error)
        setMessage(res.error);
      else
        Router.push("/Perfection_Tracker");
    }
    else {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await res.json();
  
      if (res.status === 201) {
        // Automatically sign the user in after successful registration
        const signInResponse = await signIn("credentials", {
          redirect: false,
          username,
          password,
        });

        if (signInResponse?.error) {
          setMessage("Failed to log in after registration.");
        } 
        else {
          Router.push("/Perfection_Tracker");
        }
      }
      else {
        setMessage(data.message);
      }
    }


  };

  const switchMenu = () => {
    setIsLogin(!isLogin);
  }


  return (
    <main className={styles.logincontainer}>
      <div className={styles.tabcontainer}>
        <button disabled={!isLogin} onClick={switchMenu} className={styles.tab}>
          Register
        </button>
        <button disabled={isLogin} onClick={switchMenu} className={styles.tab}>
          Login
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          { 
            isLogin ? "Login" : "Register"
          }
        </button>
      </form>
      {
        message && <p>{message}</p>
      }
    </main>
  );
}