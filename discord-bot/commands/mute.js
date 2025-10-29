const ms = require("ms");
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: "mute",
  permissions: [PermissionFlagsBits.ModerateMembers],
  description: "Timeout/mute a member",
  async execute(message, args, cmd, client) {
    // Check if user has moderate members permission
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return message.channel.send("You don't have permission to mute members.");
    }

    const target = message.mentions.users.first();
    if (!target) {
      return message.channel.send("Please mention a user to mute.");
    }

    const memberTarget = message.guild.members.cache.get(target.id);
    if (!memberTarget) {
      return message.channel.send("User not found in this server.");
    }

    try {
      // Use Discord's timeout feature (Discord.js v14)
      const duration = args[1] ? ms(args[1]) : ms('10m'); // Default 10 minutes
      await memberTarget.timeout(duration, `Muted by ${message.author.tag}`);
      
      if (args[1]) {
        message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(duration)}`);
      } else {
        message.channel.send(`<@${memberTarget.user.id}> has been muted for 10 minutes`);
      }
    } catch (err) {
      console.error(err);
      message.channel.send("Failed to mute the member. Make sure I have the necessary permissions.");
    }
  },
};
