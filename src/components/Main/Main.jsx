import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import { Modal } from "../Modal/Modal";

export function Main({ id, setId, apiToken, setApiToken }) {
  const [modal, setModal] = useState(false);
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [chat, setChat] = useState([]);
  const [receiptId, setReceiptId] = useState("");
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
    fetch(
      `https://api.green-api.com/waInstance1101823388/sendMessage/54c3b69903624385a9d74182a570383e3e0fcb646e6b4166a8`,
      {
        method: "POST",
        body: JSON.stringify({
          chatId: `${number}@c.us`,
          message: message,
        }),
      }
    );
    setAllMessages([...allMessages, { message: message, type: "outgoing" }]);
    setMessage("");
    console.log(allMessages);
  };

  /*const handleGetMessage = () => {
    fetch(`https://api.green-api.com/waInstance${id}/ReceiveNotification/${apiToken}
    `)
      .then((response) => response.json())
      .then((data) => {
        setReceiptId(data.receiptId);
        console.log(data);
        setAllMessages([
          ...allMessages,
          {
            message: data.body.messageData.textMessageData.textMessage,
            type: "incoming",
          },
        ]);
        return data;
      })
      .then((data) => {
        fetch(
          `https://api.green-api.com/waInstance${id}/DeleteNotification/${apiToken}/${data.receiptId}`,
          {
            method: "DELETE",
          }
        );
        setReceiptId("");
      });
  }; */

  useEffect(() => {
    let timerId = setInterval(
      () =>
        fetch(`https://api.green-api.com/waInstance${id}/ReceiveNotification/${apiToken}
    `)
          .then((response) => response.json())
          .then((data) => {
            setReceiptId(data.receiptId);
            console.log(data);
            setAllMessages([
              ...allMessages,
              {
                message: data.body.messageData.textMessageData.textMessage,
                type: "incoming",
              },
            ]);
            return data;
          })
          .then((data) => {
            if (data.receiptId) {
              fetch(
                `https://api.green-api.com/waInstance${id}/DeleteNotification/${apiToken}/${data.receiptId}`,
                {
                  method: "DELETE",
                }
              );
              console.log(receiptId);
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
  }, [id, apiToken, allMessages, receiptId]);

  return (
    <div className={styles.chatPlace}>
      <div className={styles.chats}>
        <h3 className={styles.title}>Список чатов</h3>
        {chat.length >= 1 &&
          chat.map((item) => (
            <p key={item} className={styles.item}>
              {item}
            </p>
          ))}
      </div>
      <div className={styles.menu}>
        <p>{number}</p>
        <div>
          <button className={styles.button} onClick={() => setModal(true)}>
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
        {allMessages.length >= 1 &&
          allMessages.map((mess) => (
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
