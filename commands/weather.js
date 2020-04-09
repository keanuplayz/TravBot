/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
var weather = require("weather-js");
exports.run = async (client, message, args, level) => {
    if (args.length == 0) return message.channel.send("You need to provide a city.");
    weather.find({
        search: args.join(" "),
        degreeType: "C"
    }, function(err, result) {
        if (err) message.channel.send(err);
        var current = result[0].current;
        var location = result[0].location;
        const embed = new Discord.RichEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(0x00ae86)
            .addField("Timezone", `UTC${location.timezone}`, true)
            .addField("Degree Type", "C", true)
            .addField("Temperature", `${current.temperature} Degrees`, true)
            .addField("Feels like", `${current.feelslike} Degrees`, true)
            .addField("Winds", current.winddisplay, true)
            .addField("Humidity", `${current.humidity}%`, true);
        message.channel.send({
            embed
        });
    });
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "weather",
    category: "Fun",
    description: "Shows weather info of specified location.",
    usage: "weather [location]"
};