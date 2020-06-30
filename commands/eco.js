/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");
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

    // Load shop items and sort by the given order.
    const files = fs.readdirSync(__dirname + "/shop").filter(file => file.endsWith(".js")); // "bet.js", "handhold.js", etc.
    const items = [];
    for (let f of files) {
        const item = require(`./shop/${f}`);
        if (item.settings && item.run) items.push(item);
    }
    items.sort((a, b) => a.settings.order - b.settings.order);

    // Balance Command
    if (args[0] == "balance" || args[0] == "money" || !args[0]) {
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
        let found = false;
        let amount = 1; // The amount the user is buying.
        if (/\d+/g.test(args[args.length - 1])) amount = parseInt(args.pop());
        let requested = args.slice(1).join(" "); // The item the user is buying.
        amount = 1; // For now, just make every eco command singular. Remove this line when buying multiple items is supported.

        for (let item of items) {
            if (item.settings.usage === requested) {
                const cost = item.settings.cost * amount;

                if (cost > UserData[compositeID].money) {
                    message.channel.send("Not enough Mons!");
                } else {
                    UserData[compositeID].money -= cost;
                    item.run(client, message, cost, amount);
                }

                found = true;
                break;
            }
        }

        if (!found) message.channel.send(`There's no item in the shop that goes by \`${requested}\`!`);
    }
    else if (args[0] == "shop") {
        const shop = [];
        for (let item of items) shop.push({title: item.settings.title, description: item.settings.description});
        let page = 1;
        const total = Math.floor((shop.length - 1) / 5) + 1;
        const generateShopEmbed = () => {
            const selection = shop.slice((page - 1) * 5, page * 5);
            const embed = new Discord.RichEmbed()
                .setColor(0xf1c40f)
                .setTitle(`Shop (Page ${page} of ${total})`)
                .setFooter("Mon Shop | TravBot Services");
            for (let item of selection) embed.addField(item.title, item.description);
            return embed;
        }

        // A new embed will be generated every time you flip the page.
        const msg = await message.channel.send(generateShopEmbed());
        await msg.react("⬅");
        await msg.react("➡");

        // Backwards Collector
        msg.createReactionCollector((reaction, user) => reaction.emoji.name == "⬅" && user.id == message.author.id, {
            time: 300000
        }).on("collect", () => {
            msg.reactions.find(uwu => (uwu.emoji.name = "⬅")).remove(message.author);
            if (page <= 1) return;
            page--;
            msg.edit(generateShopEmbed());
        });

        // Forwards Collector
        msg.createReactionCollector((reaction, user) => reaction.emoji.name == "➡" && user.id == message.author.id, {
            time: 300000
        }).on("collect", () => {
            msg.reactions.find(uwu => uwu.emoji.name == "➡").remove(message.author);
            if (page >= total) return;
            page++;
            msg.edit(generateShopEmbed());
        });
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