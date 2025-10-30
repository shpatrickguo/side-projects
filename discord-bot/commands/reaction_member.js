const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: "reaction_members",
  aliases: ["read_rules", "reaction_member"],
  permissions: [PermissionFlagsBits.ManageRoles],
  description: "Create a reaction role message for members to access the server",
  async execute(message, args, cmd, client) {
    // Check if user has manage roles permission
    if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return message.channel.send("You don't have permission to manage roles.");
    }

    const channel = message.channel.id;
    const memberRole = message.guild.roles.cache.find(
      (role) => role.name === "member"
    );
    
    if (!memberRole) {
      return message.channel.send("Could not find 'member' role. Please create it first.");
    }

    const memberEmoji = "👍";
    const embed = new EmbedBuilder()
      .setColor(0xe42643)
      .setTitle(
        "React to indicate you have read through and agree to abide by our rules."
      )
      .setDescription(
        "Reacting with 👍 will allow you to access the rest of the server!"
      );

    try {
      const messageEmbed = await message.channel.send({ embeds: [embed] });
      await messageEmbed.react(memberEmoji);

      // Set up reaction collectors for this specific message
      const filter = (reaction, user) => {
        return reaction.emoji.name === memberEmoji && !user.bot;
      };

      const collector = messageEmbed.createReactionCollector({ filter });

      collector.on('collect', async (reaction, user) => {
        try {
          const member = await message.guild.members.fetch(user.id);
          if (!member.roles.cache.has(memberRole.id)) {
            await member.roles.add(memberRole);
            console.log(`Added member role to ${user.tag}`);
          }
        } catch (err) {
          console.error(`Error adding role to ${user.tag}:`, err);
        }
      });

      collector.on('remove', async (reaction, user) => {
        try {
          const member = await message.guild.members.fetch(user.id);
          if (member.roles.cache.has(memberRole.id)) {
            await member.roles.remove(memberRole);
            console.log(`Removed member role from ${user.tag}`);
          }
        } catch (err) {
          console.error(`Error removing role from ${user.tag}:`, err);
        }
      });

      message.channel.send("✅ Reaction role message created!");
    } catch (err) {
      console.error(err);
      message.channel.send("Error creating reaction role message.");
    }
  },
};
