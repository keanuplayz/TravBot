
module.exports.run = async (client, message, args) => {
    if (Math.floor(Math.random()*200)+1 == 1) return message.reply('FUCK OFF!');
    message.reply('stop rolling me pls');
}


module.exports.config = {
    name: "roll",
    noalias: "No aliases",
    aliases: [],
    usage: ".help",
    description: "Rolls random number for generating a response. (Test Command)",
    accessibleby: "Members"
}