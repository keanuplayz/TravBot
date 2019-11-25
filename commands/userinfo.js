const Discord = module.require('discord.js');
const moment = require('moment');

module.exports.run = async (client, message, args) => {
    const joinDiscord = moment(user.createdAt).format('llll');
    const joinServer = moment(user.joinedAt).format('llll');
    let member = message.mentions.members.first() || message.member,
  user = member.user;
    let embed = new Discord.RichEmbed()
        .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
        .setDescription(`${user}`)
        .setColor(`RANDOM`)
        .setThumbnail(`${user.displayAvatarURL}`)
        .addField('Joined at:', `${moment.utc(user.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
        .addField('Status:', user.presence.status, true)
        .addField('Roles:', member.roles.map(r => `${r}`).join(' | '), true)
        .setFooter(`ID: ${user.id}`)
        .setTimestamp();

    if (e) {
        message.react('❌')
    } else{
        message.channel.send({ embed: embed });
        return; 
    }
}

module.exports.config = {
    name: "userinfo",
    aliases: ["ui"],
    usage: ".userinfo",
    description: "Displays info about a user.",
    accessibleby: "Members"
}
