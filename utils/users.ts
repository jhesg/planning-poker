export type User = {
  id: string;
  username: string;
  room: string;
};

const users: User[] = [];

export const addUser = ({
  id,
  username,
  room,
}: User): [User | undefined, string | undefined] => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!username || !room) {
    return [undefined, "Username and room are required!"];
  }

  const existingUser = users.find((user) => {
    return user.room == room && user.username == username;
  });

  if (existingUser) {
    return [undefined, `username: "${username}" is already taken`];
  }

  const user: User = { id, username, room };
  users.push(user);

  return [user, undefined];
};

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  return index !== -1 && users.splice(index, 1)[0];
};

export const getAllUsers = () => users;

export const getUser = (id: string) => {
  return users.find((user) => {
    return user.id === id;
  });
};

export const getUsersInRoom = (room: string) =>
  users.filter((user) => user.room === room);
