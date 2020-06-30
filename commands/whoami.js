/* eslint-disable no-unused-vars */
const whoami = require("../whois.json");
exports.run = async (client, message, args, level) => {
    const response = whoami[message.author.id];
    if (!response) return message.channel.send("You haven't been added to the registry yet!");
    message.channel.send(response);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "whoami",
    category: "Fun",
    description: "Tells you who you are.",
    usage: "whoami"
};