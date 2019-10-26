const Discord = require('discord.js');
const config = require("../config.json");
const colours = require("../colours.json");
const prefix = config.prefix


module.exports.run = async (client, message, args) => {
    
    if(args[0] == "help") return message.channel.send(`Just do \`${prefix}help\` instead.`)

    if(args[0]) {
        let command = args[0];
        if(client.commands.has(command)) {
            command = client.commands.get(command);
            var SHembed = new Discord.RichEmbed()
            .setColor(colours.cyan)
            .setAuthor(`TravBot Help`, message.guild.iconURL)
            .setDescription(`The bot prefix is: ${prefix}\n\n**Command:** ${command.config.name}\n**Description:** ${command.config.description || "No Description"}\n**Usage:** ${command.config.usage || "No Usage"}\n**Accessible by:** ${command.config.accessibleby || "Members"}\n**Aliases:** ${command.config.noalias || command.config.aliases}`)
            message.channel.send(SHembed)
        }}

    if(!args[0]) {
        message.delete();
        let embed = new Discord.RichEmbed()
        .setAuthor(`Help Command!`, message.guild.iconURL)
        .setThumbnail(client.user.displayAvatarURL)
        .setColor(colours.red_light)
        .setDescription(`${message.author.username}, check your DM's.`)

        let Sembed = new Discord.RichEmbed()
        .setColor(colours.cyan)
        .setAuthor(`TravBot Help`, message.guild.iconURL)
        .setThumbnail(client.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`These are the available commands for TravBot.\nThe bot prefix is: ${prefix}`)
        .addField(`Commands:`, "``help``\n``serverinfo``\n``roll``\n``ok``\n``play``\n``pause``\n``resume``\n``stop``\n``nowplaying``\n``queue``\n``nick``\n``say``\n``suicide``\n``ravi1/9``\n``whoami``\n``whostupid``")
        .setFooter("Travbot Services", client.user.displayAvatarURL)
        message.channel.send(embed).then(m => m.delete(10000));
        message.author.send(Sembed)
    }

}

module.exports.config = {
    name: "help",
    aliases: ["h", "halp", "commands"],
    usage: ".help",
    description: "Displays a help message.",
    accessibleby: "Members"
}