module.exports = {
  name: "suggestions",
  aliases: ["suggest", "suggetion"],
  permissions: [],
  description: "create a suggestion",
  execute(message, args, cmd, client, Discord) {
    let messageArgs = args.join(" ");
    const embed = new Discord.MessageEmbed()
      .setColor("FADF2E")
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(messageArgs);
    message.channel
      .send(embed)
      .then((msg) => {
        msg.react("👍");
        msg.react("👎");
        message.delete();
      })
      .catch((err) => {
        throw err;
      });
  },
};
