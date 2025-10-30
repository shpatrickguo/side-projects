const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "suggestions",
  aliases: ["suggest", "suggestion"],
  permissions: [],
  description: "Create a suggestion with voting reactions",
  async execute(message, args, cmd, client) {
    const messageArgs = args.join(" ");
    
    if (!messageArgs) {
      return message.reply("Please provide a suggestion!");
    }

    const embed = new EmbedBuilder()
      .setColor(0xFADF2E)
      .setAuthor({ 
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      })
      .setTitle("New Suggestion")
      .setDescription(messageArgs)
      .setTimestamp();

    try {
      const msg = await message.channel.send({ embeds: [embed] });
      await msg.react("👍");
      await msg.react("👎");
      await message.delete();
    } catch (err) {
      console.error(err);
      message.reply("Error creating suggestion.");
    }
  },
};
