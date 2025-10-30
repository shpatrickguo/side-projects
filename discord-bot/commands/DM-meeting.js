const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "meeting",
  aliases: ["attendance", "meetinghr"],
  permissions: [],
  description: "Create a meeting announcement with optional attendance tracking",
  async execute(message, args, cmd, client) {
    const messageArgs = args.join(" ");
    
    if (!messageArgs) {
      return message.reply("Please provide a meeting time!");
    }

    const embedDefault = new EmbedBuilder()
      .setColor(0x2af779)
      .setTitle(`Meeting: ${messageArgs}`)
      .setThumbnail(
        "https://static.wixstatic.com/media/0ecae5_f1d5479031114df8ac2adcde1b44a3f4~mv2.png/v1/fill/w_466,h_160,al_c,q_85,usm_0.66_1.00_0.01/DAANG-01-1024x351.webp"
      )
      .setAuthor({ 
        name: "DaanMatch",
        iconURL: "https://media-exp1.licdn.com/dms/image/C560BAQEYGvW8wH3CSw/company-logo_200_200/0/1605310347627?e=1621468800&v=beta&t=JdCjZ9wqvwcJ1nhgukP25Wz6heKDjLRrnXjdC6_y4LU",
        url: "https://www.daanmatch.org/"
      })
      .setDescription("")
      .addFields({
        name: "⏲️ Meeting Length",
        value: "1/2 hour",
        inline: true,
      });

    const embedHour = new EmbedBuilder()
      .setColor(0x2af779)
      .setTitle(`Meeting: ${messageArgs}`)
      .setThumbnail(
        "https://static.wixstatic.com/media/0ecae5_f1d5479031114df8ac2adcde1b44a3f4~mv2.png/v1/fill/w_466,h_160,al_c,q_85,usm_0.66_1.00_0.01/DAANG-01-1024x351.webp"
      )
      .setAuthor({ 
        name: "DaanMatch",
        iconURL: "https://media-exp1.licdn.com/dms/image/C560BAQEYGvW8wH3CSw/company-logo_200_200/0/1605310347627?e=1621468800&v=beta&t=JdCjZ9wqvwcJ1nhgukP25Wz6heKDjLRrnXjdC6_y4LU",
        url: "https://www.daanmatch.org/"
      })
      .setDescription("")
      .addFields({ 
        name: "⏲️ Meeting Length", 
        value: "1 hour", 
        inline: true 
      });

    try {
      if (cmd === "meeting") {
        await message.channel.send({ embeds: [embedDefault] });
        await message.delete();
      } else if (cmd === "meetinghr") {
        await message.channel.send({ embeds: [embedHour] });
        await message.delete();
      } else if (cmd === "attendance") {
        embedDefault.setFooter({ text: "React to indicate attendance!" });
        const msg = await message.channel.send({ embeds: [embedDefault] });
        await msg.react("✅");
        await msg.react("❎");
        await message.delete();
      }
    } catch (err) {
      console.error(err);
    }
  },
};
