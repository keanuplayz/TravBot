exports.run = async (client, message, args, level) => {
    var user = client.guilds.get(message.guild.id).members.random();
    message.channel.send(`I love ${user.user.username}!`)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "love",
    category: "Fun",
    description: "Chooses someone to love.",
    usage: "love [@user]"
};