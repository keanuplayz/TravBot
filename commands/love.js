const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    var user = client.guilds.get(message.guild.id).members.random();
    message.channel.send(`I love ${user.user.username}!`)

}


module.exports.config = {
    name: "love",
    noalias: "No aliases",
    aliases: [],
    usage: ".love",
    description: "Chooses someone it loves.",
    accessibleby: "Members"
}