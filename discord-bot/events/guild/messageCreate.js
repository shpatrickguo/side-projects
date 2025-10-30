require("dotenv").config();

const cooldowns = new Map();

module.exports = (client, message) => {
  const prefix = process.env.PREFIX || '!';
  
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  
  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command =
    client.commands.get(cmd) ||
    client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

  if (!command) return;

  try {
    command.execute(message, args, cmd, client);
  } catch (err) {
    message.reply("There was an error when trying to execute this command!");
    console.error(err);
  }
};
