const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send("https://github.com/keanuplayz/TravBot");
}

module.exports.config = {
    name: "code",
    noaliases: "No aliases",
    aliases: [],
    usage: ".code",
    description: "Gives you the GitHub link.",
    accessibleby: "Members"
}