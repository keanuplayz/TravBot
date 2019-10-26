const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send("Minzy and Keanu are.");
}

module.exports.config = {
    name: "whostupid",
    noaliases: "No aliases",
    aliases: [],
    usage: ".whostupid",
    description: "Tells you who is stupid.",
    accessibleby: "Members"
}