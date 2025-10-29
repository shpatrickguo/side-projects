# Contributing to hoRNG Discord Bot

Thank you for considering contributing to this project! Here are some guidelines to help you get started.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`
4. Make your changes
5. Test your changes thoroughly
6. Submit a pull request

## Code Style

- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing code formatting
- Use async/await for asynchronous operations
- Include error handling with try-catch blocks

## Command Structure

All commands should follow this structure:

```javascript
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: "commandname",
  aliases: ["alias1", "alias2"],
  permissions: [PermissionFlagsBits.ManageMessages], // If permissions are required
  description: "Command description",
  async execute(message, args, cmd, client) {
    // Command logic here
    try {
      // Your code
    } catch (err) {
      console.error(err);
      message.reply("Error message");
    }
  },
};
```

## Adding New Commands

1. Create a new file in the `commands/` directory
2. Follow the command structure above
3. Update the README.md with the new command
4. Test the command thoroughly

## Adding New Events

1. Create a new file in `events/client/` or `events/guild/`
2. Export a function that handles the event
3. The function will automatically be bound to the event name (filename)

## Testing

Before submitting a PR:
- Test all modified commands in a Discord server
- Ensure no errors are thrown
- Verify permissions work correctly
- Check that embeds display properly

## Pull Request Guidelines

- Provide a clear description of changes
- Reference any related issues
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation as needed

## Bug Reports

When reporting bugs, please include:
- Discord.js version
- Node.js version
- Steps to reproduce
- Expected behavior
- Actual behavior
- Error messages/logs

## Feature Requests

For feature requests:
- Describe the feature clearly
- Explain why it would be useful
- Provide examples if possible

Thank you for contributing!
