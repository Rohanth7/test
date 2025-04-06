const UserMessage = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "right",
        fontSize: "20px",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "5px",
        backgroundColor: "lightblue",
        width: "fit-content",
        marginBottom: "5px",
        marginLeft: "auto",
      }}
    >
      <div style={{ marginLeft: "10px" }}>{message.content}</div>
    </div>
  );
};
export default UserMessage;
