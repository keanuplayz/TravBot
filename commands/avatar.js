/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    message.reply(message.author.avatarURL);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "avatar",
    category: "Fun",
    description: "Replies with your avatar.",
    usage: "avatar"
};