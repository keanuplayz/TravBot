module.exports = (client, guild) => {
   client.logger.cmd(`[GUILD LEAVE] ${guild.name} (${guild.id}) removed the bot.`);
   client.channels.get("631163133997744129")
      .send(`${guild.name} (${guild.id}) removed the bot.`);
   if (client.settings.has(guild.id)) {
      client.settings.delete(guild.id);
   }
};
