/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
    // avatar <ping>
    // NOTE: This MUST come before user id since /\d+/ is more generic.
    if (args.length >= 1 && /<@.?\d+>/g.test(args[0])) {
        let targetID = args[0].match(/\d+/g)[0];
        client.fetchUser(targetID).then(user => {
            message.reply(user.avatarURL);
        });
    }
    // avatar <user id>
    else if (args.length >= 1 && /\d+/g.test(args[0])) {
        client.fetchUser(args[0]).then(user => {
            message.reply(user.avatarURL);
        });
    }
    // avatar <name with spaces>
    else if (args.length > 0) {
        let name = args.join(" ");
        let user = client.users.find(user => user.username.includes(name));
        if (user) message.reply(user.avatarURL);
    }
    // avatar (no arguments)
    else {
        message.reply(message.author.avatarURL);
    }
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "avatar",
    category: "Fun",
    description: "Replies with your avatar. You can also search by a user's ID, username, or mention them.",
    usage: "avatar [id/username/ping]"
};