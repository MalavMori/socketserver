const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 80 });

wss.on('connection', (ws) => {
  console.log('A client connected');
  ws.send('Hello from WebSocket server!');

  ws.on('message', (message) => {
    console.log(message.toString());
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message.toString());
        }
      });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});



console.log('WebSocket server is running on port 80');
