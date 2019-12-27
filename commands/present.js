module.exports.run = async (client, message, args) => {
    let sender = message.author
    let mention = message.mentions.users.first()

    if(args[0] == "all") return message.channel.send(`<@${sender.id}> gave everybody a present!`)
    if(!mention) return message.channel.send(":rarChristmas: Here's a present!")
    if(mention.id == sender.id) return message.channel.send("You can't give yourself presents!")
    message.channel.send(`:gift: <@${sender.id}> gave <@${mention.id}> a present!`)
}

module.exports.config = {
    name: "present",
    noalias: "No aliases",
    aliases: [],
    usage: ".present",
    description: "Gives mentioned user a present.",
    accessibleby: "Members"
}
