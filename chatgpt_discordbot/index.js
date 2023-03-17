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
    apikey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

// Check for when a message on discord is sent
client.on('messageCreate', async function(message){
    try {
        // Don't respond to yourself or bots
        if(message.author.bot) return;
        const gptResponse = await openai.createCompletion({
            model: "davinci",
            prompt: 'ChatGPT is a friendly chatbot \n\
            ChatGPT: Hello, how are you \n\
            ${message.author.username}: ${message.content}: \n\
            ChatGPT:',
            temperature: 0.7,
            max_tokens: 100,
            stop: ["ChatGPT"]
        })
        message.reply(`${gptResponse.data.choices[0].text}`);
        return;
    } catch (err) {
        console.error(err);
    }
});

// Log the bot into Discord
client.login(process.env.DISCORD_TOKEN); 
console.log('Bot is online on Discord!');
