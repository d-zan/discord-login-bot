# discord-login-bot

A simple package that allows you to log in a bot and join a voice channel and set status.

## Installation

To install this package, run the command in your **terminal/shell**:

```shell
npm install discord-login-bot
```

## Usage

To use this package, create a new instance of the discordBot class and call the login method to log in to Discord.

```js
const { discordBot } = require("discord-login-bot");

const bot = new discordBot("YOUR_BOT_TOKEN");
bot.login(); //login
bot.joinVoice("channelId"); // if you want bot join voice channel
bot.setStatus("online", "PLAYING", "Powered by discord-login-bot"); // add status bot
```

## Methods

### login()

**Log in to Discord**

### joinVoice(channelId)

Joins a voice channel with the provided ID.

`channelId`: **The ID of the voice channel to join.**

### setStatus(status, type, text)

Sets the bot's status.

- `status`: The status to set **(e.g. "dnd" or "online")**.
- `type`: The type of activity to set **(e.g. "PLAYING" or "WATCHING")**.
- `text`: The text to display in the bot's status.

---

## License

This package is licensed under the MIT License.

## Acknowledgments

This package uses the discord.js v13 library and the @discordjs/voice library chalk library.

## developer

discord : dz0.
