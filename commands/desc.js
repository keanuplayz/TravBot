/* eslint-disable no-unused-vars */
exports.run = (client, message, args, level) => {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send("You are not in a voice channel.");
    if (!args[0]) return message.channel.send("Please provide the current voice channel name as the first argument.");
    if (!args[1]) return message.channel.send("Please provide the new voice channel name as the second argument.");
    message.guild.channels.find("name", args[0])
        .setName(args[1])
        .then(message.channel.send("Changed channel name from " + args[0] + " " + "to " + args[1] + "."));
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "desc",
    category: "Utility",
    description: "Renames current voice channel.",
    usage: "desc [current name] [name]"
};