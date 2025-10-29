const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: "unmute",
  permissions: [PermissionFlagsBits.ModerateMembers],
  description: "Remove timeout/unmute a member",
  async execute(message, args, cmd, client) {
    // Check if user has moderate members permission
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return message.channel.send("You don't have permission to unmute members.");
    }

    const target = message.mentions.users.first();
    if (!target) {
      return message.channel.send("Please mention a user to unmute.");
    }

    const memberTarget = message.guild.members.cache.get(target.id);
    if (!memberTarget) {
      return message.channel.send("User not found in this server.");
    }

    try {
      // Remove timeout (Discord.js v14)
      await memberTarget.timeout(null, `Unmuted by ${message.author.tag}`);
      message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
    } catch (err) {
      console.error(err);
      message.channel.send("Failed to unmute the member. Make sure I have the necessary permissions.");
    }
  },
};
