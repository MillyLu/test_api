import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StartModal.module.css";

export function StartModal({ setId, setApiToken }) {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const navigate = useNavigate();

  const handleRequest = async () => {

    if (idInstance && apiTokenInstance) {
      const response = await fetch(
        `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (data.stateInstance === "authorized") {
        localStorage.setItem("token", "true");
        setId(idInstance);
        setApiToken(apiTokenInstance);
        const path = "/";
        navigate(path);
      } else {
        console.error(data);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.title}>Форма входа</h2>
        <label className={styles.text} htmlFor="">
          Введите idInstance
        </label>
        <input
          className={styles.input}
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
          type="text"
        />
        <label className={styles.text} htmlFor="">
          Введите apiTokenInstance
        </label>
        <input
          className={styles.input}
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
          type="text"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleRequest();
          }}
          className={styles.button}
        >
          Войти
        </button>
      </form>
    </div>
  );
}
