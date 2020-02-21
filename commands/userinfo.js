/* eslint-disable no-unused-vars */
const colours = require("../colours.json");
const moment = require("moment");
const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
    const user = message.author;
    var userinfo = new Discord.RichEmbed()
        .setAuthor(user.tag, user.avatarURL)
        .setThumbnail(user.avatarURL)
        .setColor("red_light")
        .addField("Username:", user.username)
        .addField("Status:", user.presence.status)
        .addField("Joined at:", moment(message.guild.members.get(user.id).joinedAt).format("MMMM Do YYYY, h:mm a"))
        .addField("Registered at:", moment(user.createdAt).format("MMMM Do YYYY, h:mm a"));
    message.channel.send(userinfo);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "userinfo",
    category: "Utility",
    description: "Shows info about user who executed command.",
    usage: "userinfo"
};