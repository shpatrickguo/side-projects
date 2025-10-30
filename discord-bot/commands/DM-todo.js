const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "todo",
  aliases: [],
  permissions: [],
  description: "Display the team's ToDo list",
  async execute(message, args, cmd, client) {
    const embed = new EmbedBuilder()
      .setColor(0x2af779)
      .setTitle("ToDo list")
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
          name: `1️⃣`,
          value:
            "Look through and familiarize yourself with your respective datasets",
          inline: false
        },
        {
          name: `2️⃣`,
          value:
            "Organize team structure: Leadership, reporting, project timeline",
          inline: false
        },
        { 
          name: `3️⃣`, 
          value: "CSR data for companies",
          inline: false
        }
      );

    try {
      await message.channel.send({ embeds: [embed] });
      await message.delete();
    } catch (err) {
      console.error(err);
    }
  },
};
