module.exports.run = async (client, message, args) => {
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
