const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
    if (message.author.id != "465662909645848577") return message.channel.send("You are not the bot owner!")
    try{
        const nickName = args.join(" ");
        const lea = message.guild.members.find('id', client.user.id);
        await lea.setNickname(nickName);
        message.channel.send(`Nickname set to \`${nickName}\``)
    } catch (e) {
        console.log(e)
    }
}

module.exports.config = {
    name: "nick",
    noalias: "No aliases",
    aliases: [],
    usage: ".nick",
    description: "Changes bot nickname.",
    accessibleby: "Bot Owner"
}