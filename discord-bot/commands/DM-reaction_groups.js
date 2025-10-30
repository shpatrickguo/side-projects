const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: "assign",
  aliases: ["assign_groups"],
  permissions: [PermissionFlagsBits.ManageRoles],
  description: "Create a reaction message to assign team/group roles",
  async execute(message, args, cmd, client) {
    // Check if user has manage roles permission
    if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return message.channel.send("You don't have permission to manage roles.");
    }

    const channel = message.channel.id;
    
    const group1Role = message.guild.roles.cache.find(
      (role) => role.name === "CSR Team 1"
    );
    const group2Role = message.guild.roles.cache.find(
      (role) => role.name === "CSR Team 2"
    );
    const group3Role = message.guild.roles.cache.find(
      (role) => role.name === "CSR Team 3"
    );

    if (!group1Role || !group2Role || !group3Role) {
      return message.channel.send("Could not find all team roles. Please create them first.");
    }

    const group1Emoji = "1️⃣";
    const group2Emoji = "2️⃣";
    const group3Emoji = "3️⃣";

    const embed = new EmbedBuilder()
      .setColor(0xe42643)
      .setTitle("React to the message to get your group role!")
      .setThumbnail(
        "https://static.wixstatic.com/media/0ecae5_f1d5479031114df8ac2adcde1b44a3f4~mv2.png/v1/fill/w_466,h_160,al_c,q_85,usm_0.66_1.00_0.01/DAANG-01-1024x351.webp"
      )
      .setAuthor({ 
        name: "DaanMatch",
        iconURL: "https://media-exp1.licdn.com/dms/image/C560BAQEYGvW8wH3CSw/company-logo_200_200/0/1605310347627?e=1621468800&v=beta&t=JdCjZ9wqvwcJ1nhgukP25Wz6heKDjLRrnXjdC6_y4LU",
        url: "https://www.daanmatch.org/"
      })
      .addFields(
        {
          name: `Group 1️⃣`,
          value:
            "Mapping of NGOs and which NGOs are receiving funding + SDG indicators https://undocs.org/A/RES/71/313",
          inline: false
        },
        {
          name: `Group 2️⃣`,
          value:
            "NGO information from Registrar of societies/Deputy Registrar/Charity Commissioner",
          inline: false
        },
        { 
          name: `Group 3️⃣`, 
          value: "CSR data for companies",
          inline: false
        }
      );

    try {
      const messageEmbed = await message.channel.send({ embeds: [embed] });
      await messageEmbed.react(group1Emoji);
      await messageEmbed.react(group2Emoji);
      await messageEmbed.react(group3Emoji);
      await message.delete();

      // Set up reaction collectors for this specific message
      const filter = (reaction, user) => {
        return [group1Emoji, group2Emoji, group3Emoji].includes(reaction.emoji.name) && !user.bot;
      };

      const collector = messageEmbed.createReactionCollector({ filter });

      collector.on('collect', async (reaction, user) => {
        try {
          const member = await message.guild.members.fetch(user.id);
          
          if (reaction.emoji.name === group1Emoji && group1Role) {
            await member.roles.add(group1Role);
            console.log(`Added CSR Team 1 role to ${user.tag}`);
          } else if (reaction.emoji.name === group2Emoji && group2Role) {
            await member.roles.add(group2Role);
            console.log(`Added CSR Team 2 role to ${user.tag}`);
          } else if (reaction.emoji.name === group3Emoji && group3Role) {
            await member.roles.add(group3Role);
            console.log(`Added CSR Team 3 role to ${user.tag}`);
          }
        } catch (err) {
          console.error(`Error adding role to ${user.tag}:`, err);
        }
      });

      collector.on('remove', async (reaction, user) => {
        try {
          const member = await message.guild.members.fetch(user.id);
          
          if (reaction.emoji.name === group1Emoji && group1Role) {
            await member.roles.remove(group1Role);
            console.log(`Removed CSR Team 1 role from ${user.tag}`);
          } else if (reaction.emoji.name === group2Emoji && group2Role) {
            await member.roles.remove(group2Role);
            console.log(`Removed CSR Team 2 role from ${user.tag}`);
          } else if (reaction.emoji.name === group3Emoji && group3Role) {
            await member.roles.remove(group3Role);
            console.log(`Removed CSR Team 3 role from ${user.tag}`);
          }
        } catch (err) {
          console.error(`Error removing role from ${user.tag}:`, err);
        }
      });
    } catch (err) {
      console.error(err);
      message.channel.send("Error creating group assignment message.");
    }
  },
};
