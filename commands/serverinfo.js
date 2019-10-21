const Discord = require('discord.js');
const config = require("../config.json");
const colours = require("../colours.json");

module.exports.run = async (bot, message, args) => {
    let sEmbed = new Discord.RichEmbed()
        .setColor(colours.cyan)
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconUrl)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Guild Name:**", `${message.guild.name}`, true)
        .addField("**Guild Owner:**", `${message.guild.owner}`, true)
        .addField("**Member Count:**", `${message.guild.memberCount}`, true)
        .addField("**Role Count:**", `${message.guild.roles.size}`, true)
        .setFooter(`Travbot Services`, bot.user.displayAvatarURL);
    message.channel.send({
        embed: sEmbed
    });

}

module.exports.config = {
    name: "serverinfo",
    aliases: ["si"],
    usage: ".serverinfo",
    description: "Displays server info.",
    accessibleby: "Members"
}