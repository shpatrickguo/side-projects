const ms = require('ms');

module.exports = {
    name: "remind",
    aliases: ["timer", "reminder"],
    permissions: [],
    description: "Set a reminder for yourself",
    async execute(message, args, cmd, client) {
      const time = args[0];
      
      if (!time) {
          return message.channel.send("You need to specify a time (e.g., 10m, 1h, 2d)");
      }

      const reminder = args.slice(1).join(" ");
      
      if (!reminder) {
          return message.channel.send("You need to specify what to remind you about");
      }

      const duration = ms(time);
      
      if (!duration || duration < 1000) {
          return message.channel.send("Please provide a valid time format (e.g., 10m, 1h, 2d)");
      }

      message.channel.send(`✅ I'll remind you about "${reminder}" in ${ms(duration, { long: true })}`);
      
      setTimeout(async () => {
          try {
              await message.author.send(`⏰ **Reminder:** ${reminder}`);
          } catch (err) {
              console.error("Could not send DM to user:", err);
              message.channel.send(`<@${message.author.id}> ⏰ **Reminder:** ${reminder}`);
          }
      }, duration);
    },
};