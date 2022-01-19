import React, { useEffect } from "react";
import io from "socket.io-client";
const socket = () => {
  useEffect(() => {
    // const socket = io("http://localhost:8026");
    // socket.on("connect", (res) => {
    //   console.log("socket_____", res);
    // });

    const socket = io("http://localhost:8026", {
      transports: ["websocket"],
      path: "/socketLiveChat",
      // auth: {
      //   id: "token____________________________________________________",
      // },
      query:{idChannel:13212312313123},
      // auth2: { projectId:123 },
    });

    socket.on("connect_error", async (err) => {
      console.log("connect_error", err.message);
    });
  }, []);
  return <>Text socket</>;
};

export default socket;
