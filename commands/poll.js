/* eslint-disable no-unused-vars */
const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
    if (!args[0]) return message.channel.send(`Usage: ${client.settings.get("default").prefix}poll [question]`);

    const embed = new Discord.RichEmbed()
        .setAuthor(`Poll created by ${message.author.username}`, message.guild.iconURL)
        .setColor(0xffffff)
        .setFooter("React to vote.")
        .setDescription(args.join(" "))
    let msg = await message.channel.send(embed);

    await msg.react("✅");
    await msg.react("⛔");

    message.delete({timeout: 1000});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "poll",
    category: "Fun",
    description: "Creates a poll with the provided question.",
    usage: "poll [question]"
};