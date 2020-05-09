/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");
exports.run = async (client, message, args, level) => {
    const UserData = JSON.parse(fs.readFileSync(__dirname + "/storage/UserData.json", "utf8"));
    const sender = message.author;
    if (!UserData[sender.id + message.guild.id]) UserData[sender.id + message.guild.id] = {};
    if (!UserData[sender.id + message.guild.id].money) UserData[sender.id + message.guild.id].money = 1;
    if (!UserData[sender.id + message.guild.id].lastDaily) UserData[sender.id + message.guild.id].lastDaily = "Not Collected";
    if (!UserData[sender.id + message.guild.id].userid) UserData[sender.id + message.guild.id].userid = message.author.id;
    // Balance Command
    if (args[0] == "balance" || args[0] == "money") {
        message.channel.send({
            embed: {
                title: "Bank",
                color: 0xf1c40f,
                fields: [{
                    name: "Account Holder",
                    value: message.author.username,
                    inline: true
                }, {
                    name: "Account Balance",
                    value: UserData[sender.id + message.guild.id].money,
                    inline: true
                }]
            }
        });
    }
    // Daily Mon Command
    if (args[0] == "daily") {
        if (UserData[sender.id + message.guild.id].lastDaily != moment()
            .format("L")) {
            UserData[sender.id + message.guild.id].lastDaily = moment()
                .format("L");
            UserData[sender.id + message.guild.id].money += 1;
            message.channel.send({
                embed: {
                    title: "Daily Reward",
                    description: "You received 1 Mon!",
                    color: 0xf1c40f
                }
            });
        } else {
            message.channel.send({
                embed: {
                    title: "Daily Reward",
                    description: "You already claimed your daily Mon. You can collect your next Mon **" + moment()
                        .endOf("day")
                        .fromNow() + "**.",
                    color: 0xf1c40f
                }
            });
        }
    }
    if (args[0] == "guild") {
        var guildMoney = 0; // Total amount of Mons in guild.
        var guildUsers = 0;
        var guildRichest = ""; // Richest user in guild.
        var guildRichest$ = 0; // Amount of Mons that richest user has.
        for (var i in UserData) {
            if (i.endsWith(message.guild.id)) {
                guildMoney += UserData[i].money;
                guildUsers += 1;
                if (UserData[i].money > guildRichest$) {
                    guildRichest$ = UserData[i].money;
                    guildRichest = message.guild.members.get(UserData[i].userid);
                }
            }
        }
        message.channel.send({
            embed: {
                title: "Bank",
                color: 0xf1c40f,
                fields: [{
                    name: "Accounts",
                    value: guildUsers,
                    inline: true
                }, {
                    name: "Total Mons",
                    value: guildMoney,
                    inline: true
                }, {
                    name: "Richest Account",
                    value: `${guildRichest} with ${guildRichest$}`
                }]
            }
        });
    }
    if (args[0] == "pay") {
        if (!args[1] || !args[2])
            message.channel.send("eco pay <amount> <user> -- Use underscores for spaces (or ping the user alternatively).");
        else if (args.length > 3)
            message.channel.send("Too many arguments! `eco pay <amount> <user>`");
        else {
            var amount = Number(args[1]);

            if (!amount)
                message.channel.send(`\`${args[1]}\` isn't a valid amount of money.`);
            else {
                if (amount > UserData[sender.id + message.guild.id].money)
                    message.channel.send("You don't have enough money for that.");
                else {
                    var target;

                    if (/<@!\d+>/.test(args[2])) {
                        target = args[2].substring(3, args[2].length - 1);
                    } else {
                        var name = args[2].split('_').join(' ');
                        target = client.users.find(user => user.username == name).id;
                    }

                    if (!target)
                        message.channel.send(`No user found by the name: ${name}`);
                    else {
                        if (sender.id === target)
                            message.channel.send("You can't send money to yourself!");
                        else {
                            var account = target + message.guild.id;

                            // Initialize target account
                            if (!UserData[account]) UserData[account] = {};
                            if (!UserData[account].money) UserData[account].money = 1;
                            if (!UserData[account].lastDaily) UserData[account].lastDaily = "Not Collected";
                            if (!UserData[account].userid) UserData[account].userid = target;

                            UserData[sender.id + message.guild.id].money -= amount;
                            UserData[account].money += amount;

                            message.channel.send(`<@${sender.id}> has sent ${amount} money to <@${target}>!`);
                        }
                    }
                }
            }
        }
    }
    fs.writeFile(__dirname + "/storage/UserData.json", JSON.stringify(UserData), err => {
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
    name: "eco",
    category: "Fun",
    description: "Economy command for Monika.",
    usage: "eco [argument]"
};