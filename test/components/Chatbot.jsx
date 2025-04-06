import { useEffect } from "react";
import ChatbotProvider from "../context/ChatbotContext";
import { ChatbotBody } from "./ChatbotBody";
import { ChatbotHeader } from "./ChatbotHeader";
import { ChatbotInput } from "./ChatbotInput";

export const Chatbot = () => {
  return (
    <>
      <div style={{ width: "100%", height: "auto" }}>
        <ChatbotProvider>
          <ChatbotHeader />
          <ChatbotBody />
          <ChatbotInput />
        </ChatbotProvider>
      </div>
    </>
  );
};
