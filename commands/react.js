const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
const emoji = client.emojis.find(emoji => emoji.name === args[0]);

  if (emoji) {
    message.react(emoji);
  } else if (!emoji){
    message.channel.send("Please provide a valid emote name!");
  }

}

module.exports.config = {
    name: "react",
    noalias: "No aliases",
    aliases: [],
    usage: ".react",
    description: "Reacts with provided emote.",
    accessibleby: "Members"
}
