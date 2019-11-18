
module.exports.run = async (client, message, args) => {
    message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");
}


module.exports.config = {
    name: "ping",
    noalias: "No aliases",
    aliases: [],
    usage: ".ping",
    description: "Tells you the ping time in milliseconds.",
    accessibleby: "Members"
}
