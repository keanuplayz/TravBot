/* eslint-disable no-inner-declarations */
/* eslint-disable no-unused-vars */
const client = require("nekos.life");
const neko = new client();
const accepted = ["smug", "baka", "tickle", "slap", "poke", "pat", "neko", "nekoGif", "meow", "lizard", "kiss", "hug", "foxGirl", "feed", "cuddle", "kemonomimi", "holo", "woof"];
exports.run = async (client, message, args, level) => {
    if (args.length === 0) message.channel.send("Please provide an argument. For available arguments, please use `.help neko`");
    else if (args[0] in neko.sfw && accepted.includes(args[0])) message.channel.send((await neko.sfw[args[0]]()).url);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "neko",
    category: "Fun",
    description: "Provides you with a random image with the selected argument.\nArguments: https://keanu-code.netlify.com/files/nekoargs.txt",
    usage: "neko [argument]"
};