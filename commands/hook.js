const {prefix} = require('../config.json');

function hook(channel, title, message, color, avatar) {
    if (!channel) return console.log('Channel is not specified.');
    if (!title) return console.log('Title is not specified.');
    if (!message) return console.log('Message is not specified.');
    if (!color) color = '6495ed';
    if (!avatarURL) avatar  = 'https://cdn2.iconfinder.com/data/icons/mammals-2/50/Dog-256.png';

    color = color.replace(/\s/g, '');
    avatar = avatar.replace(/\s/g, '');

    channel.fetchWebhooks()
        .then(webhook => {
            let foundHook = webhook.find('name', 'Webhook');

            if (!foundHook) {
                channel.createWebhook('Webhook', 'https://cdn2.iconfinder.com/data/icons/mammals-2/50/Dog-256.png')
                    .then(webhook => {
                        foundHook.send('', {
                            "username": title,
                            "avatarURL": avatar,
                            "embeds": [{
                                "color": parseInt(`0x${color}`),
                                "description":message
                            }]
                        })
                        .catch(error => {
                            console.log(error);
                            return channel.send('**Something went wrong. Please tell @Keanu#2811 to check the console.');
                        })
                    })
            }
        })
}

module.exports.run = (client, message, args) => {
    message.delete;
    if (message = prefix + "hook") {
        return hook(message.channel, 'Hook usage', `${prefix}hook <title>, <message>, [HEXcolor], [avatarURL]\n\n**<>is required,\n[] is optional.**`, '6495ed', 'https://cdn2.iconfinder.com/data/icons/mammals-2/50/Dog-256.png')
    }

    let hookArgs = message.content.slice(prefix.length + 4).split(",");

    hook (message.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3]);

}

module.exports.config = {
    name: "hook",
    noalias: "No aliases",
    aliases: [],
    usage: ".hook",
    description: "Sends a webhook.",
    accessibleby: "Members"
}