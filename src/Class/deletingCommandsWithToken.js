const chalk = require("chalk");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

class deletingCommandsWithToken {
  /**
   *
   * @param {string} clientId
   * @param {string} guildId
   * @param {string} token
   */
  constructor(clientId, guildId, token) {
    this.clientId = clientId;
    this.guildId = guildId;
    this.token = token;
  }
guild() {
    if (!this.token) return console.error("Undefined token bot");
    const rest = new REST({ version: "9" }).setToken(this.token);

    rest
      .put(Routes.applicationGuildCommands(this.clientId, this.guildId), {
        body: [],
      })
      .then(() => console.log("Successfully deleted all guild commands."))
      .catch(console.error);
    return this;
  }
global() {
    if (!this.token) return console.error("Undefined token bot");
    const rest = new REST({ version: "9" }).setToken(this.token);

    rest
      .put(Routes.applicationCommands(this.clientId), {
        body: [],
      })
      .then(() => console.log("Successfully deleted all application commands."))
      .catch(console.error);
    return this;
  }
}

module.exports = deletingCommandsWithToken;
