const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "dmhelp",
  aliases: ["dm-help"],
  permissions: [],
  description: "List DM-specific commands",
  execute(message, args, cmd, client) {
    const embed = new EmbedBuilder()
      .setColor(0xFADF2E)
      .setTitle("DM Commands")
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
          name: "`!attendance <TIME>`",
          value: "Checks attendance for meeting with reactions.",
          inline: false
        },
        { name: "`!meeting <TIME>`", value: "Announces 1/2 hour meeting time.", inline: false },
        { name: "`!meetinghr <TIME>`", value: "Announces 1 hour meeting time.", inline: false },
        { name: "`!todo`", value: "ToDo list.", inline: false },
        { name: "`!mail`", value: "This week's general announcements", inline: false },
        { name: "`!assign`", value: "Assign groups.", inline: false },
        { name: "`!socials`", value: "Lists socials.", inline: false }
      );
    
    message.channel.send({ embeds: [embed] }).catch((err) => {
      console.error(err);
      message.reply("Error sending help message.");
    });
  },
};
