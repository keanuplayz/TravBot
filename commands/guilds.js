module.exports.run = async (client, message, args) => {
if (message.author.id != ownerID) return message.channel.send("You are not the bot owner!")
    const guildList = client.guilds.array().map(e => e.name);
    message.channel.send(guildList);
}

module.exports.config = {
    name: "guilds",
    noalias: "No aliases",
    aliases: [],
    usage: ".guilds",
    description: "Lists all guilds.",
    accessibleby: "Members"
}
