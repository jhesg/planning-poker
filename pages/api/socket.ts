import { Server } from "socket.io";

import type { NextApiRequest, NextApiResponse } from "next";

import {
  addUser,
  getUser,
  removeUser,
  getUsersInRoom,
  createMessage,
} from "../../utils";

type Req = NextApiRequest;
type Res = NextApiResponse & {
  socket: any;
};

const SocketHandler = (req: Req, res: Res) => {
  // const { id }: any = req.query;

  // if (id === undefined) {
  //   res.end();
  // }

  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.on("join", ({ id, username, room }, cb) => {
        const existingUser = getUser(id);

        if (existingUser) {
          io.to(existingUser.room).emit("room-data", {
            room: existingUser.room,
            users: getUsersInRoom(existingUser.room),
          });
          return cb([existingUser, `welcome back "${existingUser.username}"`]);
        }

        const [user, error] = addUser({ id: socket.id, username, room });

        if (user === undefined) {
          return cb([undefined, error]);
        }

        socket.join(user.room);
        socket.emit(
          "message",
          createMessage("system", `You have joined as "${user.username}"`)
        );

        socket.broadcast
          .to(user.room)
          .emit(
            "message",
            createMessage("system", `User "${user.username}" has joined!`)
          );

        io.to(user.room).emit("room-data", {
          room: user.room,
          users: getUsersInRoom(user.room),
        });

        cb([user, undefined]);
      });

      socket.on("disconnect", () => {
        const user = removeUser(socket.id);

        if (user) {
          io.to(user.room).emit(
            "message",
            createMessage("system", `User "${user.username}" has left!`)
          );

          io.to(user.room).emit("room-data", {
            room: user.room,
            users: getUsersInRoom(user.room),
          });
        }
      });

      // socket.on("reveal", () => {
      //   console.log("🚀 ~ socket.on ~ reveal");
      //   socket.broadcast.emit("update-reveal", true);
      // });

      // socket.on("hide", () => {
      //   console.log("🚀 ~ socket.on ~ hide");
      //   socket.broadcast.emit("update-reveal", false);
      // });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;

// import socket, { Req, Res } from "../../utils/socket";
