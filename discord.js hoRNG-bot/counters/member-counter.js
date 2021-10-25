module.exports = async(client) => {
    const guild = client.guilds.cache.get('366380563998703629');
    setInterval(() => {
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('811083575842570260');
        channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
        console.log('Updating Member Count');
    }, 600000);
}