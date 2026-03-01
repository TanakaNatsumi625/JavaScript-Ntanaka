import net from "net";

const MAX = 30000; 
let connected = 0;
let failed = 0;

for (let i = 0; i < MAX; i++) {
  const socket = new net.Socket();

  socket.connect(8000, "127.0.0.1", () => {
    connected++;
    if (connected % 100 === 0) {
      console.log("connected:", connected);
    }
  });

  socket.on("error", (err) => {
    failed++;
    console.error("failed:", failed, err.code);
  });
}