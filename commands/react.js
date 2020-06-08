/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    const guildID = args[1];
    const emoji = client.emojis.find(emoji => emoji.name === args[0]);
    if (!emoji) return message.channel.send("Please provide a valid emote name!");
    if (!guildID) {
        message.channel.fetchMessages({ limit: 1 }).then(messages => {
            const lastMessage = messages.first();
            message.channel.fetchMessage(lastMessage)
                .then(function(message) {
                    message.react(emoji);
                }).catch((err) => {
                    console.log(err);
                });
        });
    } else {
        message.channel.fetchMessage(guildID)
            .then(function(message) {
                message.react(emoji);
            }).catch((err) => {
                console.log(err);
            });
    }
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
    usage: "react [guild id] <emote name>"
};