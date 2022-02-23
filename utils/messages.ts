type MessageTypes = "log" | "vote";

export const createMessage = (
  username: string,
  message: string,
  type: MessageTypes = "log"
) => {
  return {
    type,
    username,
    message,
    createdAt: new Date().getTime(),
  };
};
