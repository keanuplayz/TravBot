/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const fs = require("fs");
exports.run = async (client, message, args, level) => {
    const stories = JSON.parse(fs.readFileSync(__dirname + "/storage/stories.json", "utf8"));
    const sender = message.author;
    if (!stories[sender.id + message.guild.id]) stories[sender.id + message.guild.id] = {};
    if (!stories[sender.id + message.guild.id].title) stories[sender.id + message.guild.id].title = "";
    if (!stories[sender.id + message.guild.id].description) stories[sender.id + message.guild.id].description = "";

    if (!args[0]) return message.channel.send("Please specify a story name.");

    if (args[0] == "list") {
        const embed = {
            "title": "List of stories",
            "description": "This embed shows all current stories.\n(Extracted from `stories.json`)",
            "color": 10901330,
            "footer": {
                "icon_url": message.guild.iconURL,
                "text": "TravBot Story Service"
            },
            "thumbnail": {
                "url": client.user.displayAvatarURL
            },
            "author": {
                "name": "TravBot Story Service | List",
                "url": "https://discordapp.com",
                "icon_url": client.user.displayAvatarURL
            },
            "fields": [{
                "name": "stories.name",
                "value": "stories.description"
            }]
        };
        message.channel.send({
            embed
        });
    }

    if (args[0] == "create") {
        stories[sender.id + message.guild.id].title = args[1];
        stories[sender.id + message.guild.id].description = args[2];
        message.channel.send(args[2].join(" "), {
            embed: {
                title: "Story created!",
                description: `Title: **${args[1]}.**\nDescription: **${args[2]}.**\nYour story has been tied to your user account. Ask a moderator for help from this point on.`,
                color: 0xe004f
            }
        });
    }

    fs.writeFile(__dirname + "/storage/stories.json", JSON.stringify(stories), err => {
        if (err) console.log(err);
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "story",
    category: "Fun",
    description: "Creates a new story.",
    usage: "story [name]"
};