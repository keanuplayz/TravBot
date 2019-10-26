const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send("Drink it. Hydration is key.");
}

module.exports.config = {
    name: "water",
    noaliases: "No aliases",
    aliases: [],
    usage: ".water",
    description: "Tells you to drink water.",
    accessibleby: "Members"
}