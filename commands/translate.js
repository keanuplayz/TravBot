/* eslint-disable no-unused-vars */
const translate = require("translate-google");
exports.run = async (client, message, args, level) => {
    const lang = args[0];
    const input = args.slice(1).join(" ");
    translate(input, {to: lang}).then(res => {
        message.channel.send({
            embed: {
                title: "Translation",
                fields: [{
                    name: "Input",
                    value: `\`\`\`${input}\`\`\``
                }, {
                    name: "Output",
                    value: `\`\`\`${res}\`\`\``
                }]
            }
        });
    }).catch(err => {
        client.logger.error(err);
        message.channel.send(`${err}\nPlease use the following list: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes`);
    });
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "translate",
    category: "Utility",
    description: "Translates your input.",
    usage: "translate <lang ID> <input>"
};