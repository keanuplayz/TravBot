const Discord = require('discord.js');
const botconfig = require("../config.json");

const exampleEmbed = {
    title: 'Emote List',
    
};

module.exports.run = async (client, message, args) => {
    const emojiList = message.guild.emojis.map((e, x) => (e) + ' | ' + e.name).join('\n');
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