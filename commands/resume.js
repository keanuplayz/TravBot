/* eslint-disable no-unused-vars */
exports.run = (client, message, args) => {
    const fetched = client.active.get(message.guild.id) || undefined;
    if (!fetched) return message.channel.send("There currently isn't any music playing in this guild!");
    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("Sorry, you aren't connected to the same channel.");
    if (!fetched.dispatcher.paused) return message.channel.send("The music isn't paused.");

    fetched.dispatcher.resume();
    message.channel.send(`Successfully resumed ${fetched.queue[0].songTitle}`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "resume",
    category: "Music",
    description: "Resumes paused song.",
    usage: "resume"
};