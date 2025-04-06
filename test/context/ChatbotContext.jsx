import { createContext, useContext } from "react";
import { MessagesProvider } from "./MessagesContext";

const ChatBotContext = createContext(undefined);
export const useChatBotContext = () => {
  return useContext(ChatBotContext);
};

const ChatbotProvider = ({ children }) => {
  return (
    <ChatBotContext.Provider value={{}}>
      <MessagesProvider>{children}</MessagesProvider>
    </ChatBotContext.Provider>
  );
};

export default ChatbotProvider;
