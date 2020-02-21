const whoami = require("../whois.json")

exports.run = async (client, message, args, level) => {
    let mention = message.mentions.users.first()
    message.channel.send(`<@${mention.id}> is ${whoami[mention.id]}`);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "whois",
    category: "Fun",
    description: "Tells you who the specified user is.",
    usage: "whois [@user]"
};