module.exports.run = async (client, message, args) => {
    let sender = message.author
    let mention = message.mentions.users.first()

    if(args[0] == "all") return message.channel.send(`<@${sender.id}> gave everybody a cookie!`)
    if(!mention) return message.channel.send(":cookie: Here's a cookie!")
    if(mention.id == sender.id) return message.channel.send("You can't give yourself cookies!")
    message.channel.send(`:cookie: <@${sender.id}> gave <@${mention.id}> a cookie!`)
}

module.exports.config = {
    name: "cookie",
    noalias: "No aliases",
    aliases: [],
    usage: ".cookie",
    description: "Gives random user a cookie.",
    accessibleby: "Members"
}
