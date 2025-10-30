require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

// Create client with required intents for Discord.js v14
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ]
});

client.commands = new Collection();
client.events = new Collection();

// Load command and event handlers
['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login(process.env.DISCORD_TOKEN);
