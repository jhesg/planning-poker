import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/router";

import type { User } from "@/utils";
import { useHistoryPushParam } from "@/hooks/useHistoryPushParam";

type QParams = {
  room: string;
  username: string;
  id?: string;
};

type RoomData = {
  room: string;
  users: Array<User>;
};

const defaultRoomData: RoomData = {
  room: "",
  users: [],
};

let socket: Socket = io();

export function useSocket() {
  const router = useRouter();
  const historyPushParam = useHistoryPushParam();

  const [roomData, setRoomData] = useState<RoomData>(defaultRoomData);

  const { id, room, username } = router.query as QParams;

  const init = async () => {
    const url = `/api/socket`;
    await fetch(url);

    socket.emit(
      "join",
      { id, username, room },
      ([user, message]: [User, string]) => {
        if (message) {
          console.log("🚀 ~ callback", message);
          // alert(error);
        }

        if (user) {
          historyPushParam({ id: user.id });
        }
      }
    );

    socket.on("room-data", ({ room, users }) => {
      setRoomData({ room, users });
    });

    // socket.on("connection", (socket) => {
    //   socket.on("vote", (msg: string) => {
    //     socket.broadcast.emit("update-vote", msg);
    //   });
    // });
  };

  useEffect(() => {
    const valid = username !== undefined || room !== undefined;

    valid && init();
  }, [username, room]);

  return [socket, roomData] as const;
}
