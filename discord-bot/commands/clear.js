const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'clear',
    permissions: [PermissionFlagsBits.ManageMessages],
    description: "Clear messages from the channel",
    async execute(message, args, cmd, client) {
        // Check if user has manage messages permission
        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return message.reply("You don't have permission to manage messages.");
        }

        if (!args[0]) {
            return message.reply("Please enter the amount of messages you want to clear.");
        }
        
        if (isNaN(args[0])) {
            return message.reply("Please enter a valid number.");
        }
        
        const amount = parseInt(args[0]);
        
        if (amount > 100) {
            return message.reply("You cannot delete more than 100 messages at once.");
        }
        
        if (amount < 1) {
            return message.reply("You must delete at least one message.");
        }

        try {
            await message.channel.bulkDelete(amount + 1, true);
            const reply = await message.channel.send(`Successfully deleted ${amount} messages.`);
            setTimeout(() => reply.delete(), 5000);
        } catch (err) {
            console.error(err);
            message.reply("Failed to delete messages. Messages might be older than 14 days.");
        }
    }
}