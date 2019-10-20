const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    try{
        const nickName = args;
        const lea = message.guild.members.find('id', client.user.id);
        await lea.setNickname(nickName);
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