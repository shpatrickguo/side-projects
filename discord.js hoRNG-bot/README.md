# hoRNG-discordbot
Discord bot for hoRNG server.

# Installations
```
npm i dotenv
npm i discord.js
npm i fs
npm install ms
npm install @discordjs/opus ffmpeg-static yt-search ytdl-core 
npm i weather-js
```
[FFmpeg](https://ffmpeg.org/download.html)

# Features
Prefix: !
Commands include aliases
- !avatar: Display Avatar
- !clear NUMERIC: Clears NUMERIC messages up to 100
- !help: Lists all public commands 
- !ping: Sends an embed describing user latency
- !play URL/KEYWORDS: plays audio from youtube
  - !pause: pauses audio
  - !unpause: unpauses audio
  - !skip: skips current audio to next on queue
  - !stop: stops current audio and disconnects bot from voice channel
- !rules: Lists rules of server in an embed
- !remind TIME ARTICLE: Sends you a reminder about ARTICLE after TIME. 
- !suggestions TEXT: Sends an embed of user suggestion with reactions
- !weather LOCATION: sends weather of location

Requires permissions
- !ban @USER: Bans @user
- !kick @USER: Kicks @user
- !mute @USER: Mutes @user
- !unmute @USER: Unmutes @user
- !reaction_rules: Sends an embed that assigns role from reaction



# Adapted and Inspired from
- [FreeCodeCamp](https://www.freecodecamp.org/news/create-a-discord-bot-with-python/)
- [CodeLyon](https://www.youtube.com/watch?v=j_sD9udZnCk&ab_channel=CodeLyon)
