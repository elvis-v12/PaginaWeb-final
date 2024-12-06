document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  if (chatMessages) {
    chatMessages.innerHTML = `
      <div class="waiting-message">
        <img src="https://i.pinimg.com/originals/21/a1/aa/21a1aa2537400d0232efd93e108fd953.gif" alt="Esperando...">
        <p>Esperando...</p>
      </div>
    `;
  } else {
    console.error("Elemento con ID 'chat-messages' no encontrado");
  }

  const conversations = {
    "Juan Pérez": [
      { sender: "received", text: "¡Hola! ¿Cómo estás?", time: getCurrentTime() },
      { sender: "sent", text: "Hola, estoy bien. ¿Y tú?", time: getCurrentTime() },
    ],
    "María Rodríguez": [
      { sender: "received", text: "¿Nos vemos mañana?", time: getCurrentTime() },
      { sender: "sent", text: "¡Claro! ¿A qué hora?", time: getCurrentTime() },
    ],
    "Carlos Sánchez": [
      { sender: "received", text: "¿Qué opinas del proyecto?", time: getCurrentTime() },
      { sender: "sent", text: "Creo que va bien, falta definir detalles.", time: getCurrentTime() },
    ],
  };

  let currentChat = "";

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function openChat(name) {
    currentChat = name;

    const chatHeader = document.getElementById("chat-header");
    if (chatHeader) {
      chatHeader.innerText = name;
    } else {
      console.error("Elemento con ID 'chat-header' no encontrado");
      return;
    }

    const chatMessages = document.getElementById("chat-messages");
    if (!chatMessages) {
      console.error("Elemento con ID 'chat-messages' no encontrado");
      return;
    }

    chatMessages.innerHTML = "";

    if (conversations[name]) {
      conversations[name].forEach((msg) => {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-container");

        const messageElement = document.createElement("div");
        messageElement.classList.add("message", msg.sender);
        messageElement.innerText = msg.text;

        const timestamp = document.createElement("div");
        timestamp.classList.add("timestamp");
        timestamp.innerText = msg.time;

        messageContainer.appendChild(messageElement);
        messageContainer.appendChild(timestamp);
        chatMessages.appendChild(messageContainer);
      });
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  function sendMessage() {
    const chatInput = document.getElementById("chat-input");
    if (!chatInput) {
      console.error("Elemento con ID 'chat-input' no encontrado");
      return;
    }

    const messageText = chatInput.value.trim();
    if (messageText === "" || !currentChat) return;

    const chatMessages = document.getElementById("chat-messages");
    if (!chatMessages) {
      console.error("Elemento con ID 'chat-messages' no encontrado");
      return;
    }

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "sent");
    messageElement.innerText = messageText;

    const timestamp = document.createElement("div");
    timestamp.classList.add("timestamp");
    timestamp.innerText = getCurrentTime();

    messageContainer.appendChild(messageElement);
    messageContainer.appendChild(timestamp);
    chatMessages.appendChild(messageContainer);
    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    conversations[currentChat].push({
      sender: "sent",
      text: messageText,
      time: getCurrentTime(),
    });

    setTimeout(() => {
      const autoMessageContainer = document.createElement("div");
      autoMessageContainer.classList.add("message-container");

      const receivedMessage = document.createElement("div");
      receivedMessage.classList.add("message", "received");
      receivedMessage.innerText = "¡Gracias por tu mensaje!";

      const autoTimestamp = document.createElement("div");
      autoTimestamp.classList.add("timestamp");
      autoTimestamp.innerText = getCurrentTime();

      autoMessageContainer.appendChild(receivedMessage);
      autoMessageContainer.appendChild(autoTimestamp);
      chatMessages.appendChild(autoMessageContainer);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      conversations[currentChat].push({
        sender: "received",
        text: "¡Gracias por tu mensaje!",
        time: getCurrentTime(),
      });
    }, 1000);
  }

  window.openChat = openChat;
  window.sendMessage = sendMessage;
});
