const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
  const emoji = client.emojis.find(emoji => emoji.name === args[0]);
  if(!emoji) return message.channel.send("Please provide a valid emote name!");
  message.react(emoji);
}

module.exports.config = {
    name: "react",
    noalias: "No aliases",
    aliases: [],
    usage: ".react <emote name>",
    description: "Reacts with provided emote.",
    accessibleby: "Members"
}
