exports.run = async (client, message, args, level) => {
    message.delete();
    if (!args[0]) return message.channel.send("`You have to provide a message for me to say!`");
    message.channel.send(args.join(" "));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "say",
    category: "Fun",
    description: "Repeats you.",
    usage: "say [input]"
};