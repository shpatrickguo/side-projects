module.exports = (client, guildMember) => {
    // Auto-assign member role when someone joins
    const welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'member');
    
    if (welcomeRole) {
        guildMember.roles.add(welcomeRole).catch(err => {
            console.error(`Could not add role to ${guildMember.user.tag}:`, err);
        });
    }
    
    // Send welcome message (update channel ID as needed)
    const welcomeChannelId = '509298603693572097'; // Update this to your welcome channel ID
    const welcomeChannel = guildMember.guild.channels.cache.get(welcomeChannelId);
    
    if (welcomeChannel) {
        welcomeChannel.send(
            `Welcome <@${guildMember.user.id}> to our server! Make sure to check out the rules channel!`
        ).catch(err => {
            console.error('Could not send welcome message:', err);
        });
    }
};