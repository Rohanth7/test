const BotMessage = ({ message, isNewSender, handleUserInput }) => {
  return (
    <div style={{ display: "flex", fontSize: "20px", marginBottom: "5px" }}>
      {isNewSender && (
        <span class="material-symbols-outlined" style={{ marginLeft: "10px" }}>
          smart_toy
        </span>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          borderRadius: "5px",
          padding: "5px",
          backgroundColor: "lightblue",
        }}
      >
        <div style={{ marginLeft: "10px" }}>{message.content}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {Array.isArray(message.options) &&
            message.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleUserInput(option)}
                style={{
                  height: "30px",
                }}
              >
                {option}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
export default BotMessage;
