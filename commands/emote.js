/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    if (!args[0]) return message.channel.send("You need to specify an emote to use!");
    let text = "";
    let foundAny = false;

    for (const search of args) {
        if (search === "\\")
            text += "\n";
        else {
            const emote = client.emojis.find(emote => emote.name === search);
            text += emote ? emote.toString() : "❓";

            if (emote)
                foundAny = true;
        }
    }

    if (foundAny) {
        message.channel.send(text);
        message.delete();
    } else
        message.react("❓");
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "emote",
    category: "Fun",
    description: "Sends any amount of emotes. Include a backslash in place of an emote's name if you want a new line.",
    usage: "emote [emote name(s)]"
};