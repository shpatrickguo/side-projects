const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "ping",
  permissions: [],
  description: "Check bot latency and API ping",
  execute(message, args, cmd, client) {
    const embed = new EmbedBuilder()
      .setTitle("Bot's Ping")
      .setColor(0x00FF00)
      .setDescription(`Latency is ${Date.now() - message.createdTimestamp}ms. 
API Latency is ${Math.round(client.ws.ping)}ms`);

    message.channel.send({ embeds: [embed] });
  },
};
