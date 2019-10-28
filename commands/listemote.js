const Discord = require('discord.js');
const botconfig = require("../config.json");

module.exports.run = async (client, message, args) => {
    const emojiList = message.guild.emojis.map((e, x) => (e) + ' | ' + e.name).join('\n').substring(0,2000);
    message.channel.send(emojiList);
    return;
}

module.exports.config = {
    name: "listemote",
    aliases: ["le"],
    usage: ".listemote",
    description: "Lists all available emotes.",
    accessibleby: "Members"
}