# hoRNG Discord Bot

A feature-rich Discord bot built with Discord.js v14, providing music playback, moderation tools, utilities, and server management features.

## 🚀 Features

### Music & Audio
- **YouTube Integration**: Play music from YouTube by URL or search keywords
- **Playback Controls**: Pause, resume, skip, and stop commands
- **Queue System**: Add multiple songs to a queue
- **High-Quality Audio**: Optimized audio streaming

### Moderation Tools
- **Timeout/Mute**: Modern timeout system using Discord's native features
- **Kick & Ban**: Remove problematic users with proper permission checks
- **Clear Messages**: Bulk delete messages (up to 100)
- **Permission System**: All moderation commands check for proper permissions

### Utility Commands
- **Weather**: Get real-time weather information for any location
- **Reminders**: Set timed reminders with DM notifications
- **Avatar Display**: View user profile pictures
- **Ping Check**: Check bot latency and API response time

### Server Management
- **Reaction Roles**: Automated role assignment via reactions
- **Suggestions System**: Create polls with voting reactions
- **Team Assignment**: Organize members into different groups
- **Meeting Announcements**: Schedule and track meeting attendance

## 📋 Requirements

- Node.js v16.9.0 or higher
- Discord Bot Token
- ffmpeg (for music playback)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd discord-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   PREFIX=!
   ```

4. **Run the bot**
   ```bash
   npm start
   ```

## 📦 Dependencies

- `discord.js` (v14.14.1): Main Discord API library
- `@discordjs/voice` (v0.16.0): Voice connection handling
- `@discordjs/opus` (v0.9.0): Audio encoding
- `ytdl-core` (v4.11.5): YouTube video downloading
- `yt-search` (v2.10.4): YouTube search functionality
- `weather-js` (v2.0.0): Weather data retrieval
- `ms` (v2.1.3): Time string parsing
- `dotenv` (v16.0.3): Environment variable management

## 🎮 Commands

### General Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `!help` | Display all available commands | `!help` |
| `!ping` | Check bot latency | `!ping` |
| `!avatar [@user]` | Display user avatar | `!avatar` or `!avatar @user` |

### Music Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `!play <url/search>` | Play a song from YouTube | `!play Never Gonna Give You Up` |
| `!pause` | Pause the current song | `!pause` |
| `!resume` / `!unpause` | Resume playback | `!resume` |
| `!skip` | Skip to the next song | `!skip` |
| `!stop` | Stop playback and disconnect | `!stop` |

### Moderation Commands (Requires Permissions)

| Command | Description | Usage | Required Permission |
|---------|-------------|-------|---------------------|
| `!ban @user` | Ban a user | `!ban @user` | Ban Members |
| `!kick @user` | Kick a user | `!kick @user` | Kick Members |
| `!mute @user [time]` | Timeout a user | `!mute @user 10m` | Moderate Members |
| `!unmute @user` | Remove timeout | `!unmute @user` | Moderate Members |
| `!clear <number>` | Delete messages | `!clear 10` | Manage Messages |

### Utility Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `!weather <location>` | Get weather info | `!weather London` |
| `!remind <time> <message>` | Set a reminder | `!remind 1h Check email` |
| `!suggest <text>` | Create a suggestion | `!suggest Add game night` |
| `!rules` | Display server rules | `!rules` |

### Server Management Commands (Admin)

| Command | Description | Usage |
|---------|-------------|-------|
| `!reaction_members` | Create member role assignment | `!reaction_members` |
| `!assign` | Create team/group assignment | `!assign` |

### DM Commands (Organization-Specific)

| Command | Description | Usage |
|---------|-------------|-------|
| `!meeting <time>` | Announce a meeting | `!meeting 3pm EST` |
| `!attendance <time>` | Meeting with attendance tracking | `!attendance 3pm EST` |
| `!todo` | Display team todo list | `!todo` |
| `!socials` | Display social media links | `!socials` |
| `!announcement` | Send team announcement | `!announcement` |

## 🔧 Configuration

### Bot Permissions

The bot requires the following permissions:
- Read Messages/View Channels
- Send Messages
- Embed Links
- Attach Files
- Read Message History
- Add Reactions
- Use External Emojis
- Connect (Voice)
- Speak (Voice)
- Manage Messages
- Manage Roles
- Kick Members
- Ban Members
- Moderate Members (Timeout)

### Gateway Intents

The bot uses the following intents:
- `Guilds`
- `GuildMessages`
- `GuildMembers`
- `GuildMessageReactions`
- `GuildVoiceStates`
- `MessageContent`
- `DirectMessages`

## 📁 Project Structure

```
discord-bot/
├── commands/           # Command files
│   ├── avatar.js
│   ├── ban.js
│   ├── clear.js
│   ├── help.js
│   ├── kick.js
│   ├── mute.js
│   ├── ping.js
│   ├── play.js
│   ├── reaction_member.js
│   ├── remind.js
│   ├── rules.js
│   ├── suggestions.js
│   ├── unmute.js
│   ├── weather.js
│   └── DM-*.js       # Organization-specific commands
├── events/            # Event handlers
│   ├── client/       # Client events
│   │   └── ready.js
│   └── guild/        # Guild events
│       ├── messageCreate.js
│       └── guildMemberAdd.js
├── handlers/          # Command and event loaders
│   ├── command_handler.js
│   └── event_handler.js
├── main.js            # Bot entry point
├── package.json       # Dependencies
├── .env              # Environment variables (create this)
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## 🔒 Security Notes

1. **Never commit your `.env` file** - It contains sensitive bot tokens
2. **Use environment variables** for all sensitive data
3. **Validate user permissions** before executing privileged commands
4. **Rate limit commands** to prevent abuse (implement as needed)

## 🐛 Troubleshooting

### Bot doesn't respond to commands
- Check that the bot has proper permissions in your server
- Verify the `MESSAGE_CONTENT` intent is enabled in Discord Developer Portal
- Ensure the prefix in `.env` matches what you're using

### Music commands not working
- Verify ffmpeg is installed on your system
- Check that the bot has Connect and Speak permissions in voice channels
- Ensure `@discordjs/voice` and related dependencies are installed

### Permission errors
- Verify the bot's role is high enough in the role hierarchy
- Check that specific permission flags are granted to the bot

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 🔗 Resources

- [Discord.js Documentation](https://discord.js.org/)
- [Discord.js Guide](https://discordjs.guide/)
- [Discord Developer Portal](https://discord.com/developers/applications)

## 📝 Changelog

### Version 2.0.0 (Current)
- ✅ Updated to Discord.js v14
- ✅ Migrated to modern intents system
- ✅ Updated all commands to use EmbedBuilder
- ✅ Implemented @discordjs/voice for music
- ✅ Updated permission system to PermissionFlagsBits
- ✅ Improved error handling across all commands
- ✅ Enhanced documentation
- ✅ Code cleanup and modernization

### Version 1.0.0
- Initial release with Discord.js v12

## 👥 Credits

- Developed by shpatrickguo
- Adapted and inspired from:
  - [FreeCodeCamp](https://www.freecodecamp.org/news/create-a-discord-bot-with-python/)
  - [CodeLyon](https://www.youtube.com/watch?v=j_sD9udZnCk&ab_channel=CodeLyon)
