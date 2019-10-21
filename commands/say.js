const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
  message.delete();
  if (!args[0]) return message.channel.send("`You have to provide a message for me to say!`");
  let botmessage = args.join(" ");
  message.channel.send(botmessage);
}

module.exports.config = {
    name: "say",
    aliases: ["s"],
    usage: ".say",
    description: "Repeats your message.",
    accessibleby: "Members"
}