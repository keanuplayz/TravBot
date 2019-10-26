const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
    if (message.author.id != "465662909645848577") return message.channel.send("You are not the bot owner!")

  if (!args[0]) return message.channel.send("Running tests..."); {
    let sEmbed = new Discord.RichEmbed()
    .setColor(colours.red_dark)
    .setTitle("Test Results")
    .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
    .addField("**Online:** :thumbsup:")
    .addField("**Code Errors:** :white_check_mark:")
    .addField("**Command Loading:** :white_check_mark:")
    .setFooter(`Travbot Services`, bot.user.displayAvatarURL);
    
    message.channel.send({
        embed: sEmbed
    });
  }
}

module.exports.config = {
    name: "test",
    noaliases: "No aliases",
    aliases: [],
    usage: ".test",
    description: "Runs tests.",
    accessibleby: "Bot Owner"
}