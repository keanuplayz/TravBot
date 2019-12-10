const Discord = require('discord.js');
const colours = require("../colours.json");
const moment = require('moment')

module.exports.run = async (client, message, args) => {
    let user = message.author;
    var userinfo = new Discord.RichEmbed()
        .setAuthor(user.tag, user.avatarURL)
        .setThumbnail(user.avatarURL)
        .setColor("red_light")
        .addField("Username:", user.username)
        .addField("Status:", user.presence.status)
        .addField("Joined at:", moment(message.guild.members.get(user.id).joinedAt).format("MMMM Do YYYY, h:mm a"))
        .addField("Registered at:", moment(user.createdAt).format("MMMM Do YYYY, h:mm a"))
    message.channel.send(userinfo);

}

module.exports.config = {
    name: "userinfo",
    noaliases: "No aliases",
    aliases: ["ui"],
    usage: ".userinfo",
    description: "Shows you info about a user.",
    accessibleby: "Members"
}
