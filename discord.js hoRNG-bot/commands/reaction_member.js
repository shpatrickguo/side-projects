module.exports = {
  name: "reaction_members",
  aliases: ["read_rules"],
  permissions: ["MANAGE_ROLES"],
  description: "react and assign role member",
  async execute(message, args, cmd, client, Discord) {
    if (message.member.roles.cache.has("810768729415483422")) {
      const channel = "810543959117398026";
      const memberRole = message.guild.roles.cache.find(
        (role) => role.name === "member"
      );
      const memberEmoji = "👍";
      let embed = new Discord.MessageEmbed()
        .setColor("#e42643")
        .setTitle(
          "React to indicate you have read through and agree to abide by our rules."
        )
        .setDescription(
          "Reacting will allow you to access the rest of the server!"
        );

      let messageEmbed = await message.channel.send(embed).catch((err) => {
        throw err;
      });
      messageEmbed.react(memberEmoji);

      client.on("messageReactionAdd", async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id == channel) {
          if (reaction.emoji.name === memberEmoji) {
            await reaction.message.guild.members.cache
              .get(user.id)
              .roles.add(memberRole);
          }
        } else {
          return;
        }
      });

      client.on("messageReactionRemove", async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;
        if (reaction.message.channel.id == channel) {
          if (reaction.emoji.name === memberEmoji) {
            await reaction.message.guild.members.cache
              .get(user.id)
              .roles.remove(memberRole);
          }
        } else {
          return;
        }
      });
    } else {
      message.channel.send("You don't have permission to do that.");
    }
  },
};
