const ms = require("ms");

module.exports = {
  name: "mute",
  permissions: ["MUTE_MEMBERS"],
  description: "mutes a member",
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

        if (!args[1]) {
          memberTarget.roles.remove(mainRole.id);
          memberTarget.roles.add(muteRole.id);
          message.channel.send(`<@${memberTarget.user.id}> has been muted`);
          return;
        }
        memberTarget.roles.remove(mainRole.id);
        memberTarget.roles.add(muteRole.id);
        message.channel.send(
          `<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`
        );

        setTimeout(function () {
          memberTarget.roles.remove(muteRole.id);
          memberTarget.roles.add(mainRole.id);
        }, ms(args[1]));
      } else {
        message.channel.send("You couldn't mute the member");
      }
    } else {
      message.channel.send("You don't have permission to do that.");
    }
  },
};
