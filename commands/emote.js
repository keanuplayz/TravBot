module.exports.run = async (client, message, args) => {
    const emote = client.emojis.find(emote => emote.name === args[0]);
    if (!emote) return message.channel.send("That's not a valid emote name!")
    message.delete();
    message.channel.send(`${emote}`);
}

module.exports.config = {
    name: "emote",
    noaliases: "No aliases",
    aliases: [],
    usage: ".emote",
    description: "Sends the specified emote.",
    accessibleby: "Members"
}