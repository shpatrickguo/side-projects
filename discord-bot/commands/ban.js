const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: "ban",
  permissions: [PermissionFlagsBits.BanMembers],
  description: "Ban a member from the server",
  async execute(message, args, cmd, client) {
    // Check if user has ban permissions
    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      return message.channel.send("You don't have permission to ban members.");
    }

    const member = message.mentions.users.first();
    if (!member) {
      return message.channel.send("Please mention a user to ban.");
    }

    const memberTarget = message.guild.members.cache.get(member.id);
    if (!memberTarget) {
      return message.channel.send("User not found in this server.");
    }

    try {
      await memberTarget.ban();
      message.channel.send(`${member.tag} has been banned.`);
    } catch (err) {
      console.error(err);
      message.channel.send("Failed to ban the member. Make sure I have the necessary permissions.");
    }
  },
};
