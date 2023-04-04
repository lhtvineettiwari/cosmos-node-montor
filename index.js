const WebSocket = require('ws');
const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const urls = JSON.parse(fs.readFileSync('networkUrls.json', 'utf8'));
const teamsUrl = process.env.TEAMS_URL;

const downUrls = new Set();

const connectWebSocket = (urlObj) => {
  const { url, name } = urlObj;
  const ws = new WebSocket(url);
  
  ws.on('open', () => {
    console.log(`Connected to ${name}`);
    if (downUrls.has(url)) {
      downUrls.delete(url);
      sendTeamsMessage(`${name} node is up, \nNode Address: ${url.split(":")[1].replace(/\/\//, "")}`);
    }
  });
  
  ws.on('close', () => {
    console.log(`Disconnected from ${name}`);
    if (!downUrls.has(url)) {
      downUrls.add(url);
      sendTeamsMessage(`${name} node is down, \nNode Address: ${url.split(":")[1].replace(/\/\//, "")}`);
    }
    setTimeout(() => connectWebSocket(urlObj), 5000); // Reconnect after 5 seconds
  });
  
  ws.on('message', (data) => {
    console.log(`Received message from ${name}: ${data}`);
  });
  
  ws.on('error', (error) => {
    console.error(`WebSocket error on ${name}: ${error.message}`);
    if (!downUrls.has(url)) {
      downUrls.add(url);
      sendTeamsMessage(`WebSocket error on ${name}: ${error.message}`);
    }
  });
};

const sendTeamsMessage = (message) => {
  console.log(`Teams message sent: ${message}`)
  console.log(message);
  axios.post(teamsUrl, { text: message })
    .then(() => console.log(`Teams message sent: ${message}`))
    .catch((error) => console.error(`Error sending Teams message: ${error.message}`));
};

urls.forEach((urlObj) => connectWebSocket(urlObj));
