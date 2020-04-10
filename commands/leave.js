/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    const channel = message.guild.me.voiceChannelID;
    channel.leave()
        .then(connection => {
            message.channel.send("Successfully disconnected.");
        });
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
};
exports.help = {
    name: "leave",
    category: "Utility",
    description: "Leaves the current voice channel.",
    usage: "leave [channel id]"
};