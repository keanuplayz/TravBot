/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    const channelID = args.join(" ");
    const channel = client.channels.get(channelID);
    channel.leave().then(connection => {
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