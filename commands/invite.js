/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    message.channel.send(`https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=${args[0] || 8}&scope=bot`);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "invite",
    category: "Utility",
    description: "Gives you the invite link.",
    usage: "invite [permissions]"
};