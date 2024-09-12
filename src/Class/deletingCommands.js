const db = require("../tools/db");

const chalk = require("chalk");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

class deletingCommands {
  /**
   * @param {string} clientId
   * @param {string} guildId
   */
  constructor(clientId, guildId) {
    this.clientId = clientId;
    this.guildId = guildId;
  }
  async guild() {
    const token = await db.get("token");
    if (!token) return console.error("Undefined token bot");
    const rest = new REST({ version: "9" }).setToken(token);

    rest
      .put(Routes.applicationGuildCommands(this.clientId, this.guildId), {
        body: [],
      })
      .then(() => console.log("Successfully deleted all guild commands."))
      .catch(console.error);
    return this;
  }
  async global() {
    const token = await db.get("token");
    if (!token) return console.error("Undefined token bot");
    const rest = new REST({ version: "9" }).setToken(token);

    rest
      .put(Routes.applicationCommands(this.clientId), {
        body: [],
      })
      .then(() => console.log("Successfully deleted all application commands."))
      .catch(console.error);
    return this;
  }
}

module.exports = deletingCommands;
