/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    const search = args[0].toLowerCase();
    const emote = client.emojis.find(emote => emote.name === search);
    if (!emote) return message.channel.send("That's not a valid emote name!");
    message.delete();
    message.channel.send(`${emote}`);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "emote",
    category: "Fun",
    description: "Sends an emote.",
    usage: "emote [emote name]"
};