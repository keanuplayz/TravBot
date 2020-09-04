/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    if (args.length === 0) return message.channel.send("Please provide a valid emote name!");

    let target;

    if (args.length >= 2) {
        const last = args[args.length - 1];

        if (/\d{17,19}/g.test(last)) {
            try {
                target = await message.channel.fetchMessage(last)
            } catch {
                return message.channel.send(`No valid message found by the ID \`${last}\`!`)
            }
            args.pop();
        }
        // The entire string has to be a number for this to match. Prevents leaCheeseAmerican1 from triggering this.
        else if (/^\d+$/g.test(last)) {
            const distance = parseInt(last);

            if (distance >= 0 && distance <= 99) {
                // Messages are ordered from latest to earliest.
                target = (await message.channel.fetchMessages({
                    limit: distance + 1
                })).last();
                args.pop();
            } else
                return message.channel.send("Your distance must be between 0 and 99!");
        }
    }

    // distance = 1
    if (!target) {
        target = (await message.channel.fetchMessages({
            limit: 2
        })).last();
    }

    let anyEmoteIsValid = false;

    for (const search of args) {
        const emoji = client.emojis.find(emoji => emoji.name === search);

        if (emoji) {
            anyEmoteIsValid = true;
            const reaction = await target.react(emoji);

            // This part is called with a promise because you don't want to wait 5 seconds between each reaction.
            client.wait(5000).then(() => {
                reaction.remove(client.user);
            });
        }
    }

    if (!anyEmoteIsValid)
        message.react("❓");
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "react",
    category: "Fun",
    description: "Reacts to the previous message.",
    usage: "react <emote name> (<message ID / distance>)"
};