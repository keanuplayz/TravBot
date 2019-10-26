const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send("Don't do that, please. It'd impact people too much. Stay here, it's nice.");
}

module.exports.config = {
    name: "suicide",
    noaliases: "No aliases",
    aliases: [],
    usage: ".suicide",
    description: "No. Just no.",
    accessibleby: "Members"
}