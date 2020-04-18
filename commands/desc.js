/* eslint-disable no-unused-vars */
exports.run = (client, message, args, level) => {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send("You are not in a voice channel.");
    if (!args) return message.channel.send("Please provide a new voice channel name.");
    const changeVC = client.channels.get(voiceChannel.id);
    message.channel.send("Changed channel name from " + `"${voiceChannel}"` + " " + "to " + `"${args.join(" ")}"` + ".")
    .then(changeVC.setName(args.join(" ")));
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