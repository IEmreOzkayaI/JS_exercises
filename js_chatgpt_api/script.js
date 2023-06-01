const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");

let userMessage = null;
 const API_KEY = ""; // api

const loadDatafFromLocalStorage = () => {
  const themeColor = localStorage.getItem("theme-color");
  document.body.classList.toggle("light-mode", themeColor === "light_mode");
  themeButton.innerText = document.body.classList.contains("light-mode")
    ? "dark_mode"
    : "light_mode";

  const defaultText = `
    <div class="default-text">
        <h1>ChatGPT Clone</h1>
        <p>Start a conversation and explore the power of AI.<br> Your chat history will be displayed here.</p>
    </div>
    `;


  chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

loadDatafFromLocalStorage();

const createElement = (html, className) => {
  const element = document.createElement("div");
  element.classList.add("chat", className);
  element.innerHTML = html;
  return element;
};

const getResponseMessage = async (incomingChatMessage) => {
  const API_URL = "https://api.openai.com/v1/completions";
  const pElement = document.createElement("p");
  const requestOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
          "model": "text-davinci-003",
          "prompt": userMessage,
          "max_tokens": 2048,
          "temperature": 0.2,
          "n": 1,
          "stop": "\n"
      })

  };
  try {
     const response = await(await fetch(API_URL, requestOptions)).json();
    pElement.textContent = response.choices[0].text;
    console.log(response);
  } catch (error) {
    pElement.classList.add("error");
    pElement.textContent = "Sorry, I didn't get that.";
  }
  incomingChatMessage.querySelector(".typing-animation").remove();
  incomingChatMessage.querySelector(".chat-details").appendChild(pElement);

  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  localStorage.setItem("all-chats", chatContainer.innerHTML);
};

const copyResponse = (element) => {
  const responseTextElement = element.parentElement.querySelector("p");
  navigator.clipboard.writeText(responseTextElement.textContent);
  element.textContent = "done";
  setTimeout(() => (element.textContent = "content_copy"), 1000);
};

const showTypingAnimation = () => {
  const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="https://yt3.googleusercontent.com/UysuwNIn3yXy7Vkp2_y26ikzta630PGuFjzStaqMJn6E7nS1KK68DTe3Jb5onaNTNLjUxCzB=s900-c-k-c0x00ffffff-no-rj" alt="user-avatar" class="user-avatar">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay:0.2s"></div>
                            <div class="typing-dot" style="--delay:0.3s"></div>
                            <div class="typing-dot" style="--delay:0.4s"></div>
                        </div>
                    </div>
                    <span onClick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                 </div>`;

  const incomingChatMessage = createElement(html, "incoming");
  chatContainer.appendChild(incomingChatMessage);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  getResponseMessage(incomingChatMessage);
};

const handleOutgoingMessage = () => {

  userMessage = chatInput.value.trim();

  chatInput.value = "";
  chatInput.style.height = `${initialHeight}px`;
  const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="https://avatars.githubusercontent.com/u/72611040?s=96&v=4" alt="user-avatar" class="user-avatar">
                        <p></p>
                    </div>
                 </div>`;

  const outGoingMessage = createElement(html, "outgoing");
  outGoingMessage.querySelector("p").textContent = userMessage;
  document.querySelector(".default-text")?.remove();
  chatContainer.appendChild(outGoingMessage);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  setTimeout(showTypingAnimation, 500);
};

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme-color", themeButton.innerText);
  themeButton.innerText = document.body.classList.contains("light-mode")
    ? "dark_mode"
    : "light_mode";
});

deleteButton.addEventListener("click", () => {
  if (confirm("Are you sure to delete all messages?")) {
    localStorage.removeItem("all-chats");
    loadDatafFromLocalStorage();
  }
});

const initialHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {
    chatInput.style.height =`${initialHeight}px`;
    chatInput.style.height =`${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (event) => {
    if(event.key === "Enter" && !event.shiftKey && window.innerWidth > 768){
        event.preventDefault();
        handleOutgoingMessage();
    }
});

sendButton.addEventListener("click", handleOutgoingMessage);
