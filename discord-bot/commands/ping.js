module.exports = {
  name: "ping",
  permissions: [],
  description: "this is a ping cmd",
  execute(message, args, cmd, client, Discord) {
    const embed = new Discord.MessageEmbed()
      .setTitle("Bots ping")
      .setColor("RANDOM").setDescription(`Latency is ${
      Date.now() - message.createdTimestamp
    }ms. 
            API Latency is ${Math.round(client.ws.ping)}ms`);

    message.channel.send(embed);
  },
};
