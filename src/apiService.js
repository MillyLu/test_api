export const login = async (idInstance, apiTokenInstance) => {
  const response = await fetch(
    `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
    {
      method: "GET",
    }
  );
  return  response.json(); //// await 
};

export const exit = async (id, apiToken) => {
  const response = await fetch(
    `https://api.green-api.com/waInstance${id}/Logout/${apiToken}`,
    {
      method: "GET",
    }
  );

  return await response.json();
};

export const sendMessage = async (id, apiToken, number, message) => {
  const response = await fetch(
    `https://api.green-api.com/waInstance${id}/sendMessage/${apiToken}`,
    {
      method: "POST",
      body: JSON.stringify({
        chatId: `${number}@c.us`,
        message: message,
      }),
    }
  );

  return response;
};


export const receiveMessage = async(id, apiToken) => {
    const response = await fetch(`https://api.green-api.com/waInstance${id}/ReceiveNotification/${apiToken}
    `);
    return await response.json();
}

export const deleteNotification = async(id, apiToken, receiptId) => {
 const response = await fetch(
    `https://api.green-api.com/waInstance${id}/DeleteNotification/${apiToken}/${receiptId}`,
    {
      method: "DELETE",
    }
  );
  return response;
}
