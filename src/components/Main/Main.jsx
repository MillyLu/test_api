import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import { Modal } from "../Modal/Modal";
import {
  exit,
  sendMessage,
  receiveMessage,
  deleteNotification,
} from "../../apiService";

export function Main({ id, setId, apiToken, setApiToken }) {
  const [modal, setModal] = useState(false);
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [chat, setChat] = useState([]);
  const [receiptId, setReceiptId] = useState("");
  const [messageByNumber, setMessageByNumber] = useState([]);
  console.log(id, apiToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (number) {
      // eslint-disable-next-line eqeqeq
      setMessageByNumber(allMessages.filter((item) => item.number == number));
    }
  }, [number, allMessages]);

  const handleExit = async () => {
    await exit(id, apiToken); //// await
    localStorage.clear("token");
    setId("");
    setApiToken("");
    const path = "/login";
    navigate(path);
  };

  const handleClick = (item) => {
    setNumber(item);
  };

  const handleSendMessage = () => {
    sendMessage(id, apiToken, number, message)
      .then((response) => {
        setAllMessages([
          ...allMessages,
          { message: message, number: number, type: "outgoing" },
        ]);
        setMessage("");
        console.log(response);
      })

      .catch((e) => console.log(e));
  };

  useEffect(() => {
    let timerId = setInterval(
      () =>
        receiveMessage(id, apiToken)
          .then((data) => {
            setReceiptId(data.receiptId);
            console.log(data);
            if (data.body.messageData.textMessageData) {
              setAllMessages([
                ...allMessages,
                {
                  message: data.body.messageData.textMessageData.textMessage,
                  number: number,
                  type: "incoming",
                },
              ]);
              console.log(data.receiptId);
            }
            return data;
          })
          .then((data) => {
            if (data.receiptId) {
              deleteNotification(id, apiToken, data.receiptId);
              console.log(data.receiptId);
              setReceiptId("");
            }
          })
          .catch((e) => {
            console.log("Error: " + e.message);
            console.log(e.response);
          }),
      5000
    );

    return () => clearInterval(timerId);
  }, [id, apiToken, allMessages, receiptId, number]);

  return (
    <div className={styles.chatPlace}>
      <div className={styles.chats}>
        <div className={styles.chats_title}>
          <h3 className={styles.title}>Список чатов</h3>
        </div>
        <div>
          {chat.length >= 1 &&
            chat.map((item) => (
              <p
                key={item}
                onClick={() => handleClick(item)}
                className={styles.item}
              >
                {item}
              </p>
            ))}
        </div>
      </div>
      <div className={styles.menu}>
        <p className={styles.number}>{number}</p>
        <div>
          <button
            className={styles.button_create}
            onClick={() => setModal(true)}
          >
            Создать чат
          </button>
          {modal && (
            <Modal
              setNumber={setNumber}
              setModal={setModal}
              setChat={setChat}
              chat={chat}
            />
          )}
          <button className={styles.button} onClick={handleExit}>
            Выйти
          </button>
        </div>
      </div>
      <div className={styles.messages}>
        {messageByNumber.length >= 1 &&
          messageByNumber.map((mess) => (
            <p
              className={
                mess.type === "outgoing" ? styles.outgoing : styles.incoming
              }
              key={mess.message}
            >
              {mess.message}
            </p>
          ))}
      </div>
      <div className={styles.text}>
        <input
          type="text"
          className={styles.textInput}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={styles.button} onClick={handleSendMessage}>
          Отправить
        </button>
      </div>
    </div>
  );
}
