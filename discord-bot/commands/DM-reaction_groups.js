module.exports = {
  name: "assign",
  aliases: ["assign_groups"],
  permissions: ["MANAGE_ROLES"],
  description: "react and assign role member",
  async execute(message, args, cmd, client, Discord) {
    if (message.member.roles.cache.has("813557830401523712")) {
      const channel = "808286950703235112";
      
      const group1Role = message.guild.roles.cache.find(
        (role) => role.name === "CSR Team 1"
      );
      const group2Role = message.guild.roles.cache.find(
        (role) => role.name === "CSR Team 2"
      );
      const group3Role = message.guild.roles.cache.find(
        (role) => role.name === "CSR Team 3"
      );

      const group1Emoji = "1️⃣";
      const group2Emoji = "2️⃣";
      const group3Emoji = "3️⃣";

      let embed = new Discord.MessageEmbed()
        .setColor("#e42643")
        .setTitle("React to the message get group role!")
        .setThumbnail(
          "https://static.wixstatic.com/media/0ecae5_f1d5479031114df8ac2adcde1b44a3f4~mv2.png/v1/fill/w_466,h_160,al_c,q_85,usm_0.66_1.00_0.01/DAANG-01-1024x351.webp"
        )
        .setAuthor(
          "DaanMatch",
          "https://media-exp1.licdn.com/dms/image/C560BAQEYGvW8wH3CSw/company-logo_200_200/0/1605310347627?e=1621468800&v=beta&t=JdCjZ9wqvwcJ1nhgukP25Wz6heKDjLRrnXjdC6_y4LU",
          "https://www.daanmatch.org/"
        )
        .addFields(
          {
            name: `Group 1️⃣`,
            value:
              "Mapping of NGOs and which NGOs are receiving funding + SDG indicators https://undocs.org/A/RES/71/313",
          },
          {
            name: `Group 2️⃣`,
            value:
              "NGO information from Registrar of societies/Deputy Registrar/Charity Commissioner",
          },
          { name: `Group 3️⃣`, value: "CSR data for companies" }
        );

      let messageEmbed = await message.channel
        .send(embed)
        .then((msg) => {
          msg.react(group1Emoji);
          msg.react(group2Emoji);
          msg.react(group3Emoji);
          message.delete();
        })
        .catch((err) => {
          throw err;
        });

      client.on("messageReactionAdd", async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id == channel) {
          if (reaction.emoji.name === group1Emoji) {
            await reaction.message.guild.members.cache
              .get(user.id)
              .roles.add(group1Role);
          }
        }
        if (reaction.message.channel.id == channel) {
          if (reaction.emoji.name === group2Emoji) {
            await reaction.message.guild.members.cache
              .get(user.id)
              .roles.add(group2Role);
          }
        }
        if (reaction.message.channel.id == channel) {
          if (reaction.emoji.name === group3Emoji) {
            await reaction.message.guild.members.cache
              .get(user.id)
              .roles.add(group3Role);
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
          if (reaction.emoji.name === group1Emoji) {
            await reaction.message.guild.members.cache
              .get(user.id)
              .roles.remove(group1Role);
          }
        }
        if (reaction.message.channel.id == channel) {
          if (reaction.emoji.name === group2Emoji) {
            await reaction.message.guild.members.cache
              .get(user.id)
              .roles.remove(group2Role);
          }
        }
        if (reaction.message.channel.id == channel) {
          if (reaction.emoji.name === group3Emoji) {
            await reaction.message.guild.members.cache
              .get(user.id)
              .roles.remove(group3Role);
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
