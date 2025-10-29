const weather = require("weather-js");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "weather",
  aliases: ["wthr"],
  permissions: [],
  description: "Get current weather for a location",
  async execute(message, args, cmd, client) {
    if (!args[0]) {
      return message.channel.send("Please specify a location");
    }

    weather.find(
      { search: args.join(" "), degreeType: "C" },
      function (error, result) {
        if (error) {
          console.error(error);
          return message.channel.send("Error fetching weather data");
        }

        if (result === undefined || result.length === 0) {
          return message.channel.send("**Invalid** location. Please try again.");
        }

        const current = result[0].current;
        const location = result[0].location;

        const weatherinfo = new EmbedBuilder()
          .setDescription(`**${current.skytext}**`)
          .setAuthor({ name: `Weather forecast for ${current.observationpoint}` })
          .setThumbnail(current.imageUrl)
          .setColor(0x00AE86)
          .addFields(
            { name: "Timezone", value: `UTC${location.timezone}`, inline: true },
            { name: "Degree Type", value: "Celsius", inline: true },
            { name: "Temperature", value: `${current.temperature}°C`, inline: true },
            { name: "Wind", value: current.winddisplay, inline: true },
            { name: "Feels like", value: `${current.feelslike}°C`, inline: true },
            { name: "Humidity", value: `${current.humidity}%`, inline: true }
          )
          .setTimestamp();

        message.channel.send({ embeds: [weatherinfo] });
      }
    );
  },
};
