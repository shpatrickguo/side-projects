module.exports = {
  name: "unmute",
  permissions: ["MUTE_MEMBERS"],
  description: "unmutes a member",
  execute(message, args, cmd, client, Discord) {
    if (message.member.roles.cache.has("810768729415483422")) {
    const target = message.mentions.users.first();
    if (target) {
      let mainRole = message.guild.roles.cache.find(
        (role) => role.name === "member"
      );
      let muteRole = message.guild.roles.cache.find(
        (role) => role.name === "mute"
      );

      let memberTarget = message.guild.members.cache.get(target.id);
      memberTarget.roles.remove(muteRole.id);
      memberTarget.roles.add(mainRole.id);
      message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
    } else {
      message.channel.send("You couldn't unmute the member");
    }
  } else { 
    message.channel.send("You don't have permission to do that.");
  }
  },
  
};
