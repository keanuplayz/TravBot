/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
   const guildList = client.guilds.array()
      .map(e => e.name);
   message.channel.send(guildList);
};
exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: [],
   permLevel: "Bot Admin"
};
exports.help = {
   name: "guilds",
   category: "Utility",
   description: "Show all bot guilds.",
   usage: "guilds"
};
