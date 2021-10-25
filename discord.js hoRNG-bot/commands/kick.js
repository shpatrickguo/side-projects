module.exports = {
  name: "kick",
  permissions: ["KICK_MEMBERS"],
  description: "kicks a member",
  execute(message, args, cmd, client, Discord) {
    if (message.member.roles.cache.has("810768729415483422")) {
      const member = message.mentions.users.first();
      if (member) {
        const memberTarget = message.guild.members.cache.get(member.id);
        memberTarget.kick();
        message.channel.send("User has been kicked");
      } else {
        message.channel.send("You couldn't kick the member");
      }
    } else {
      message.channel.send("You don't have permission to do that.");
    }
  },
};
