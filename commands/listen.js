/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
   if (args[0]) {
      message.delete();
      client.user.setActivity(args.join(" "), {
         type: "LISTENING"
      });
   } else {
      message.delete();
      client.user.setActivity(".help", {
         type: "LISTENING"
      });
   }
};
exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: [],
   permLevel: "Bot Admin"
};
exports.help = {
   name: "listen",
   category: "Utility",
   description: "Changes client listening status.",
   usage: "listen [input]"
};
