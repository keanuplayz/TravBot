/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");
const laser = [
    "It's technically a laser bridge. No refunds.",
    "You want a laser bridge? You got one!",
    "Now what'd they say about building bridges... Oh wait, looks like I nuked the planet again. Whoops!",
    "I saw this redhead the other day who was so excited to buy what I was selling. Needless to say, she was not very happy with me afterward.",
    "Sorry, but you'll have to wait until the Laser Bridge Builder leaves early access.",
    "Thank you for your purchase! For you see, this is the legendary laser of obliteration that has been defended and preserved for countless generations!",
    "They say that a certain troll dwells under this laser bridge, waiting for an unlucky person to fall for th- I mean- Thank you for your purchase!",
    "Buy?! Hah! How about our new rental service for just under $9.99 a month? But wait, there's more! For just $99.99, you can rent this laser bridge for an entire year and save 16.67% as opposed to renting it monthly!",
    "Good choice. Owning a laser bridge is the penultimate experience that all true players strive for!",
    "I can already imagine the reviews...\n\"9/10 needs more lasers\""
];
exports.run = async (client, message, args, level) => {
    if (message.guild.id != "637512823676600330") return message.channel.send("Sorry, this command can only be used in Monika's emote server.");
    const UserData = JSON.parse(fs.readFileSync(__dirname + "/storage/UserData.json", "utf8"));
    const sender = message.author;
    const compositeID = sender.id + message.guild.id;
    // If you pay someone while you have exactly 1 Mon, your amount of Mons will become 0, but because of JS's soft comparison, that 0 will coerce to false and it'll trigger the default 1 Mon to magically appear in your account. Use the in operator instead to fix this issue.
    if (!UserData[compositeID]) UserData[compositeID] = {};
    if (!("money" in UserData[compositeID])) UserData[compositeID].money = 1;
    if (!UserData[compositeID].lastDaily) UserData[compositeID].lastDaily = "Not Collected";
    if (!UserData[compositeID].userid) UserData[compositeID].userid = message.author.id;
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
                    value: UserData[compositeID].money,
                    inline: true
                }]
            }
        });
    }
    // Daily Mon Command
    else if (args[0] == "daily") {
        if (UserData[compositeID].lastDaily != moment()
            .format("L")) {
            UserData[compositeID].lastDaily = moment()
                .format("L");
            UserData[compositeID].money += 1;
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
    else if (args[0] == "guild") {
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
    else if (args[0] == "pay") {
        if (!args[1] || !args[2])
            message.channel.send("eco pay <amount> <user> -- Use underscores for spaces (or ping the user alternatively).");
        else if (args.length > 3)
            message.channel.send("Too many arguments! `eco pay <amount> <user>`");
        else {
            var amount = Number(args[1]);

            if (!amount && amount !== 0)
                message.channel.send(`\`${args[1]}\` isn't a valid amount of Mons.`);
            else {
                amount = Math.floor(amount);

                if (amount > UserData[compositeID].money)
                    message.channel.send("You don't have enough Mons for that.");
                else if (amount <= 0)
                    message.channel.send("You must send at least one Mon!");
                else {
                    var target;

                    if (/<@.?\d+>/g.test(args[2])) {
                        target = args[2].match(/\d+/g)[0];
                    } else {
                        var name = args[2].split("_").join(" ");
                        target = client.users.find(user => user.username == name).id;
                    }

                    if (!target)
                        message.channel.send(`No user found by the name: ${name}`);
                    else {
                        if (sender.id === target)
                            message.channel.send("You can't send Mons to yourself!");
                        else {
                            var account = target + message.guild.id;

                            // Initialize target account
                            if (!UserData[account]) UserData[account] = {};
                            if (!("money" in UserData[account])) UserData[account].money = 1;
                            if (!UserData[account].lastDaily) UserData[account].lastDaily = "Not Collected";
                            if (!UserData[account].userid) UserData[account].userid = target;

                            UserData[compositeID].money -= amount;
                            UserData[account].money += amount;
                            if (amount > 1) {
                                message.channel.send(`<@${sender.id}> has sent ${amount} Mons to <@${target}>!`);
                            } else {
                                message.channel.send(`<@${sender.id}> has sent ${amount} Mon to <@${target}>!`);
                            }
                        }
                    }
                }
            }
        }
    }
    else if (args[0] == "buy") {
        if (args[1] == "hug") {
            const amount = 1;
            if (amount > UserData[compositeID].money) {
                message.channel.send("Not enough Mons!");
            } else {
                UserData[compositeID].money -= amount;
                message.channel.send(`Transaction of ${amount} Mon completed successfully. <@394808963356688394>`);
            }
        }
        else if (args[1] == "handhold") {
            const amount = 2;
            if (amount > UserData[compositeID].money) {
                message.channel.send("Not enough Mons!");
            } else {
                UserData[compositeID].money -= amount;
                message.channel.send(`Transaction of ${amount} Mons completed successfully. <@394808963356688394>`);
            }
        }
        else if (args[1] == "cute") {
            const amount = 1;
            if (amount > UserData[compositeID].money) {
                message.channel.send("Not enough Mons!");
            } else {
                UserData[compositeID].money -= amount;
                message.channel.send("<:MoniCheeseBlushRed:637513137083383826>");
            }
        }
        else if (args.slice(1).join(" ").includes("laser bridge")) {
            const amount = 3;
            if (amount > UserData[compositeID].money) {
                message.channel.send("Not enough Mons!");
            } else {
                UserData[compositeID].money -= amount;
                message.channel.send(laser[Math.floor(Math.random() * laser.length)], {
                    files: [{
                        attachment: "assets/TheUltimateLaser.gif"
                    }]
                });
            }
        }
        else {
            message.channel.send(`There's no item in the shop that goes by \`${args[1]}\`!`);
        }
    }
    else if (args[0] == "shop") {
        const embed = new Discord.RichEmbed()
            .setColor(0xf1c40f)
            .setTitle("Shop")
            .addField("**Hug** (.eco buy hug)", "Hug Monika. Costs 1 Mon.")
            .addField("**Handholding** (.eco buy handhold)", "Hold Monika's hand. Costs 2 Mons.")
            .addField("**Cute** (.eco buy cute)", "Calls Monika cute. Costs 1 Mon.")
            .addField("**Laser Bridge** (.eco buy laser bridge)", "Buys what is technically a laser bridge. Costs 3 Mons.")
            .setFooter("Mon Shop | TravBot Services");
        message.channel.send(embed);
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