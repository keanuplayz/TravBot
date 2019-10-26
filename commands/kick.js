const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
    if(message.content.startsWith(`${prefix}kick`)) {
        if(!message.member.roles.some(r=>["Admin", "Moderator"].includes(r.name)) )
          return message.reply("Sorry, you don't have permissions to use this!");
        
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member)
          return message.reply("Please mention a valid member of this server");
        if(!member.kickable) 
          return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
        
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";
        
        await member.kick(reason)
          .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
        message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
    
      }
}

module.exports.config = {
    name: "ban",
    noalias: "No aliases",
    aliases: [],
    usage: ".ban",
    description: "Bans user.",
    accessibleby: "Bot Owner"
}