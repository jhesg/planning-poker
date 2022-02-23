import { useSocket } from "@/hooks/useSocket";
import type { NextPage } from "next";
import Head from "next/head";

import { useState, useEffect, FormEvent } from "react";

const Home: NextPage = () => {
  // const [state, setState] = useState({
  //   display: false,
  // });

  const [socket, roomData] = useSocket();
  console.log("🚀 ~ roomData", roomData);

  // const setDisplay = (display: boolean) => {
  //   setState({ ...state, display });
  // };

  useEffect(() => {}, []);

  // useEffect(() => {
  // socket.on("update-reveal", (display: boolean) => {
  //   console.log("🚀 ~ update-reveal", display, state.display);
  //   setDisplay(display);
  // });
  // }, []);

  // const handleReveal = () => {
  //   console.log("🚀 ~ handleReveal", state.display);
  //   if (state.display === true) {
  //     socket.emit("hide");
  //   }

  //   if (state.display === false) {
  //     socket.emit("reveal");
  //   }

  //   setDisplay(!state.display);
  // };

  return (
    <div>
      <Head>
        <title>Planning Poker</title>
        <meta name="description" content="Planning poker app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold">Planning Poker</h1>
        {/* <button onClick={handleReveal}>
          {state.display ? "hide" : "reveal"}
        </button> */}
      </main>
    </div>
  );
};

export default Home;
