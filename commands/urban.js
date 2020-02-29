/* eslint-disable no-unused-vars */
const urban = require("relevant-urban"),
    Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    if (!args[0]) return message.channel.send("Please input a word.");

    const res = await urban(args.join(" ")).catch(e => {
        return message.channel.send("Sorry, that word was not found.");
    });

    const embed = new Discord.RichEmbed()
        .setColor(0x1D2439)
        .setTitle(res.word)
        .setURL(res.urbanURL)
        .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
        .addField("Author", res.author, true)
        .addField("Rating", `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`);

    if (res.tags.length > 0 && res.tags.join(" ").length < 1024) {
        embed.addField("Tags", res.tags.join(", "), true);
    }

    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "urban",
    category: "Fun",
    description: "Gives you a definition of the inputted word.",
    usage: "urban [word]"
};