// Create a Discord Bot using OPENAI API that interacts on the Discord Server
require('dotenv').config();

// Prepare to connect to the Discord API
const { Client, GatewayIntentBits} = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
]})

// Prepare connection to OpenAI API
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apikey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Check for when a message on discord is sent
