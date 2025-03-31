const WebSocket = require('ws');

const port = process.env.PORT || 80;

const wss = new WebSocket.Server({ port: port });

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



console.log('WebSocket server is running on port '+port);
