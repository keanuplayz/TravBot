/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send("Please specify a story name.");
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "story",
    category: "Fun",
    description: "Creates a new story.",
    usage: "story [name]"
};