/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    if (!args[0]) return message.channel.send("You need to specify an emote to use!");
    const search = args[0].toLowerCase();
    const emote = client.emojis.find(emote => emote.name.toLowerCase().includes(search));
    if (!emote) return message.channel.send("That's not a valid emote name!");
    message.delete();
    message.channel.send(emote.toString());
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