const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const commandsPath = path.join(__dirname, "../commands");
  const command_files = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  
  for (const file of command_files) {
    const command = require(`../commands/${file}`);
    if (command.name) {
      client.commands.set(command.name, command);
    }
  }
};
