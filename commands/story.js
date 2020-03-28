/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    if (!args[0]) return message.channel.send("Please specify a story name.");

    if (args[0] == "list") {
        const embed = {
            "title": "List of stories",
            "description": "This embed shows all current stories.\n(Extracted from `stories.json`)",
            "color": 10901330,
            "footer": {
                "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
                "text": "TravBot Story Service"
            },
            "thumbnail": {
                "url": "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            "author": {
                "name": "TravBot Story Service | List",
                "url": "https://discordapp.com",
                "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            "fields": [{
                "name": "stories.name",
                "value": "stories.description"
            }]
        };
        channel.send({
            embed
        });
    }

    const stories = fs.readFileSync(__dirname + "/storage/stories.json");
    fs.appendFile(__dirname + "/storage/stories.json", ("\n" + args[0]));
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