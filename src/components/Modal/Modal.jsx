import styles from "./Modal.module.css";
import { useState } from "react";

export function Modal({ setNumber, setModal }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const onHandleClick = (e) => {
    e.preventDefault();
    if (value) {
      setNumber(value);
      setModal(false);
    } else {
      setError("Номер не может быть пустым");
    }
  };

  return (
    <div className={styles.modal} onClick={() => setModal(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <label htmlFor="value">Введите номер телефона</label>
        <input className={styles.input} value={value} onChange={(e) => setValue(e.target.value)} />
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} onClick={onHandleClick}>Создать чат</button>
      </div>
    </div>
  );
}
