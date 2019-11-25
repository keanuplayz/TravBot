const Discord = require('discord.js');
const colours = require("../colours.json");
const moment = require('moment')

module.exports.run = async (client, message, args) => {
    
    var userinfo = new Discord.RichEmbed()
        .setAuthor(user.avatarURL, user.tag)
        .setColor("red_light")
        .addField("Username:", user.username)
        .addField("Status:", user.presence.status)
        .addField("Joined at:", moment(message.guild.member.get(user.id).joinedAt).format("MMMM Do YYYY, h:mm a"))
        .addField("Registered at:", moment(user.createdAt).format("MMMM Do YYYY, h:mm a"))
    message.channel.send(userInfo);

}

module.exports.config = {
    name: "userinfo",
    noaliases: "No aliases",
    aliases: ["ui"],
    usage: ".userinfo",
    description: "Shows you info about a user.",
    accessibleby: "Members"
}