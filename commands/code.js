/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
   message.channel.send("https://github.com/keanuplayz/TravBot");
};
exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: [],
   permLevel: "User"
};
exports.help = {
   name: "code",
   category: "Utility",
   description: "Gives you the Github link.",
   usage: "code"
};
