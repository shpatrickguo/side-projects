const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "socials",
    aliases: ["social"],
    permissions: [],
    description: "Display social media links",
    execute(message, args, cmd, client) {
      const embed = new EmbedBuilder()
        .setColor(0xFADF2E)
        .setTitle(`Socials 🌐`)
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
            name: "LinkedIn",
            value: "https://www.linkedin.com/company/daanmatch/",
            inline: false
          },
          {
            name: "Twitter",
            value: "https://twitter.com/DaanMatch",
            inline: false
          },
          {
            name: "Website",
            value: "https://www.daanmatch.org/",
            inline: false
          },
          {
            name: "GitHub (Private)",
            value: "https://github.com/DaanMatch",
            inline: false
          }
        );

      message.channel
        .send({ embeds: [embed] })
        .catch((err) => {
          console.error(err);
          message.reply("Error sending socials.");
        });
    },
};