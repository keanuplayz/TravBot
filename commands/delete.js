const {ownerID} = require("../config.json");

module.exports.run = async (client, message, args) => {
if (message.author.id != ownerID) return message.channel.send("You are not the bot owner!")
message.channel.delete();
}

module.exports.config = {
    name: "delete",
    aliases: ["No aliases"],
    usage: ".delete",
    description: "Deletes the current channel.",
    accessibleby: "Members"
}