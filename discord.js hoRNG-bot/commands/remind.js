const ms = require('ms')
module.exports = {
    name: "remind",
    aliases: ["timer"],
    permissions: [],
    description: "sets a reminder",
    async execute(message, args, cmd, client, Discord) {
      let time = args[0];
      if (!time) {
          return message.channel.send("You need to input a time")
      }
      const reminder = args.join(" ").slice(args[0].length);
      if (reminder) {
          if (!args[1]) {
              return message.channel.send("You need to specify a reminder")
          }
          message.channel.send(`You have set a reminder for ${time}`)
          setTimeout(function() {
              message.member.send(`${reminder}`)
          }, ms(time));
      }
    },
  };
  