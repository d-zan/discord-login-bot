const { Client } = require("discord.js");
const chalk = require("chalk");
const client = new Client({ intents: 32767 });
const { joinVoiceChannel } = require("@discordjs/voice");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const path = require("path");
const fs = require("fs");
const db = require("../tools/db");

/**
 * Discord Bot class that helps create a Discord bot, log in, and join a voice channel.
 * @class discordBot
 * @param {string} token - The token for the bot.
 */
class discordBot {
  constructor(token) {
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

    this.client.login(this.token).then(db.set("token", this.token));
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
  joinVoice(channelId) {
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
   * Sets the bot's status.
   * @method setStatus
   * @param {string} status - The status to set (e.g. "dnd" or "online")
   * @returns {this}
   */
  setStatus(status) {
    this.client.once("ready", () => {
      this.client.user.setStatus(status);
    });
    return this;
  }
  /**
   * @method setActivity
   * @param {import("discord.js").ActivityType} type
   * @param {string} text - The text to display in the bot's status.
   * @param {string} url - The url streaming (Youtube or Twitch)
   * @returns {this}
   */
  setActivity(text = "Powered by discord-login-bot", type, url) {
    this.client.once("ready", () => {
      if (type === "STREAMING" && url) {
        this.client.user.setActivity(text, { type: type, url: url });
      } else {
        this.client.user.setActivity(text, { type: type });
      }
    });
    return this;
  }
}

module.exports = discordBot;
