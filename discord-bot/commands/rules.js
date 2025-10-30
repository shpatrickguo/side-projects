const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "rules",
    permissions: [],
    description: "Display server rules",
    execute(message, args, cmd, client) {
      const embed = new EmbedBuilder()
        .setColor(0xFADF2E)
        .setTitle('Server Rules')
        .addFields(
            { name: "`Rule 1`", value: "Please be respectful, civil and welcoming.", inline: false },
            { name: "`Rule 2`", value: "Refrain from spamming.", inline: false },
            { name: "`Rule 3`", value: "Do not send viruses or malware.", inline: false },
            { name: "`Rule 4`", value: "No NSFW content.", inline: false },
            { name: "`Rule 5`", value: "Don't send unsolicited DM's or server invites.", inline: false }
        )
        .setFooter({ text: "Make sure to follow these rules" });
      
        message.channel
        .send({ embeds: [embed] })
        .catch((err) => {
          console.error(err);
          message.reply("Error sending rules.");
        });
    },
};