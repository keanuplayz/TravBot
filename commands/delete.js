/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    message.channel.delete();
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
};
exports.help = {
    name: "delete",
    category: "Utility",
    description: "Deletes the current channel.",
    usage: "delete"
};