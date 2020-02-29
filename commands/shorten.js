/* eslint-disable no-unused-vars */
const shorten = require("isgd");

exports.run = (client, message, args, level) => {
    if (!args[0]) return message.channel.send("Please input a link.");

    if (!args[1]) {
        shorten.shorten(args[0], function(res) {
            if (res.startsWith("Error:")) return message.channel.send("Please input a valid URL.");
            message.channel.send(`<${res}>`);
        });
    } else {
        shorten.custom(args[0], args[1], function(res) {
            if (res.startsWith("Error:")) return message.channel.send(`${res}`);
            message.channel.send(`<${res}>`);
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
  name: "shorten",
  category: "Utility",
  description: "Shortens a given link.",
  usage: "shorten [link]"
};
