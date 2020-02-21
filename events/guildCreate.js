module.exports = (client, guild) => {
  client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
  client.channels.get("631163133997744129").send(`TravBot joined: ${guild.name}. The owner of this guild is: ${guild.owner.user.tag} (${guild.owner.user.id})`);
};
