module.exports = {
    name: "rules",
    permissions: [],
    description: "lists rules",
    execute(message, args, cmd, client, Discord) {
      const embed = new Discord.MessageEmbed()
        .setColor("FADF2E")
        .setTitle('Rules')
        .addFields(
            {name: "\`Rule 1\`", value: "Please be respectful, civil and welcoming."},
            {name: "\`Rule 2\`", value: "Refrain from spamming."},
            {name: "\`Rule 3\`", value: "Do not send viruses or malware."},
            {name: "\`Rule 4\`", value: "No NSFW content."},
            {name: "\`Rule 5\`", value: "Don't send unsolicited DM's or server invites."}
        )
        .setFooter("Make sure to check the rules channel")
      
        message.channel
        .send(embed)
        .catch((err) => {
          throw err;
        });
    },
  };
  