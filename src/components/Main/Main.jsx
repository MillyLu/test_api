import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import { Modal } from "../Modal/Modal";

export function Main({ id, setId, apiToken, setApiToken }) {
  const [modal, setModal] = useState(false);
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  console.log(id, apiToken);
  const navigate = useNavigate();

  const handleExit = () => {
    fetch(`https://api.green-api.com/waInstance${id}/Logout/${apiToken}`, {
      method: "GET",
    });
    localStorage.clear("token");
    setId("");
    setApiToken("");
    const path = "/login";
    navigate(path);
  };

  const handleSendMessage = () => {
    fetch(`https://api.green-api.com/waInstance${id}/sendMessage/${apiToken}`, {
      method: "POST",
      body: {
        chatId: `${number}@c.us`,
        message: message,
      },
    });
  };

  return (
    <div className={styles.chatPlace}>
      <div className={styles.chats}>Список чатов</div>
      <div className={styles.menu}>
        <p>{number}</p>
        <div>
          <button className={styles.button} onClick={() => setModal(true)}>
            Создать чат
          </button>
          {modal && <Modal setNumber={setNumber} setModal={setModal} />}
          <button className={styles.button} onClick={handleExit}>
            Выйти
          </button>
        </div>
      </div>
      <div className={styles.messages}></div>
      <div className={styles.text}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Отправить</button>
      </div>
    </div>
  );
}
