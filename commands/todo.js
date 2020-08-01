/* eslint-disable no-unused-vars */
const fs = require("fs");
const Discord = require("discord.js");
const moment = require("moment");
exports.run = async (client, message, args, level) => {
    const UserData = JSON.parse(fs.readFileSync(__dirname + "/storage/todo.json", "utf8"));
    const sender = message.author;
    const compositeID = sender.id;
    if (!UserData[compositeID]) UserData[compositeID] = {};
    if (!UserData[compositeID].items) UserData[compositeID].items = {};

    if (args[0] == "add") {
        const item = args.slice(1).join(" ");
        const date = Date.now().toString();
        try {
            UserData[compositeID].items[date] = item;
            message.channel.send(`Successfully added \`${item}\` to your todo list.`);
        } catch (err) {
            message.channel.send("Something went wrong.");
            client.logger.log(err, "error");
        }
    }

    if (args[0] == "remove") {
        let isFound = false;

        for (const date in UserData[compositeID].items) {
            const item = UserData[compositeID].items[date];
            if (item === args.slice(1).join(" ")) {
                try {
                    delete UserData[compositeID].items[date];
                    message.channel.send(`Removed \`${args.slice(1).join(" ")}\` from your todo list.`);
                    isFound = true;
                } catch (err) {
                    message.channel.send("Something went wrong.");
                }
            }
        }

        if (!isFound) message.channel.send("That item couldn't be found.");
    }

    if (args[0] == "clear") {
        UserData[compositeID].items = {};
        message.channel.send("Cleared todo list.");
    }

    if (args[0] == "view") {
        const embed = new Discord.RichEmbed()
            .setTitle(`Todo list for ${message.author.tag}`)
            .setColor("BLUE");
        for (let date in UserData[compositeID].items) {
            date = Number(date);
            embed.addField(`${moment(date).format("LT")} ${moment(date).format("LL")} (${moment(date).fromNow()})`, UserData[compositeID].items[date]);
        }
        message.channel.send(embed);
    }

    fs.writeFile(__dirname + "/storage/todo.json", JSON.stringify(UserData, null, 4), err => {
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
    name: "todo",
    category: "Utility",
    description: "Todo command",
    usage: "todo [view/add/remove] [..arguments]"
};