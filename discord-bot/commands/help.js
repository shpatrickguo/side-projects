module.exports = {
  name: "help2",
  aliases: ["commands"],
  permissions: [],
  description: "lists commands",
  execute(message, args, cmd, client, Discord) {
    const embed = new Discord.MessageEmbed()
      .setColor("FADF2E")
      .setTitle("Commands")
      .addFields(
        { name: "`play URL/KEYWORDs`", value: "plays audio from youtube" },
        { name: "`pause`", value: "pauses current audio" },
        { name: "`unpause`", value: "unpauses current audio" },
        { name: "`skip`", value: "skips current audio" },
        { name: "`stop`", value: "stops playing audio" },
        { name: "`rules`", value: "server rules" },
        { name: "`suggest SUGGESTION`", value: "make a suggestion" },
        { name: "`ping`", value: "Latency check" },
        { name: "`weather LOCATION`", value: "current weather at location" },
        { name: "`avatar`", value: "returns profile pic" },
        { name: "`clear`", value: "clears commands" }
      )
      .setFooter("Make sure to check the rules channel");

    message.channel.send(embed).catch((err) => {
      throw err;
    });
  },
};
