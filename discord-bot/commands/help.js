const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "help",
  aliases: ["commands", "help2"],
  permissions: [],
  description: "Lists all available commands",
  execute(message, args, cmd, client) {
    const embed = new EmbedBuilder()
      .setColor(0xFADF2E)
      .setTitle("Commands")
      .addFields(
        { name: "`!play URL/KEYWORDS`", value: "Plays audio from YouTube", inline: false },
        { name: "`!pause`", value: "Pauses current audio", inline: false },
        { name: "`!unpause`", value: "Unpauses current audio", inline: false },
        { name: "`!skip`", value: "Skips current audio", inline: false },
        { name: "`!stop`", value: "Stops playing audio", inline: false },
        { name: "`!rules`", value: "Display server rules", inline: false },
        { name: "`!suggest SUGGESTION`", value: "Make a suggestion", inline: false },
        { name: "`!ping`", value: "Check bot latency", inline: false },
        { name: "`!weather LOCATION`", value: "Get current weather at location", inline: false },
        { name: "`!avatar`", value: "Display your profile picture", inline: false },
        { name: "`!clear NUMBER`", value: "Clear messages (requires permissions)", inline: false }
      )
      .setFooter({ text: "Make sure to check the rules channel" });

    message.channel.send({ embeds: [embed] }).catch((err) => {
      console.error(err);
      message.reply("Error sending help message.");
    });
  },
};
