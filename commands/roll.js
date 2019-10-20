const Discord = require('discord.js');
const config = require("../config.json");


module.exports.run = async (bot, message, args) => {
    if (message.author.bot) return;
	let prefix = "."
    if (!message.content.startsWith(prefix)) return;
    
    if (message.content.startsWith(`${prefix}roll`)) 
    {
        var roll =(Math.floor(Math.random()*200)+1);
        if (roll == 1)
        {
            message.reply('FUCK OFF!');
        }
        else 
        {
            message.reply('stop rolling me please');
        }
    }

}

module.exports.config = {
    name: "roll",
    aliases: []
}