import discord
import openai
from dotenv import load_dotenv
import os

load_dotenv()

# Connect to Discord API
client = discord.Client()

# Authenticate with OpenAI API
openai.api_key = os.getenv("OPENAI_KEY")

# Define function to generate OpenAI chat response
def generate_response(prompt):
    response = openai.Completion.create(
        engine="davinci",
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.7,
    )

    message = response.choices[0].text
    return message.strip()

# Define event handler for when the bot is ready
@client.event
async def on_ready():
    print("Bot is ready.")

# Define event handler for when a message is received
@client.event
async def on_message(message):
    if message.author == client.user:
        return

    # Generate response using OpenAI chat model
    prompt = f"User: {message.content}\nAI:"
    response = generate_response(prompt)

    # Send response back to Discord channel
    await message.channel.send(response)

# Run the bot
client.run(os.getenv("DISCORD_BOT_TOKEN"))
