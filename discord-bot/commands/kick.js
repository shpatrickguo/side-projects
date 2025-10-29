const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: "kick",
  permissions: [PermissionFlagsBits.KickMembers],
  description: "Kick a member from the server",
  async execute(message, args, cmd, client) {
    // Check if user has kick permissions
    if (!message.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      return message.channel.send("You don't have permission to kick members.");
    }

    const member = message.mentions.users.first();
    if (!member) {
      return message.channel.send("Please mention a user to kick.");
    }

    const memberTarget = message.guild.members.cache.get(member.id);
    if (!memberTarget) {
      return message.channel.send("User not found in this server.");
    }

    try {
      await memberTarget.kick();
      message.channel.send(`${member.tag} has been kicked.`);
    } catch (err) {
      console.error(err);
      message.channel.send("Failed to kick the member. Make sure I have the necessary permissions.");
    }
  },
};
