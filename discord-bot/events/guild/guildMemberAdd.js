module.exports = (Discord, client, message) => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'member');
    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get(509298603693572097).send(`Welcome <@${guildMember.user.id} to our server! Make sure to check out the rules channel!`)
  };
  