exports.run = async (client, message, args, level) => {
    const emote = client.emojis.find(emote => emote.name === args[0]);
    if (!emote) return message.channel.send("That's not a valid emote name!")
    message.delete();
    message.channel.send(`${emote}`);
}

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