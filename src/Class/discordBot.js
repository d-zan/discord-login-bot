const { Client } = require("discord.js");
const chalk = require("chalk");
const client = new Client({ intents: 32767 });
const { joinVoiceChannel } = require("@discordjs/voice");

/**
 * Discord Bot class that helps create a Discord bot, log in, and join a voice channel.
 * @class discordBot
 * @param {string} token - The token for the bot.
 */
class discordBot {
  constructor(token = "") {
    this.token = token;
    this.client = client;
  }

  /**
   * Logs in to Discord using the provided token.
   * @method login
   * @returns {Promise<this>} The bot instance after logging in.
   */
  login() {
    if (!this.token) {
      console.error("Undefined token bot");
      return this;
    }

    this.client.login(this.token);
    this.client.once("ready", () => {
      console.log(chalk.green.bold(`Login ${this.client.user.tag}`));
    });
    return this;
  }
  /**
   * Joins a voice channel with the provided ID.
   * @method joinVoice
   * @param {string} channelId - The **ID** of the voice channel to join.
   * @returns {Promise<this>} The bot instance after joining the voice channel.
   */
  joinVoice(channelId = "") {
    if (!channelId) {
      console.error(chalk.red.bold("Undefined channel id."));
      return this;
    }
    this.client.once("ready", () => {
      const channel = this.client.channels.cache.get(channelId);
      setTimeout(() => {
        this.client.channels
          .fetch(channel.id)
          .then((channel) => {
            joinVoiceChannel({
              channelId: channel.id,
              guildId: channel.guild.id,
              adapterCreator: channel.guild.voiceAdapterCreator,
            });
            console.log(
              `${chalk.green.bold("Join voice channel")} #${channel.name} in ${
                channel.guild.name
              }`
            );
          })
          .catch((error) => {
            console.error(chalk.red("ERROR_JOIN_VOICE: " + error));
          });
      }, 5000);
    });

    return this;
  }
/**
 * A user Status. Must be one of:
 * * `online`
 * * `idle`
 * * `invisible`
 * * `dnd` (do not disturb)
 * @typedef {string} StatusData
 */
/**
 * A user Activity. Must be one of:
 * * `PLAYING`
 * * `WATCHING`
 * * `LISTENING`
 * @typedef {string} ActivitytData
 */
/**
 * Sets the bot's status.
 * @method setStatus
 * @param {StatusData} status - The status to set (e.g. "dnd" or "online")
 * @param {ActivitytData} type - The type of activity to set **(e.g. "PLAYING" or "WATCHING")**.
 * @param {string} text - The text to display in the bot's status.
 * @returns {this}
 */
setStatus(status, type, text = "Powered by discord-login") {
  this.client.once("ready", () => {
    this.client.user.setStatus(status);
    this.client.user.setActivity(text, { type: type.toUpperCase() });
  });
  return this;
}
}

module.exports = discordBot;
