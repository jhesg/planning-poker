import { Server } from "socket.io";
import type { ServerOptions } from "socket.io";
import type { DefaultEventsMap } from "socket.io/dist/typed-events";

import type { NextApiRequest, NextApiResponse } from "next";

type Req = NextApiRequest;
type Res = NextApiResponse & {
  socket: {
    server: ServerOptions & {
      io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
    };
  };
};

const SocketHandler = (req: Req, res: Res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", msg);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
