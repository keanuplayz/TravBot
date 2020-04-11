/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    if (args[0]) {
        message.channel.send(`https://discordapp.com/api/oauth2/authorize?client_id=606395763404046349&permissions=${args[0]}&scope=bot`);
    } else {
        message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=606395763404046349&permissions=8&scope=bot");
    }
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