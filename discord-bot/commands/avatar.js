module.exports = {
  name: "avatar",
  aliases: ["icon", "pfp", "profilepic"],
  permissions: [],
  description: "Display user avatar/profile picture",
  execute(message, args, cmd, client) {
    if (!message.mentions.users.size) {
      return message.channel.send(
        `**Your Avatar:** ${message.author.displayAvatarURL({
          dynamic: true,
          size: 1024
        })}`
      );
    }
    const avatar_list = message.mentions.users.map((user) => {
      return `**${user.username}'s Avatar:** ${user.displayAvatarURL({
        dynamic: true,
        size: 1024
      })}`;
    });
    message.channel.send(avatar_list.join('\n'));
  },
};
