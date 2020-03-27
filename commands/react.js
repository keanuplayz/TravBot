/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    const emoji = client.emojis.find(emoji => emoji.name === args[0]);
    if (!emoji) return message.channel.send("Please provide a valid emote name!");
    message.react(emoji);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "react",
    category: "Fun",
    description: "Reacts to the previous message.",
    usage: "react [emote name]"
};