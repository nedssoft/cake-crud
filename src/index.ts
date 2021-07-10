require('dotenv').config();
import server from './api';

const http = require('http');

process.on('uncaughtException', (err) => {
  console.log(`${new Date().toUTCString()} uncaughtException:`, err);
  process.exit(0);
});

process.on('SIGINT', (err) => {
  console.log(`${new Date().toUTCString()} SIGINT:`, err);
  process.exit(0);
});
process.on('SIGTERM', (err) => {
  console.log(`${new Date().toUTCString()} SIGTERM:`, err);
  process.exit(0);
});

process.on('ELIFECYCLE', (err) => {
  console.log(`${new Date().toUTCString()} ELIFECYCLE:`, err);
  process.exit(0);
});
process.on('unhandledRejection', (err) => {
  console.log(`${new Date().toUTCString()} unhandledRejection:`, err);
});

const httpServer = http.createServer(server);

const PORT = process.env.PORT || 3000;
const serverUrl = `http://localhost:${PORT}/api`;

httpServer.listen(PORT, () => console.log(`app running at ${serverUrl}`));
