
module.exports.run = async (client, message, args) => {
    message.reply(message.author.avatarURL);
}


module.exports.config = {
    name: "avatar",
    noalias: "No aliases",
    aliases: [],
    usage: ".avatar",
    description: "Gives you your avatar.",
    accessibleby: "Members"
}
