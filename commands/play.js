const ytdl = require("ytdl-core")

exports.run = async (client, message, args, level) => {
    if (!message.member.voiceChannel) return message.channel.send("Please connect to a voice channel.");
    if (message.guild.me.voiceChannel) return message.channel.send("Sorry, the bot is already connected to the guild.");
    if (!args[0]) return message.channel.send("Please input a link to play.");

    let validate = await ytdl.getInfo(args[0]);
    if (!validate) return message.channel.send("Please input a **valid** link.")

    let info = await ytdl.getInfo(args[0]);
    let connection = await message.member.voiceChannel.join();
    let dispatcher = await connection.playStream(ytdl(args[0], { filter: 'audioonly'}));

    message.channel.send(`Now playing: ${info.title}`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "play",
    category: "Music",
    description: "Plays given link.",
    usage: "play <link>"
};