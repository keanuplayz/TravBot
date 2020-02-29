/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const math = require("mathjs");

exports.run = async (client, message, args, level) => {
    if (!args[0]) return message.channel.send("Please provide a calculation.");

    let resp;
    try {
        resp = math.evaluate(args.join(" "));
    } catch (e) {
        return message.channel.send("Please provide a *valid* calculation.");
    }

    const embed = new Discord.RichEmbed()
        .setColor(0xffffff)
        .setTitle("Math Calculation")
        .addField("Input", `\`\`\`js\n${args.join("")}\`\`\``)
        .addField("Output", `\`\`\`js\n${resp}\`\`\``);

    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
};

exports.help = {
    name: "calc",
    category: "Utility",
    description: "Calculates a specified math expression.",
    usage: "calc [expression]"
};