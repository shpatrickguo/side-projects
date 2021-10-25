require("dotenv").config();
const cooldowns = new Map();
module.exports = (Discord, client, message) => {
  const prefix = process.env.PREFIX;
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command =
    client.commands.get(cmd) ||
    client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

  try {
    command.execute(message, args, cmd, client, Discord);
  } catch (err) {
    message.reply("There was an error when trying to execute this command!");
    console.log(err);
  }
};
