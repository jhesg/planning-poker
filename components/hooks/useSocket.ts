import { useEffect, useMemo } from "react";
import { io, Socket } from "socket.io-client";

export default function useSocket(eventName: string, cb: () => void) {
  const socket = useMemo<Socket>(() => io(), []);

  useEffect(() => {
    socket.on(eventName, cb);

    return () => {
      socket.off(eventName, cb);
    };
  }, [eventName, cb]);

  return socket;
}
