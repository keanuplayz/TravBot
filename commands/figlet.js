/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
exports.run = async (client, message, args, level) => {
   const figlet = require("figlet");
   const input = args.join(" ");
   message.delete();
   if (!args[0]) return message.channel.send("You have to provide input for me to create a figlet!");
   message.channel.send("```" + figlet.textSync(`${input}`, {
      horizontalLayout: "full"
   }) + "```");
   console.error();
};
exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: [],
   permLevel: "User"
};
exports.help = {
   name: "figlet",
   category: "Fun",
   description: "Generates a figlet of your input.",
   usage: "figlet [text]"
};
