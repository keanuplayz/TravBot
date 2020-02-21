/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    const channelID = args.join(" ");
    const channel = client.channels.get(channelID);
    channel.join().then(connection => {
    message.channel.send("Successfully connected.");
  });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
};

exports.help = {
    name: "join",
    category: "Utility",
    description: "Joins the specified voice channel.",
    usage: "join [channel id]"
};