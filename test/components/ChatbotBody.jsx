import { useEffect, useState } from "react";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import flow from "../ChatFlow/chatFlow";
import { useMessagesContext } from "../context/MessagesContext";

export const ChatbotBody = () => {
  const { messages, setMessages } = useMessagesContext();
  const [currentBlock, setCurrentBlock] = useState("");
  //const [userInputState, setUserInputState] = useState("");
  const [userResponseHistory, setUserResponseHistory] = useState({});

  const messages1 = [
    { id: 1, content: "Hi from Bot", sender: "BOT", type: "string" },
    { id: 11, content: "Hi from Bot", sender: "BOT", type: "string" },
    { id: 2, content: "Hi from User", sender: "USER", type: "string" },
    { id: 3, content: "Mesasage from Bot", sender: "BOT", type: "string" },
    { id: 4, content: "Mesasage from User", sender: "USER", type: "string" },
  ];

  const processBlock = (blockKey) => {
    const uuid = crypto.randomUUID();

    const block = flow[blockKey];
    if (!block) {
      console.error(`Block ${blockKey} is not found in the ChatFlow`);
      return;
    }

    if (block.message) {
      setMessages((prev) => [
        ...prev,
        {
          id: uuid,
          sender: "BOT",
          content:
            typeof block.message === "function"
              ? block.message(userResponseHistory)
              : block.message,
          options: block.options
            ? typeof block.options === "function"
              ? block.options(userResponseHistory)
              : block.options
            : "",
        },
      ]);
    }
    if (!block.options) {
      if (block.nextPath) setCurrentBlock(block.nextPath);
    }
  };

  useEffect(() => {
    if (currentBlock) processBlock(currentBlock);
  }, [currentBlock]);

  useEffect(() => {
    const handleWindowLoad = () => {
      processBlock("start");
    };

    window.addEventListener("load", handleWindowLoad);

    return () => {
      window.removeEventListener("load", handleWindowLoad);
    };
  }, []);

  /**
   * Determines if the message is the first in a consecutive series from the same sender.
   */
  const isFirstMessage = (index) => {
    if (index === 0) {
      return true;
    }
    return messages[index].sender !== messages[index - 1].sender;
  };

  const handleUserInput = (userInput) => {
    const block = flow[currentBlock];
    const uuid = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      { id: uuid, sender: "USER", content: userInput },
    ]);

    setUserResponseHistory((prev) => ({ ...prev, [currentBlock]: userInput }));

    //setUserInputState(userInput);

    if (block.nextPath) {
      setCurrentBlock(() =>
        typeof block.nextPath === "function"
          ? block.nextPath(userInput)
          : block.nextPath
      );
    }
  };

  return (
    <div
      style={{ backgroundColor: "lightgray", height: "100vh", padding: "1rem" }}
    >
      {messages.map((message, index) => {
        const isNewSender = isFirstMessage(index);

        if (message.sender.toUpperCase() === "BOT") {
          return (
            <BotMessage
              key={message.id}
              message={message}
              isNewSender={isNewSender}
              handleUserInput={handleUserInput}
            />
          );
        }

        if (message.sender.toUpperCase() === "USER") {
          return (
            <UserMessage
              key={message.id}
              message={message}
              isNewSender={isNewSender}
            />
          );
        }
      })}
    </div>
  );
};
