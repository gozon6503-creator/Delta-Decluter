require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const bot = new TelegramBot(process.env.TOKEN, { webHook: true });
const app = express();
app.use(express.json());

// answer /start
bot.onText(/\/start/, msg => {
  bot.sendMessage(msg.chat.id,
    "🟢 Delta Declutter is online!\n" +
    "Tap /sell if you want to sell something\n" +
    "Tap /buy (coming soon)");
});

// keep alive + webhook endpoint
app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
app.listen(3000, () => console.log('Bot listening on port 3000'));
