import type { NextPage } from "next";
import Head from "next/head";

import { useEffect, useState, useRef, ChangeEvent } from "react";

import { io, Socket } from "socket.io-client";

// const useSocket = () => {
//   const _socket: Socket = io();
//   const ref = useRef(_socket);

//   const socket = ref.current;

//   socket.on("connect", () => {
//     console.log("connected");
//   });

//   return socket;
// };

let socket: Socket;

const Home: NextPage = () => {
  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("connection", (socket) => {
      socket.on("input-change", (msg: string) => {
        socket.broadcast.emit("update-input", msg);
      });
    });

    socket.on("update-input", (msg) => {
      setInput(msg);
    });
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  const [input, setInput] = useState("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e?.target?.value;
    setInput(text);
    socket.emit("input-change", text);
  };

  return (
    <div>
      <Head>
        <title>Planning Poker</title>
        <meta name="description" content="Planning poker app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold">Planning Poker</h1>
        <input
          placeholder="Type something"
          value={input}
          onChange={onChangeHandler}
        />
      </main>

      <footer className="flex items-center content-center flex-1 px-0 py-2 border-t border-emerald-600 ">
        <a
          href="#"
          target="_self"
          rel="noopener noreferrer"
          className="flex items-center justify-center flex-grow text-emerald-500"
        >
          Powered by JhesG
        </a>
      </footer>
    </div>
  );
};

export default Home;
